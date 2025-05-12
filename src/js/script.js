/**
 * script.js
 */

import mdnCanvasTutorial, { resizeCanvasObjects } from './modules/mdnCanvasTutorial.mjs'

/**
 * render vs. draw
 *
 * in so far as computer graphics are concerned, the process of rendering is the process of
 * applying transformations to a model. this is what canvas 2d rendering context does: it applies
 * transformations to the image data rgba byte array. the process of drawing is actually "painting"
 * the rendered model onto the screen. the rendering context transformation tools are provided by the
 * browser, which does all the drawing, "painting" of pixels, onto the screen. this process is set by
 * request animation frame, which sets up the next "paint" or draw.
 */

// script.js
(function () {
    'use strict'
    // run script
    window.onload = mdnCanvasTutorial
    // resize canvas
    window.onresize = resizeCanvasObjects
})()