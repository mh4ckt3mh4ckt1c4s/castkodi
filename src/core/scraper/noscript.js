/**
 * @module
 * @license MIT
 * @see https://developer.mozilla.org/Web/HTML/Element/noscript
 * @author Sébastien Règne
 */

import { cacheable } from "../tools/cacheable.js";
import { matchPattern } from "../tools/matchpattern.js";
/* eslint-disable import/no-cycle */
import { extract as embedExtract } from "./embed.js";
import { extract as iframeExtract } from "./iframe.js";
import { extract as ldjsonExtract } from "./ldjson.js";
/* eslint-enable import/no-cycle */
import { extract as mediaExtract } from "./media.js";

/**
 * La liste des extracteurs génériques.
 *
 * @type {Function[]}
 */
const GENERIC_EXTRACTS = [
    mediaExtract,
    ldjsonExtract,
    iframeExtract,
    embedExtract,
];

/**
 * Fouille dans les éléments <code>noscript</code> de la page.
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
    const doc = await metadata.html();
    if (undefined === doc) {
        return undefined;
    }

    for (const noscript of doc.querySelectorAll("noscript")) {
        const metametadata = {
            html: cacheable(() => {
                return Promise.resolve(
                    new DOMParser().parseFromString(
                        noscript.innerHTML,
                        "text/html",
                    ),
                );
            }),
        };
        for (const genericExtract of GENERIC_EXTRACTS) {
            const file = await genericExtract(url, metametadata, context);
            if (undefined !== file) {
                return file;
            }
        }
    }
    return undefined;
};
export const extract = matchPattern(action, "*://*/*");
