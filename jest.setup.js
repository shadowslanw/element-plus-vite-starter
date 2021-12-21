import { config } from '@vue/test-utils';

config.global.stubs = {
    transition: false,
    'transition-group': false,
    'router-link': false,
    'router-view': false,
};

/* eslint-disable global-require */
if (typeof window !== 'undefined') {
    global.window.resizeTo = (width, height) => {
        global.window.innerWidth = width || global.window.innerWidth;
        global.window.innerHeight = height || global.window.innerHeight;
        global.window.dispatchEvent(new Event('resize'));
    };
    global.window.scrollTo = () => { };
    if (!window.matchMedia) {
        Object.defineProperty(global.window, 'matchMedia', {
            value: jest.fn(query => ({
                matches: query.includes('max-width'),
                addListener: jest.fn(),
                removeListener: jest.fn(),
            })),
        });
    }
    global.window.ASYNC_VALIDATOR_NO_WARNING = 1;
}

global.ResizeObserver = require('resize-observer-polyfill');

// The built-in requestAnimationFrame and cancelAnimationFrame not working with jest.runFakeTimes()
// https://github.com/facebook/jest/issues/5147
global.requestAnimationFrame = function (cb) {
    return setTimeout(cb, 0);
};

global.cancelAnimationFrame = function (cb) {
    return clearTimeout(cb);
};

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;
