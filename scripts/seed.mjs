import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

async function seed() {
  const sql = neon(process.env.DATABASE_URL);
  
  await sql`
    INSERT INTO comments (author_name, author_email, content, post_slug, status) 
    VALUES 
      ('Amit Kumar', 'amit@example.com', 'This is a test pending comment. I love this post!', 'sample-post', 'Pending'),
      ('John Doe', 'john@example.com', 'Great case study, loved it!', 'seo-guide', 'Approved'),
      ('SpamBot', 'spam@bot.com', 'Buy cheap pills here http://spam.com', 'seo-guide', 'Spam')
  `;
  console.log('Seeded successfully!');
}

seed();
