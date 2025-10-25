import { getSpeedMultiplier } from "./speedMultiplier.js";

let timerElement = null;
// _lastRealTime stores the last performance.now() time we sampled while running
let _lastRealTime = 0;
// _simulatedElapsed stores the accumulated simulated time (ms), i.e. sum of real deltas * multiplier
let _simulatedElapsed = 0;
let _running = false;
let _rafId = null;

/**
 * Initializes the timer
 * 
 * @param {HTMLElement|string} elementOrId - The timer element or its ID.
 * @returns {HTMLElement|null} The initialized timer element.
 */
export function initTimer(elementOrId) {
    if (typeof elementOrId === 'string') {
        timerElement = document.getElementById(elementOrId);
    } else {
        timerElement = elementOrId || document.getElementById('timer');
    }
    
    return timerElement;
}

/**
 * Formats milliseconds into string (MM:SS.ms).
 * 
 * @param {number} milliseconds - Time in ms.
 * @returns {string} Formatted time string.
 */
export function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = milliseconds % 1000;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(Math.floor(ms / 10)).padStart(2, '0')}`;
}

/**
 * Updates the timer display element (formatted time).
 * 
 * @param {number} milliseconds - The time in ms.
 */
export function updateTimerDisplay(milliseconds) {
    const el = timerElement || document.getElementById('timer');
    if (!el) return;
    el.textContent = formatTime(milliseconds);
}

/**
 * Internal tick function to continuously update the timer while running.
 * Uses requestAnimationFrame for smooth updates.
 */
function _tick() {
    if (!_running) return;
    const now = performance.now();
    // compute real time delta since last tick
    const realDelta = now - _lastRealTime;
    const multiplier = getSpeedMultiplier();
    // accumulate simulated elapsed time (only affects future progression)
    _simulatedElapsed += realDelta * multiplier;
    _lastRealTime = now;
    updateTimerDisplay(Math.floor(_simulatedElapsed));
    _rafId = requestAnimationFrame(_tick);
}

/**
 * Starts the timer if not running already.
 */
export function startTimer() {
    if (_running) return;
    _running = true;
    _lastRealTime = performance.now();
    _rafId = requestAnimationFrame(_tick);
}

/**
 * Stops the timer and saves the elapsed time.
 */
export function stopTimer() {
    if (!_running) return;
    _running = false;
    if (_rafId) cancelAnimationFrame(_rafId);
    const now = performance.now();
    // add final slice
    const realDelta = now - _lastRealTime;
    _simulatedElapsed += realDelta * getSpeedMultiplier();
    _lastRealTime = 0;
    _rafId = null;
    updateTimerDisplay(Math.floor(_simulatedElapsed));
}

/**
 * Resets the timer to 0 and stops it.
 */
export function resetTimer() {
    _running = false;
    if (_rafId) cancelAnimationFrame(_rafId);
    _rafId = null;
    _lastRealTime = 0;
    _simulatedElapsed = 0;
    updateTimerDisplay(0);
}

/**
 * Returns the total elapsed time in ms.
 * 
 * @returns {number} Elapsed time in ms.
 */
export function getElapsed() {
    if (_running) {
        const now = performance.now();
        const realDelta = now - _lastRealTime;
        return _simulatedElapsed + realDelta * getSpeedMultiplier();
    }
    return _simulatedElapsed;
}


if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initTimer('timer');
} else {
    document.addEventListener('DOMContentLoaded', () => initTimer('timer'));
}

/**
 * Returns whether the timer is currently running.
 * 
 * @returns {boolean} True if the timer is running, false otherwise.
 */
export function isRunning() { 
    return _running;
}
