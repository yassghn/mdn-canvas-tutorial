/**
 * script.js
 */

import { log } from './modules/util.mjs'
import initLessons from './modules/lessonsInit.mjs'
import canvas from './modules/canvas.mjs'
import { initPallete } from './modules/pallete.mjs'
import peripheralInput from './modules/peripheralInput.mjs'
import settings from './modules/settings.mjs'

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
        // configure canvas object
        canvas.configCanvas()
        // check browser support for canvas
        if (canvas.isCanvasSupported()) {
            log('canvas is supported!')
            // init settings
            settings.init()
            // init peripheral input
            peripheralInput.init()
            // start the lessons
            await initLessons(canvas)
            // get timestamp
            const timestamp = document.timeline.currentTime
            // init pallete
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