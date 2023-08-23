/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Overcast", function () {
    it("should return audio URL [audio]", async function () {
        const url = new URL("https://overcast.fm/+JUKOBdbAM");
        const context = { depth: false, incognito: false };

        const file = await extract(url, context);
        assert.ok(
            undefined !== file && new URL(file).pathname.endsWith(".mp3"),
            `new URL("${file}").pathname.endsWith(...)`,
        );
    });
});
