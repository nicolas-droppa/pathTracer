let speedMultiplier = 1.0;

/**
 * Sets the speed multiplier for the application.
 * 
 * @param {number} multiplier - New speed multiplier.
 */
export function setSpeedMultiplier(multiplier) {
    speedMultiplier = Math.max(0.1, multiplier);
}

/**
 * Gets the current speed multiplier.
 * 
 * @returns {number} Current speed multiplier.
 */
export function getSpeedMultiplier() {
    return speedMultiplier;
}