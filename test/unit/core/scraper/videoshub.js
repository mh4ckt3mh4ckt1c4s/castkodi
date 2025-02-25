/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import * as scraper from "../../../../src/core/scraper/videoshub.js";

describe("core/scraper/videoshub.js", function () {
    describe("extract()", function () {
        it("shouldn't handle when it's a unsupported URL", async function () {
            const url = new URL("https://videoshub.com/");
            const content = undefined;

            const file = await scraper.extract(url, content);
            assert.equal(file, undefined);
        });

        it("should return undefined when it isn't HTML", async function () {
            const url = new URL("https://videoshub.com/videos/");
            const content = { html: () => Promise.resolve(undefined) };

            const file = await scraper.extract(url, content);
            assert.equal(file, undefined);
        });

        it("should return undefined when it isn't a video page", async function () {
            const url = new URL("https://videoshub.com/videos/foo");
            const content = {
                html: () =>
                    Promise.resolve(
                        new DOMParser().parseFromString(
                            `<html><body>
                               <script></script>
                             </body></html>`,
                            "text/html",
                        ),
                    ),
            };

            const file = await scraper.extract(url, content);
            assert.equal(file, undefined);
        });

        it("should return video URL", async function () {
            const url = new URL("https://videoshub.com/videos/foo");
            const content = {
                html: () =>
                    Promise.resolve(
                        new DOMParser().parseFromString(
                            `<html><body>
                               <script>
                                 if (Hls.isSupported()) {
                                   hls.loadSource('https://bar.com/baz.m3u8');
                                 }
                               </script>
                             </body></html>`,
                            "text/html",
                        ),
                    ),
            };

            const file = await scraper.extract(url, content);
            assert.equal(file, "https://bar.com/baz.m3u8");
        });
    });
});
