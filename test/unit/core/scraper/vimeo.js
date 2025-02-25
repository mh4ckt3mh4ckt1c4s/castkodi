/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import * as scraper from "../../../../src/core/scraper/vimeo.js";

describe("core/scraper/vimeo.js", function () {
    describe("extract()", function () {
        it("shouldn't handle when it's a unsupported URL", async function () {
            const url = new URL("https://vimeo.com/channels");

            const file = await scraper.extract(url);
            assert.equal(file, undefined);
        });

        it("should return video id", async function () {
            const url = new URL("https://player.vimeo.com/video/foo");

            const file = await scraper.extract(url);
            assert.equal(
                file,
                "plugin://plugin.video.vimeo/play/?video_id=foo",
            );
        });

        it("should return video id with hash", async function () {
            const url = new URL("https://player.vimeo.com/video/foo?h=bar");

            const file = await scraper.extract(url);
            assert.equal(
                file,
                "plugin://plugin.video.vimeo/play/?video_id=foo:bar",
            );
        });
    });
});
