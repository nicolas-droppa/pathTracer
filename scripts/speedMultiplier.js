let speedMultiplier = 1;

/**
 * Sets the speed multiplier for the application.
 * Accepts values 1..5 (integers). Values are clamped.
 *
 * @param {number} multiplier - New speed multiplier.
 */
export function setSpeedMultiplier(multiplier) {
    multiplier = Number(multiplier) || 1;
    multiplier = Math.round(multiplier);
    if (multiplier < 1) multiplier = 1;
    if (multiplier > 5) multiplier = 5;
    speedMultiplier = multiplier;
}

/**
 * Gets the current speed multiplier.
 *
 * @returns {number} Current speed multiplier.
 */
export function getSpeedMultiplier() {
    return speedMultiplier;
}