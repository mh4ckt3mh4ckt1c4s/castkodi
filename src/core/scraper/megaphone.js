/**
 * @module
 * @license MIT
 * @see https://megaphone.spotify.com/
 * @author Sébastien Règne
 */
/* eslint-disable require-await */

import { matchPattern } from "../tools/matchpattern.js";

/**
 * Extrait les informations nécessaires pour lire un son sur Kodi.
 *
 * @param {URL} url L'URL d'un son de Megaphone.
 * @returns {Promise<string>} Une promesse contenant le lien du
 *                            <em>fichier</em>.
 */
const actionPlayer = async function ({ pathname }) {
    return `https://dcs.megaphone.fm${pathname}.mp3`;
};
export const extractPlayer = matchPattern(
    actionPlayer,
    "*://player.megaphone.fm/*",
);

/**
 * Extrait les informations nécessaires pour lire un son sur Kodi.
 *
 * @param {URL} url L'URL d'un son (d'une liste de lecture) de Megaphone.
 * @returns {Promise<string|undefined>} Une promesse contenant le lien du
 *                                      <em>fichier</em> ou
 *                                      <code>undefined</code>.
 */
const actionPlaylist = async function ({ searchParams }) {
    return searchParams.has("e")
        ? `https://dcs.megaphone.fm/${searchParams.get("e")}.mp3`
        : undefined;
};
export const extractPlaylist = matchPattern(
    actionPlaylist,
    "*://playlist.megaphone.fm/*",
);
