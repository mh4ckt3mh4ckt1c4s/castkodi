/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import { matchPattern } from "../tools/matchpattern.js";

/**
 * L'expression rationnelle pour extraire l'URL de la vidéo.
 *
 * @type {RegExp}
 */
const URL_REGEXP = /sources: \["(?<sources>[^"]+)",/u;

/**
 * Extrait les informations nécessaire pour lire une vidéo sur Kodi.
 *
 * @param {URL}      _url         L'URL d'une vidéo de Vidlox.
 * @param {Object}   content      Le contenu de l'URL.
 * @param {Function} content.html La fonction retournant la promesse contenant
 *                                le document HTML.
 * @returns {Promise<string|undefined>} Une promesse contenant le lien du
 *                                      <em>fichier</em> ou
 *                                      <code>undefined</code>.
 */
const action = async function (_url, content) {
    const doc = await content.html();
    for (const script of doc.querySelectorAll("script:not([src])")) {
        const result = URL_REGEXP.exec(script.text);
        if (null !== result) {
            return result.groups.sources;
        }
    }
    return undefined;
};
export const extract = matchPattern(action, "*://vidlox.me/*");
