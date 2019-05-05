/**
 * @module core/scraper/dailymotion
 */

/**
 * L'URL de l'extension pour lire des vidéos issues de Dailymotion.
 *
 * @constant {string}
 */
const PLUGIN_URL = "plugin://plugin.video.dailymotion_com/?mode=playVideo&url=";

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
 * @param {string} url L'URL d'une vidéo Dailymotion.
 * @return {Promise} L'URL du <em>fichier</em>.
 */
rules.set(["*://www.dailymotion.com/video/*"], function (url) {
    return Promise.resolve(PLUGIN_URL + url.pathname.substring(7));
});

/**
 * Extrait les informations nécessaire pour lire la vidéo sur Kodi.
 *
 * @function action
 * @param {string} url L'URL minifié d'une vidéo Dailymotion.
 * @return {Promise} L'URL du <em>fichier</em>.
 */
rules.set(["*://dai.ly/*"], function (url) {
    return Promise.resolve(PLUGIN_URL + url.pathname.substring(1));
});

/**
 * Extrait les informations nécessaire pour lire la vidéo sur Kodi.
 *
 * @function action
 * @param {string} url L'URL d'une vidéo Dailymotion intégrée.
 * @return {Promise} L'URL du <em>fichier</em>.
 */
rules.set(["*://www.dailymotion.com/embed/video/*"], function (url) {
    return Promise.resolve(PLUGIN_URL + url.pathname.substring(13));
});
