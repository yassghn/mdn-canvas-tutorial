/**
 * script.js
 */
import menu from './menu.mjs'
import { log } from './util.mjs'
import lessonsSetup from './lessonsSetup.mjs'
import lessons from './lessons.mjs'

// script.js
(function () {
    'use strict'

    // canvas object
    const cvs = {
        // canvas html element
        canvas: undefined,
        // canvas width/height
        width: undefined,
        height: undefined,
        // canvas rendering context
        ctx: undefined
    }

    function setCanvasDimensions() {
        // set widths to window
        cvs.width = (cvs.canvas.width = window.innerWidth)
        cvs.height = (cvs.canvas.height = window.innerHeight)
    }

    // configure canvas object
    function configCanvas() {
        // get canvas
        cvs.canvas = document.querySelector('#tutorial-canvas')
        // set canvas dimentions
        setCanvasDimensions()
        // get canvas context
        cvs.ctx = cvs.canvas.getContext('2d')
    }

    // adjust canvas after window resize
    function adjustCanvas() {
        // set new dimensions
        setCanvasDimensions()
        // redraw
        draw()
    }

    // check browser for canvas support
    function isCanvasSupported() {
        if (cvs.canvas.getContext) {
            return true
        }
        return false
    }

    // init lessons
    async function initLessons() {
        await lessonsSetup.simpleExampleInit()
        await lessonsSetup.rectangularShapeInit()
    }

    function clearCanvas() {
        cvs.ctx.fillStyle = 'rgb(0 0 0)'
        cvs.ctx.fillRect(0, 0, cvs.width, cvs.height)
    }

    function canvasPallete() {
        // clear canvas
        clearCanvas()
        // draw menu enabled lessons
        if (lessons.simpleExample) {
            lessons.drawSimpleExample(cvs)
        }
        if (lessons.rectangularShape) {
            lessons.drawRectangularShape(cvs)
        }
    }

    function draw() {
        canvasPallete()
        requestAnimationFrame(draw)
    }

    // main
    async function canvasTutorial() {
        // init menu
        menu.init()
        // configure canvas object
        configCanvas()
        // check browser support for canvas
        if (isCanvasSupported) {
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
    window.onresize = adjustCanvas

})();