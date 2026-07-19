const baseUrl = process.env.LOVE_STORY_BASE_URL;
const revision = process.env.LOVE_STORY_DEPLOY_REVISION;

if (!baseUrl) throw new Error("LOVE_STORY_BASE_URL is required");

const pageResponse = await fetch(new URL("/", baseUrl), { redirect: "follow" });
if (!pageResponse.ok) throw new Error(`Homepage returned ${pageResponse.status}`);

const html = await pageResponse.text();
if (!html.includes("<title>三周年纪念</title>")) {
  throw new Error("Deployed homepage has an unexpected title");
}

if (revision && !html.includes(`name="deployment-revision" content="${revision}"`)) {
  throw new Error("Deployed homepage revision does not match the release commit");
}

for (const asset of ["css/all.css", "js/love.js", "music/photograph.mp3"]) {
  const response = await fetch(new URL(asset, baseUrl), { method: "HEAD", redirect: "follow" });
  if (!response.ok) throw new Error(`${asset} returned ${response.status}`);
}

console.log(`Verified Love Story deployment at ${baseUrl}`);
