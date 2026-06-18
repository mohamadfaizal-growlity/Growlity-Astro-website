const prerender = false;
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { formId, ...fields } = data;
    if (!formId) {
      return new Response(JSON.stringify({ error: "Missing formId" }), { status: 400 });
    }
    const githubToken = undefined                             || process.env.GITHUB_TOKEN;
    if (!githubToken) {
      console.error("Missing GITHUB_TOKEN environment variable.");
      return new Response(JSON.stringify({ error: "Server misconfiguration: Missing GitHub Token." }), { status: 500 });
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    const filename = `src/content/entries/${formId}-${timestamp}.json`;
    const entryData = {
      formId,
      submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
      data: fields
    };
    const contentEncoded = Buffer.from(JSON.stringify(entryData, null, 2)).toString("base64");
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
