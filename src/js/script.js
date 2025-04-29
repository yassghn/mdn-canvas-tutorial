/**
 * script.js
 */

import mdnCanvasTutorial, { resizeCanvasObjects } from './modules/mdnCanvasTutorial.mjs'

// script.js
(function () {
    'use strict'
    // run script
    window.onload = mdnCanvasTutorial
    // resize canvas
    window.onresize = resizeCanvasObjects
})()