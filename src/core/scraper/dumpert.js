/**
 * @module core/scraper/dumpert
 */

/**
 * L'URL de l'extension pour lire des vidéos issues de Dumpert.
 *
 * @constant {string}
 */
const PLUGIN_URL = "plugin://plugin.video.dumpert/?action=play&video_page_url=";

/**
 * Les règles avec les patrons et leur action.
 *
 * @constant {Map}
 */
export const rules = new Map();

/**
 * Extrait les informations nécessaire pour lire la vidéo sur Kodi.
 *
 * @function action
 * @param {string} url L'URL d'une vidéo Dumpert.
 * @return {Promise} L'URL du <em>fichier</em>.
 */
rules.set(["*://www.dumpert.nl/mediabase/*"], function (url) {
    return Promise.resolve(PLUGIN_URL + encodeURIComponent(url.toString()));
});
