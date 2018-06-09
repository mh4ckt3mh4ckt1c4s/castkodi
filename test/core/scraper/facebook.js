import assert      from "assert";
import { extract } from "../../../src/core/scrapers.js";

describe("scraper/facebook", function () {
    describe("#patterns", function () {
        it("should return the URL when it's a unsupported URL", function () {
            const url = "https://www.facebook.com/mozilla/";
            return extract(url).then(function (file) {
                assert.strictEqual(file, url);
            });
        });
    });

    describe("https://www.facebook.com/*/videos/*/*", function () {
        it("should return error when it's not a video", function () {
            const url = "https://www.facebook.com/XBMC/videos/666/";
            const expected = "noVideo";
            return extract(url).then(function () {
                assert.fail();
            }, function (error) {
                assert.strictEqual(error.name, "PebkacError");
                assert.ok(error.title.includes(expected));
                assert.ok(error.message.includes(expected));
            });
        });

        it("should return video id", function () {
            const url = "https://www.facebook.com/XBMC/videos/" +
                                                           "10152476888501641/";
            const expected = "https://video-cdg2-1.xx.fbcdn.net/v/t43.1792-2/" +
                                  "10810554_10152476888596641_2070058545_n.mp4";
            return extract(url).then(function (file) {
                assert.ok(file.startsWith(expected));
            });
        });
    });
});
