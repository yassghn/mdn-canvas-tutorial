/**
 * script.js
 */

import { log } from './modules/util.mjs'
import initLessons from './modules/lessonsInit.mjs'
import canvas from './modules/canvas.mjs'
import { initPallete } from './modules/pallete.mjs'

// script.js
(function () {
    'use strict'

    // draw
    function draw(timestamp) {
        requestAnimationFrame((t) => draw(t))
        canvas.canvasPallete(timestamp)
    }

    // main
    async function canvasTutorial() {
        // check browser support for canvas
        if (canvas.isCanvasSupported) {
            log('canvas is supported!')
            // configure canvas object
            canvas.configCanvas()
            // start the lessons
            await initLessons(canvas)
            // get timestamp
            const timestamp = document.timeline.currentTime
            initPallete(timestamp)
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