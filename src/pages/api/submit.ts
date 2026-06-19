export const prerender = false;
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { formId, submittedFrom, ...fields } = data;

    if (!formId) {
      return new Response(JSON.stringify({ error: 'Missing formId' }), { status: 400 });
    }

    const githubToken = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
    if (!githubToken) {
      console.error("Missing GITHUB_TOKEN environment variable.");
      return new Response(JSON.stringify({ error: 'Server misconfiguration: Missing GitHub Token.' }), { status: 500 });
    }

    // Determine the category folder based on the submittedFrom URL
    let categoryFolder = "entries-general";
    let categoryLabel = "General";
    
    if (submittedFrom) {
      if (submittedFrom.includes('/blog')) {
        categoryFolder = "entries-blog";
        categoryLabel = "Blog";
      } else if (submittedFrom.includes('/case-studies')) {
        categoryFolder = "entries-casestudies";
        categoryLabel = "Case Study";
      } else if (submittedFrom.includes('/solutions')) {
        categoryFolder = "entries-solutions";
        categoryLabel = "Solution";
      }
    }

    // Extract user name for the title (if available)
    const userName = fields.Name || fields.name || "Customer";
    const title = `[${categoryLabel}] Form: ${formId} - ${userName}`;

    // Prepare the content as markdown with YAML frontmatter
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `src/content/entries/${formId}-${timestamp}.md`;
    
    // Construct YAML frontmatter
    let mdContent = `---\ntitle: "${title}"\nformId: "${formId}"\nsubmittedFrom: "${submittedFrom || 'unknown'}"\nsubmittedAt: "${new Date().toISOString()}"\ndata:\n`;
    for (const [key, value] of Object.entries(fields)) {
      mdContent += `  ${key}: "${String(value).replace(/"/g, '\\"')}"\n`;
    }
    mdContent += `---\n`;
    
    // Base64 encode the content (required by GitHub API)
    // Use Buffer for base64 encoding which works in Node/Vercel edge
    const contentEncoded = Buffer.from(mdContent).toString('base64');

    // GitHub API URL for creating a file
    const owner = 'mohamadfaizal-growlity';
    const repo = 'Growlity-Astro-website';
    const branch = 'Admin_Panel';
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`;

    const githubResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `feat: new form submission for ${formId}`,
        content: contentEncoded,
        branch: branch
      })
    });

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error("GitHub API Error:", errorText);
      return new Response(JSON.stringify({ error: 'Failed to save entry to database.' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error("Form Submission Error:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
