/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import sinon from "sinon";
import { kodi } from "../../../src/core/jsonrpc/kodi.js";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Jamendo", function () {
    it("should return undefined when it isn't a sound", async function () {
        sinon.stub(kodi.addons, "getAddons").resolves([]);

        const url = new URL("https://www.jamendo.com/track/404/not-found");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(file, undefined);
    });

    it("should return audio URL [opengraph]", async function () {
        const url = new URL(
            "https://www.jamendo.com/track/3431/avant-j-etais-trappeur",
        );
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.ok(
            file?.startsWith(
                "https://prod-1.storage.jamendo.com/?trackid=3431&format=mp31",
            ),
            `"${file}"?.startsWith(...)`,
        );
    });

    it("should return audio URL when protocol is HTTP [opengraph]", async function () {
        const url = new URL(
            "http://www.jamendo.com/track/33454/vacance-au-camping",
        );
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.ok(
            file?.startsWith(
                "https://prod-1.storage.jamendo.com/?trackid=33454&format=mp31",
            ),
            `"${file}"?.startsWith(...)`,
        );
    });
});
