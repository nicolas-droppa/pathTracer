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
    const delay = Math.max(0, Math.floor(ms / (multiplier)));
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

function square(container) {
    container.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div');
        row.style.display = "flex";

        for (let j = 0; j < 5; j++) {
            const square = document.createElement('div');
            square.classList.add('button-image-square');
            square.style.width = '.8rem';
            square.style.height = '.8rem';
            row.appendChild(square);
        }

        container.appendChild(row);
    }
}

function circle(container) {
    container.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div');
        row.style.display = "flex";

        for (let j = 0; j < 5; j++) {
            const square = document.createElement('div');
            square.classList.add('button-image-square');
            square.style.width = '.8rem';
            square.style.height = '.8rem';

            const center = (5 - 1) / 2;
            const distance = Math.sqrt((i - center) ** 2 + (j - center) ** 2);

            const radius = center + 0.3;
            if (distance > radius) {
                square.style.visibility = 'hidden';
            }

            row.appendChild(square);
        }

        container.appendChild(row);
    }
}

function triangle(container) {
    container.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div');
        row.style.display = "flex";

        for (let j = 0; j < 5; j++) {
            const square = document.createElement('div');
            square.classList.add('button-image-square');
            square.style.width = '.8rem';
            square.style.height = '.8rem';

            if (j < 5 - i - 1) {
                square.style.visibility = 'hidden';
            }

            row.appendChild(square);
        }

        container.appendChild(row);
    }
}


export function createButtonImageFromSquares(container, shape) {
    switch (shape) {
        case "circle":
            circle(container);
            break;
        case "triangle":
            triangle(container);
            break;
        default:
            square(container);
            break;
    }
}