import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

async function main() {
  const sql = neon(process.env.DATABASE_URL);

  console.log('Creating comments table...');

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        author_name VARCHAR(255) NOT NULL,
        author_email VARCHAR(255) NOT NULL,
        author_url VARCHAR(255),
        author_ip VARCHAR(45),
        content TEXT NOT NULL,
        post_slug VARCHAR(255) NOT NULL,
        post_title VARCHAR(255),
        status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Spam', 'Trash')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Comments table created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

main();
