/**
 * script.js
 */
import menu from './menu.mjs'
import { log } from './util.mjs'
import lessonsSetup from './lessonsSetup.mjs'
import canvas from './canvas.mjs'

// script.js
(function () {
    'use strict'

    // init lessons
    async function initLessons() {
        await lessonsSetup.simpleExampleInit()
        await lessonsSetup.rectangularShapeInit()
        await lessonsSetup.triangleShapeAndPathsInit()
        await lessonsSetup.movingThePenInit()
        await lessonsSetup.linesInit()
        await lessonsSetup.arcsInit()
        await lessonsSetup.bezierAndQuadraticCurvesInit()
        await lessonsSetup.combinationsInit()
        await lessonsSetup.shapesWithHolesInit()
        await lessonsSetup.path2dInit()
    }

    // draw
    function draw() {
        canvas.canvasPallete()
        requestAnimationFrame(draw)
    }

    // main
    async function canvasTutorial() {
        // init menu
        menu.init()
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