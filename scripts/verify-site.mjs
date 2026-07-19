import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const htmlPath = path.join(root, "index.html");
const html = await readFile(htmlPath, "utf8");

if (!html.includes("<title>三周年纪念</title>")) {
  throw new Error("Unexpected page title");
}

if (!html.includes('id="cover"') || !html.includes('id="ppt"')) {
  throw new Error("Start cover or presentation container is missing");
}

if (/q99sxupaw|myqcloud/i.test(html)) {
  throw new Error("Legacy external storage URL remains in index.html");
}

const assetReferences = [
  ...html.matchAll(/(?:src|href)=["']([^"']+)["']/gi),
].map((match) => match[1]);

for (const reference of assetReferences) {
  if (/^(?:https?:|data:|#)/i.test(reference)) continue;
  const assetPath = path.join(root, reference.replace(/^\//, ""));
  await access(assetPath);
}

const cssPath = path.join(root, "css", "all.css");
const css = await readFile(cssPath, "utf8");

for (const match of css.matchAll(/url\(([^)]+)\)/gi)) {
  const reference = match[1].trim().replace(/^['"]|['"]$/g, "");
  if (/^(?:https?:|data:)/i.test(reference)) continue;
  await access(path.resolve(path.dirname(cssPath), reference));
}

console.log(`Verified ${assetReferences.length} HTML asset references and local CSS assets.`);
