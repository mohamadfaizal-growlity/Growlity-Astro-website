export const prerender = false;

import fs from 'fs';
import path from 'path';

const settingsFile = path.join(process.cwd(), 'src', 'data', 'settings.json');
const githubToken = process.env.GITHUB_TOKEN;
const githubRepo = process.env.GITHUB_REPO || (process.env.VERCEL_GIT_REPO_OWNER && process.env.VERCEL_GIT_REPO_SLUG ? `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}` : null);
const githubPath = 'src/data/settings.json';

function ensureDataDir() {
  const dataDir = path.dirname(settingsFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

async function fetchFromGithub() {
  if (!githubToken || !githubRepo) return null;
  
  const response = await fetch(`https://api.github.com/repos/${githubRepo}/contents/${githubPath}`, {
    headers: {
      'Authorization': `Bearer ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (!response.ok) {
    if (response.status === 404) return null; // File doesn't exist yet
    throw new Error(`GitHub API Error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { content, sha: data.sha };
}

async function saveToGithub(content: string, sha?: string) {
  if (!githubToken || !githubRepo) throw new Error("GitHub credentials not configured");
  
  const response = await fetch(`https://api.github.com/repos/${githubRepo}/contents/${githubPath}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: "Update site settings from custom dashboard",
      content: Buffer.from(content).toString('base64'),
      sha: sha
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`GitHub API Error: ${err.message || response.statusText}`);
  }
}

export async function GET() {
  try {
    // Try GitHub first if configured
    if (githubToken && githubRepo) {
      const gitData = await fetchFromGithub();
      if (gitData) {
        return new Response(gitData.content, { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        });
      }
    }

    // Fallback to local
    if (!fs.existsSync(settingsFile)) {
      return new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const content = fs.readFileSync(settingsFile, 'utf-8');
    return new Response(content, { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    const contentString = JSON.stringify(data, null, 2);

    if (githubToken && githubRepo) {
      // Fetch current SHA to update
      const gitData = await fetchFromGithub();
      await saveToGithub(contentString, gitData?.sha);
    } else {
      ensureDataDir();
      fs.writeFileSync(settingsFile, contentString);
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
