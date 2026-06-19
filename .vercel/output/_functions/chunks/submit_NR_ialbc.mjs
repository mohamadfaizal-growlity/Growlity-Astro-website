const prerender = false;
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { formId, submittedFrom, ...fields } = data;
    if (!formId) {
      return new Response(JSON.stringify({ error: "Missing formId" }), { status: 400 });
    }
    const githubToken = undefined                             || process.env.GITHUB_TOKEN;
    if (!githubToken) {
      console.error("Missing GITHUB_TOKEN environment variable.");
      return new Response(JSON.stringify({ error: "Server misconfiguration: Missing GitHub Token." }), { status: 500 });
    }
    let group = "general";
    if (submittedFrom && typeof submittedFrom === "string") {
      const parts = submittedFrom.split("/").filter(Boolean);
      if (parts.length > 0) {
        group = parts[0];
      }
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    const filename = `src/content/entries/${group}/${formId}-${timestamp}.md`;
    let mdContent = `---
formId: "${formId}"
submittedFrom: "${submittedFrom || "unknown"}"
submittedAt: "${(/* @__PURE__ */ new Date()).toISOString()}"
data:
`;
    for (const [key, value] of Object.entries(fields)) {
      mdContent += `  ${key}: "${String(value).replace(/"/g, '\\"')}"
`;
    }
    mdContent += `---
`;
    const contentEncoded = Buffer.from(mdContent).toString("base64");
    const owner = "mohamadfaizal-growlity";
    const repo = "Growlity-Astro-website";
    const branch = "Admin_Panel";
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`;
    const githubResponse = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `feat: new form submission for ${formId}`,
        content: contentEncoded,
        branch
      })
    });
    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error("GitHub API Error:", errorText);
      return new Response(JSON.stringify({ error: "Failed to save entry to database." }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Form Submission Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
