/**
 * script.js
 */
import menu from './menu.mjs'
import { log } from './util.mjs'

// script.js
(function () {
    'use strict'

    const lessons = {
        simpleExample: false,
        rectangularShape: false
    }

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

    async function addMenuItem(itemId, itemText, checkboxId, callback) {
        await menu.adddMenuItem(itemId, itemText, checkboxId, callback)
    }

    function simpleExampleCallback(enabled) {
        lessons.simpleExample = enabled
        draw()
    }

    function rectangularShapeCallback(enabled) {
        lessons.rectangularShape = enabled
        draw()
    }

    function drawSimpleExample() {
        // notes:
        // the grid: normally(?) 1 unit = 1px in canvas grid
        // top-left corner of canvas is coordinate (0, 0)
        // drawing moves as x units from left, y units from top
        cvs.ctx.fillStyle = 'rgb(200 0 0)'
        // fillRect(x, y, width, height)
        cvs.ctx.fillRect(10, 10, 50, 50)
        cvs.ctx.fillStyle = 'rgb(0 0 200 / 50%)'
        cvs.ctx.fillRect(30, 30, 50, 50)
    }

    function drawRectangularShape() {
        cvs.ctx.fillStyle = 'rgb(0 100 100)'
        // draw filled rectangle
        cvs.ctx.fillRect(40, 40, 100, 100)
        // draw rectangular outline
        cvs.ctx.strokeRect(60, 60, 60, 60)
        // clear rectangular area (make it fully transparent)
        // everything behind clear becomes transparent
        cvs.ctx.clearRect(65, 65, 50, 50)
    }

    // simple example
    async function simpleExampleInit() {
        await addMenuItem("simple-example", "simple example", "simple-example-check", simpleExampleCallback)
    }

    // rectangular shape
    async function rectangularShapeInit() {
        await addMenuItem("rectangular-shape", "rectangular shape", "rectangular-shape-check", rectangularShapeCallback)
    }

    // init lessons
    async function initLessons() {
        await simpleExampleInit()
        await rectangularShapeInit()
    }

    function clearCanvas() {
        cvs.ctx.fillStyle = 'rgb(0 0 0)'
        cvs.ctx.fillRect(0, 0, cvs.width, cvs.height)
    }

    function draw() {
        // clear canvas
        clearCanvas()
        // draw menu enabled lessons
        if (lessons.simpleExample) {
            drawSimpleExample()
        }
        if (lessons.rectangularShape) {
            drawRectangularShape()
        }
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
        } else {
            log('canvas is unsupported.')
        }
    }

    // run script
    window.onload = canvasTutorial
    // adjust canvas
    window.onresize = adjustCanvas

})();