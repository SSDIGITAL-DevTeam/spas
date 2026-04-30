/**
 * Patches @react-aria/utils 3.23.x to fix a crash on mobile browsers where
 * navigator.userAgentData exists but .brands is undefined, causing
 * "Cannot read properties of undefined (reading 'some')" at testUserAgent().
 *
 * Fixed in @react-aria/utils >=3.25.0 by adding an optional chain on .brands.
 * This script re-applies the fix after every `npm install`.
 */

const fs = require("fs");
const path = require("path");

const BUG = "_window_navigator_userAgentData.brands.some((brand)=>re.test(brand.brand))";
const FIX = "(_window_navigator_userAgentData.brands||[]).some((brand)=>re.test(brand.brand))";

const targets = [
  path.join(__dirname, "../node_modules/@react-aria/utils/dist/import.mjs"),
  path.join(__dirname, "../node_modules/@react-aria/utils/dist/module.js"),
  path.join(__dirname, "../node_modules/@react-aria/utils/dist/main.js"),
];

let patched = 0;
for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes(BUG)) {
    console.log(`[patch-react-aria] Already patched or not needed: ${path.basename(file)}`);
    continue;
  }
  fs.writeFileSync(file, content.replaceAll(BUG, FIX), "utf8");
  console.log(`[patch-react-aria] Patched: ${path.basename(file)}`);
  patched++;
}

if (patched === 0) console.log("[patch-react-aria] Nothing to patch.");
else console.log(`[patch-react-aria] Done. ${patched} file(s) patched.`);
