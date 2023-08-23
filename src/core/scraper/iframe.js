/**
 * @module
 * @license MIT
 * @see https://developer.mozilla.org/Web/HTML/Element/iframe
 * @author Sébastien Règne
 */

// eslint-disable-next-line import/no-cycle
import { extract as metaExtract } from "../scrapers.js";
import { matchPattern } from "../tools/matchpattern.js";

/**
 * Fouille les éléments <code>iframe</code> de la page.
 *
 * @param {URL}      url               L'URL d'une page quelconque.
 * @param {Object}   metadata          Les métadonnées de l'URL.
 * @param {Function} metadata.html     La fonction retournant la promesse
 *                                     contenant le document HTML ou
 *                                     <code>undefined</code>.
 * @param {Object}   context           Le contexte de l'extraction.
 * @param {boolean}  context.depth     La marque indiquant si l'extraction est
 *                                     en profondeur.
 * @param {boolean}  context.incognito La marque indiquant si l'utilisateur est
 *                                     en navigation privée.
 * @returns {Promise<string|undefined>} Une promesse contenant le lien du
 *                                      <em>fichier</em> ou
 *                                      <code>undefined</code>.
 */
const action = async function (url, metadata, context) {
    if (context.depth) {
        return undefined;
    }

    const doc = await metadata.html();
    if (undefined === doc) {
        return undefined;
    }

    for (const iframe of doc.querySelectorAll("iframe[src]")) {
        const file = await metaExtract(
            new URL(iframe.getAttribute("src"), url),
            { ...context, depth: true },
        );
        if (undefined !== file) {
            return file;
        }
    }
    return undefined;
};
export const extract = matchPattern(action, "*://*/*");
