let timerElement = null;
let _startTime = 0;
let _elapsed = 0;
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
    const elapsed = now - _startTime + _elapsed;
    updateTimerDisplay(Math.floor(elapsed));
    _rafId = requestAnimationFrame(_tick);
}

/**
 * Starts the timer if not running already.
 */
export function startTimer() {
    if (_running) return;
    _running = true;
    _startTime = performance.now();
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
    _elapsed = now - _startTime + _elapsed;
    _rafId = null;
    updateTimerDisplay(Math.floor(_elapsed));
}

/**
 * Resets the timer to 0 and stops it.
 */
export function resetTimer() {
    _running = false;
    if (_rafId) cancelAnimationFrame(_rafId);
    _rafId = null;
    _startTime = 0;
    _elapsed = 0;
    updateTimerDisplay(0);
}

/**
 * Returns the total elapsed time in ms.
 * 
 * @returns {number} Elapsed time in ms.
 */
export function getElapsed() {
    if (_running) {
        return performance.now() - _startTime + _elapsed;
    }
    return _elapsed;
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
