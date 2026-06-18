export const prerender = false;
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { formId, submittedFrom, ...fields } = data;

    if (!formId) {
      return new Response(JSON.stringify({ error: 'Missing formId' }), { status: 400 });
    }

    const githubToken = import.meta.env.GITHUB_TOKEN || (typeof process !== 'undefined' ? process.env.GITHUB_TOKEN : undefined);
    if (!githubToken) {
      console.error("Missing GITHUB_TOKEN environment variable.");
      return new Response(JSON.stringify({ error: 'Server misconfiguration: Missing GitHub Token.' }), { status: 500 });
    }

    // Prepare the content as markdown with YAML frontmatter
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `src/content/entries/${formId}-${timestamp}.md`;
    
    // Construct YAML frontmatter
    let mdContent = `---\nformId: "${formId}"\nsubmittedFrom: "${submittedFrom || 'unknown'}"\nsubmittedAt: "${new Date().toISOString()}"\ndata:\n`;
    for (const [key, value] of Object.entries(fields)) {
      mdContent += `  ${key}: "${String(value).replace(/"/g, '\\"')}"\n`;
    }
    mdContent += `---\n`;
    
    // Base64 encode the content (required by GitHub API)
    // Use btoa for universal edge/node compatibility
    const contentEncoded = btoa(unescape(encodeURIComponent(mdContent)));

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
