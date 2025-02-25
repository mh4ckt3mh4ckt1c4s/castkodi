/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import sinon from "sinon";
import { kodi } from "../../../src/core/jsonrpc/kodi.js";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: VideoPress", function () {
    it("should return undefined when it isn't a video", async function () {
        sinon.stub(kodi.addons, "getAddons").resolves([]);

        const url = new URL("https://videopress.com/v/foo");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(file, undefined);
    });

    it("should return undefined when it isn't a video embed", async function () {
        sinon.stub(kodi.addons, "getAddons").resolves([]);

        const url = new URL("https://videopress.com/embed/foo");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(file, undefined);
    });

    it("should return video URL", async function () {
        const url = new URL("https://videopress.com/v/OcobLTqC");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(
            file,
            "https://videos.files.wordpress.com/OcobLTqC/img_5786.m4v",
        );
    });

    it("should return video URL from embed", async function () {
        const url = new URL(
            "https://videopress.com/embed/knHSQ2fb?hd=0&autoPlay=0",
        );
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(
            file,
            "https://videos.files.wordpress.com/knHSQ2fb/pexel-stock-video.mp4",
        );
    });
});
