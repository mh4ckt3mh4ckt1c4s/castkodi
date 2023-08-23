/**
 * @module
 * @license MIT
 * @see https://videopress.com/
 * @author Sébastien Règne
 */

import { matchPattern } from "../tools/matchpattern.js";

/**
 * L'URL de l'API de VideoPress.
 *
 * @type {string}
 */
const API_URL = "https://public-api.wordpress.com/rest/v1.1/videos/";

/**
 * Extrait les informations nécessaires pour lire une vidéo sur Kodi.
 *
 * @param {URL} url L'URL d'une vidéo de VideoPress.
 * @returns {Promise<string|undefined>} Une promesse contenant le lien du
 *                                      <em>fichier</em> ou
 *                                      <code>undefined</code>.
 */
const action = async function ({ pathname }) {
    // Enlever le préfixe "/v/" ou "/embed/".
    const id = pathname.slice(pathname.indexOf("/", 1) + 1);
    const response = await fetch(API_URL + id);
    if (response.ok) {
        const json = await response.json();
        return json.original;
    }
    return undefined;
};
export const extract = matchPattern(
    action,
    "*://videopress.com/v/*",
    "*://videopress.com/embed/*",
);
