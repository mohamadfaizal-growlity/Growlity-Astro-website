export const prerender = false;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const contentDir = path.join(process.cwd(), 'src', 'content');
    
    if (!fs.existsSync(contentDir)) {
      return new Response(JSON.stringify({ error: 'Content directory not found' }), { status: 404 });
    }

    const issues: any[] = [];
    let scannedFiles = 0;

    function scanDirectory(dir: string, collectionName: string) {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
          scanDirectory(fullPath, collectionName);
        } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
          scannedFiles++;
          const fileContent = fs.readFileSync(fullPath, 'utf-8');
          const parsed = matter(fileContent);
          const data = parsed.data || {};
          const content = parsed.content || '';
          
          const fileIssues: string[] = [];

          // Rule 1: Missing Meta Description
          if (!data.description && !data.excerpt) {
            fileIssues.push('Missing meta description');
          }

          // Rule 2: Title Length Check
          const title = data.title || '';
          if (title.length < 10) {
            fileIssues.push('Title is too short (< 10 chars)');
          } else if (title.length > 70) {
            fileIssues.push('Title is too long (> 70 chars)');
          }

          // Rule 3: Missing Alt Tags on Images
          // Regex to match markdown images: ![alt](url)
          // We check if alt is empty like ![]()
          const emptyAltRegex = /!\[\s*\]\([^)]+\)/g;
          const missingAlts = (content.match(emptyAltRegex) || []).length;
          if (missingAlts > 0) {
            fileIssues.push(`Missing alt-tags on ${missingAlts} image(s)`);
          }

          if (fileIssues.length > 0) {
            issues.push({
              file: item,
              collection: collectionName,
              title: title || item,
              issues: fileIssues
            });
          }
        }
      }
    }

    // Read top-level directories in src/content
    const collections = fs.readdirSync(contentDir);
    for (const collection of collections) {
      const collectionPath = path.join(contentDir, collection);
      if (fs.statSync(collectionPath).isDirectory()) {
        scanDirectory(collectionPath, collection);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      scannedFiles,
      issuesCount: issues.reduce((acc, curr) => acc + curr.issues.length, 0),
      issues 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
