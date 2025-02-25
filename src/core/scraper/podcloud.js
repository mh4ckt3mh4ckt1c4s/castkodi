/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */
/* eslint-disable require-await */

import { matchPattern } from "../tools/matchpattern.js";

/**
 * Extrait les informations nécessaire pour lire un son sur Kodi.
 *
 * @param {URL} url L'URL d'un son podCloud.
 * @returns {Promise<string>} Une promesse contenant le lien du
 *                            <em>fichier</em>.
 */
const action = async function ({ pathname }) {
    const parts = pathname.split("/");
    const podcast = parts[2];
    const episode = parts[4];
    return `https://podcloud.fr/ext/${podcast}/${episode}/enclosure.mp3`;
};
export const extract = matchPattern(
    action,
    "*://podcloud.fr/podcast/*/episode/*",
);
