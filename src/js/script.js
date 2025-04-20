/**
 * script.js
 */

import { log } from './modules/util.mjs'
import initLessons from './modules/lessonsInit.mjs'
import canvas from './modules/canvas.mjs'
import { initPallete } from './modules/pallete.mjs';

// script.js
(function () {
    'use strict'

    let lineDashOffset = 0

    function setLineDashOffset() {
        lineDashOffset++
        if (lineDashOffset > 5) {
            lineDashOffset = 0
        }
    }

    // draw
    function draw() {
        canvas.canvasPallete(lineDashOffset)
        setLineDashOffset()
        setTimeout(requestAnimationFrame, delay, draw)
    }

    // main
    async function canvasTutorial() {
        // check browser support for canvas
        if (canvas.isCanvasSupported) {
            log('canvas is supported!')
            // configure canvas object
            canvas.configCanvas()
            // start the lessons
            await initLessons()
            // start drawing
            requestAnimationFrame(draw)
        } else {
            log('canvas is unsupported.')
        }
    }

    // run script
    window.onload = canvasTutorial
    // adjust canvas
    window.onresize = canvas.adjustCanvas

})();