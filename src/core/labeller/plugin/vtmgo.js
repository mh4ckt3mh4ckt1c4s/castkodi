/**
 * @module
 * @license MIT
 * @see https://kodi.wiki/view/Add-on:VTM_GO
 * @author Sébastien Règne
 */
/* eslint-disable require-await */

import { matchPattern } from "../../tools/matchpattern.js";

/**
 * Extrait le titre d'un épisode VTM GO.
 *
 * @param {URL}      url                 L'URL utilisant le plugin VTM GO.
 * @param {Object}   context             Le contexte du labellisateur.
 * @param {Function} context.metaExtract La fonction parente pour extraire un
 *                                       label.
 * @returns {Promise<string|undefined>} Une promesse contenant le titre ou
 *                                      <code>undefined</code>.
 */
const actionEpisode = async function ({ pathname }, { metaExtract }) {
    // Enlever le nom de domaine car un bogue dans Firefox le déplace dans le
    // chemin. https://bugzil.la/1374505
    const episodeId = pathname.replace("//plugin.video.vtm.go", "").slice(23);
    return metaExtract(new URL(`https://vtm.be/vtmgo/afspelen/e${episodeId}`));
};
export const extractEpisode = matchPattern(
    actionEpisode,
    "plugin://plugin.video.vtm.go/play/catalog/episodes/*",
);

/**
 * Extrait le titre d'un film VTM GO.
 *
 * @param {URL}      url                 L'URL utilisant le plugin VTM GO.
 * @param {Object}   context             Le contexte du labellisateur.
 * @param {Function} context.metaExtract La fonction parente pour extraire un
 *                                       label.
 * @returns {Promise<string|undefined>} Une promesse contenant le titre ou
 *                                      <code>undefined</code>.
 */
const actionMovie = async function ({ pathname }, { metaExtract }) {
    // Enlever le nom de domaine car un bogue dans Firefox le déplace dans le
    // chemin. https://bugzil.la/1374505
    const movieId = pathname.replace("//plugin.video.vtm.go", "").slice(21);
    return metaExtract(new URL(`https://vtm.be/vtmgo/afspelen/m${movieId}`));
};
export const extractMovie = matchPattern(
    actionMovie,
    "plugin://plugin.video.vtm.go/play/catalog/movies/*",
);
