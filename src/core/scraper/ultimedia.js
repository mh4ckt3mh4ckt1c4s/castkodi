/**
 * @module
 * @license MIT
 * @see https://www.ultimedia.com/
 * @author Sébastien Règne
 */

import { matchPattern } from "../tools/matchpattern.js";

/**
 * L'expression rationnelle pour extraire les données de la vidéo.
 *
 * @type {RegExp}
 */
const DATA_REGEXP = /"mp4":(?<mp4>\{[^}]+\})/u;

/**
 * Extrait les informations nécessaires pour lire une vidéo sur Kodi.
 *
 * @param {URL}      _url          L'URL d'une vidéo de Ultimedia.
 * @param {Object}   metadata      Les métadonnées de l'URL.
 * @param {Function} metadata.html La fonction retournant la promesse contenant
 *                                 le document HTML.
 * @returns {Promise<string|undefined>} Une promesse contenant le lien du
 *                                      <em>fichier</em> ou
 *                                      <code>undefined</code>.
 */
const action = async function (_url, metadata) {
    const doc = await metadata.html();
    for (const script of doc.querySelectorAll("script:not([src])")) {
        const result = DATA_REGEXP.exec(script.text);
        if (null !== result) {
            return Object.values(JSON.parse(result.groups.mp4)).shift();
        }
    }
    return undefined;
};
export const extract = matchPattern(
    action,
    "*://www.ultimedia.com/deliver/generic/iframe/*",
);
