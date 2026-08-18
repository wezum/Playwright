import type { APIRoute } from 'astro';

// Render this route on-demand (serverless function)
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { specs } = await request.json();

    if (!specs || !Array.isArray(specs) || specs.length === 0) {
      return new Response(JSON.stringify({ message: 'No specs selected' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const OWNER = 'wezum';
    const REPO = 'Playwright';
    const WORKFLOW_ID = 'astro-playwright.yml';
    const PAT = process.env.GH_PAT; // Read securely from Vercel env vars

    if (!PAT) {
      return new Response(JSON.stringify({ message: 'Server secret GH_PAT missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_ID}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PAT}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
          'User-Agent': 'Astro-Playwright-Dashboard',
        },
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            specs: specs.join(' '),
          },
        }),
      }
    );

    if (res.ok || res.status === 204) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const err = await res.json().catch(() => ({ message: res.statusText }));
    return new Response(JSON.stringify({ message: err.message || 'GitHub API error' }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};