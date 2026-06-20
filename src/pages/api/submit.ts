export const prerender = false;
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

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

    // Determine the group folder based on submittedFrom URL
    let group = 'general';
    if (submittedFrom && typeof submittedFrom === 'string') {
      // For paths like /blog/post-name, extract "blog"
      const parts = submittedFrom.split('/').filter(Boolean);
      if (parts.length > 0) {
        group = parts[0];
      }
    }

    // Prepare the content as markdown with YAML frontmatter
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `src/content/entries/${group}/${formId}-${timestamp}.md`;
    
    // Construct YAML frontmatter
    let mdContent = `---\nformId: "${formId}"\nsubmittedFrom: "${submittedFrom || 'unknown'}"\nsubmittedAt: "${new Date().toISOString()}"\ndata:\n`;
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

    // Automated Email Sending Logic
    try {
      // For testing we use a free Ethereal Email account (or you can provide your own SMTP details)
      // To get test credentials, go to https://ethereal.email/create
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER || 'test@ethereal.email', // Replace with valid test credentials
          pass: process.env.SMTP_PASS || 'testpassword'
        }
      });

      // Construct email body
      let emailHtml = `<h2>New Form Submission: ${formId}</h2><ul>`;
      for (const [key, value] of Object.entries(fields)) {
        emailHtml += `<li><strong>${key}:</strong> ${value}</li>`;
      }
      emailHtml += `</ul><p>Submitted from: ${submittedFrom || 'unknown'}</p>`;

      await transporter.sendMail({
        from: '"SitePins Admin" <admin@sitepins.local>',
        to: process.env.ADMIN_EMAIL || 'admin@growlity.com',
        subject: `New Submission on ${formId}`,
        html: emailHtml
      });
      console.log('Automated email sent successfully.');
    } catch (emailError) {
      console.error('Failed to send automated email:', emailError);
      // We don't fail the whole request if email fails, but we log it.
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error("Form Submission Error:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
