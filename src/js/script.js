/**
 * script.js
 */

import { log } from './modules/util.mjs'
import initLessons from './modules/lessonsInit.mjs'
import canvas from './modules/canvas.mjs'

// script.js
(function () {
    'use strict'

    // draw
    function draw() {
        canvas.canvasPallete()
        requestAnimationFrame(draw)
    }

    // main
    async function canvasTutorial() {
        // configure canvas object
        canvas.configCanvas()
        // check browser support for canvas
        if (canvas.isCanvasSupported) {
            log('canvas is supported!')
            // start the lessons
            await initLessons()
            // start drawing
            draw()
        } else {
            log('canvas is unsupported.')
        }
    }

    // run script
    window.onload = canvasTutorial
    // adjust canvas
    window.onresize = canvas.adjustCanvas

})();