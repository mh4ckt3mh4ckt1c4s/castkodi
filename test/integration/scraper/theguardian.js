import assert      from "assert";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: The Guardian", function () {
    it("should return null when it's not a video / audio", async function () {
        const url = "https://www.theguardian.com/technology/2019/nov/17" +
                                        "/firefox-mozilla-fights-back-against" +
                                       "-google-chrome-dominance-privacy-fears";
        const options = { "depth": 0, "incognito": false };
        const expected = url;

        const file = await extract(new URL(url), options);
        assert.strictEqual(file, expected);
    });

    it("should return video URL", async function () {
        const url = "https://www.theguardian.com/football/2020/mar/01" +
                                          "/liverpool-in-danger-of-going-easy" +
                                              "-osey-with-title-in-their-grasp";
        const options = { "depth": 0, "incognito": false };
        const expected = "plugin://plugin.video.youtube/play/" +
                                        "?video_id=hIw0r4o-enM&incognito=false";

        const file = await extract(new URL(url), options);
        assert.strictEqual(file, expected);
    });

    it("should return audio URL", async function () {
        const url = "https://www.theguardian.com/news/audio/2020/feb/25" +
                         "/could-coronavirus-be-china-chernobyl-moment-podcast";
        const options = { "depth": 0, "incognito": false };
        const expected = "https://flex.acast.com/audio.guim.co.uk/2020/02" +
                                                 "/24-70184-200225TIFchina.mp3";

        const file = await extract(new URL(url), options);
        assert.strictEqual(file, expected);
    });
});
