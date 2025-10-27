import { getSpeedMultiplier } from './speedMultiplier.js';

/**
 * Generates a random integer between two specified values.
 * 
 * @param {number} from - Lower bound of the range (inclusive).
 * @param {number} to - Upper bound of the range (inclusive).
 * @returns {number} A random integer
 */
export function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

export async function sleep(ms) {
    const multiplier = getSpeedMultiplier() || 1;
    console.log(`Sleeping for ${ms} ms with multiplier ${multiplier}`);
    const delay = Math.max(0, Math.floor(ms / (multiplier || 1)));
    return new Promise(resolve => setTimeout(resolve, delay));
}

function disableButton(button) {
    if (button) {
        button.disabled = true;
        button.classList.add('disabled-button');
    }
}

export function disableButtons(buttons) {
    if (Array.isArray(buttons)) {
        for (const button of buttons) {
            disableButton(button);
        }
    } else {
        disableButton(buttons);
    }
}

function enableButton(button) {
    if (button) {
        button.disabled = false;
        button.classList.remove('disabled-button');
    }
}

export function enableButtons(buttons) {
    if (Array.isArray(buttons)) {
        for (const button of buttons) {
            enableButton(button);
        }
    } else {
        enableButton(buttons);
    }
}