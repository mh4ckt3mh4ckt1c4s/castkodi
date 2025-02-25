/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";

const exist = await fs
    .access("src/manifest.json", fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
if (!exist) {
    await fs.cp("src/manifest-firefox.json", "src/manifest.json");
}

try {
    spawnSync("metalint", process.argv.slice(2), { stdio: "inherit" });
} catch (err) {
    process.exitCode = err.status;
}
