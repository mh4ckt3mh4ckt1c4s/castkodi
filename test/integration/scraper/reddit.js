/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import sinon from "sinon";
import { kodi } from "../../../src/core/jsonrpc/kodi.js";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Reddit", function () {
    it("should return undefined when it isn't a video", async function () {
        sinon.stub(kodi.addons, "getAddons").resolves([]);

        const url = new URL(
            "https://www.reddit.com/r/place/comments/twb3gq" +
                "/ill_miss_you_rplace/",
        );
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(file, undefined);
    });

    it("should return video URL", async function () {
        sinon.stub(kodi.addons, "getAddons").resolves([]);

        const url = new URL(
            "https://www.reddit.com/r/Portal/comments/ju5buj" +
                "/70s_aperture_science_logo_animation_i_had_a_lot/",
        );
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.ok(
            file?.startsWith(
                "https://v.redd.it/2g08wt2wj8z51/HLSPlaylist.m3u8?",
            ),
            `"${file}"?.startsWith(...)`,
        );
    });
});
