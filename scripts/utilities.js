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