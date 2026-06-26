import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!);

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const post_slug = url.searchParams.get('post_slug');

    let comments;
    if (status) {
      comments = await sql`SELECT * FROM comments WHERE status = ${status} ORDER BY created_at DESC`;
    } else if (post_slug) {
      comments = await sql`SELECT * FROM comments WHERE post_slug = ${post_slug} AND status = 'Approved' ORDER BY created_at DESC`;
    } else {
      comments = await sql`SELECT * FROM comments ORDER BY created_at DESC`;
    }

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const { id, status } = await request.json();
    
    if (!id || !status) {
      return new Response(JSON.stringify({ error: 'Missing id or status' }), { status: 400 });
    }

    const updated = await sql`
      UPDATE comments 
      SET status = ${status} 
      WHERE id = ${id} 
      RETURNING *
    `;

    return new Response(JSON.stringify(updated[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });
    }

    await sql`DELETE FROM comments WHERE id = ${id}`;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
