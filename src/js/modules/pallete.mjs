/**
 * pallete.mjs
 */

import { clearClippingPaths, clearInverseClippingPaths, clearLineStyles, clearShadows, clearClock } from './render.mjs'
import getComplexePallete from './complexPallete.mjs'
import basicDrawingAndShapes from '../lessons/basicDrawingAndShapes.mjs'
import stylesColorsAndText from '../lessons/stylesColorsAndText.mjs'
import imagesAndTransformations from '../lessons/imagesAndTransformations.mjs'
import clippingAndAnimations from '../lessons/clippingAndAnimations.mjs'
import effects from './effects.mjs'

let previousTimestamp = 0
let clippingPathsPallete = undefined
let inverseClippingPathsPallete = undefined
let lineStylesPallete = undefined
let shadowsPallete = undefined
let clockPallete = undefined
const efx = effects()
const neonGlitch = efx.text.neonGlitch()
const scrollLeft = efx.text.leftScroll()
const mouseFollowParticles = efx.particles.spinningParticles()

function basicDrawingAndShapesPallete(cvs) {
	if (basicDrawingAndShapes.simpleExample) {
		basicDrawingAndShapes.drawSimpleExample(cvs)
	}
	if (basicDrawingAndShapes.rectangularShape) {
		basicDrawingAndShapes.drawRectangularShape(cvs)
	}
	if (basicDrawingAndShapes.triangleShapeAndPaths) {
		basicDrawingAndShapes.drawTriangleShapesAndPaths(cvs)
	}
	if (basicDrawingAndShapes.movingThePen) {
		basicDrawingAndShapes.drawMovingThePen(cvs)
	}
	if (basicDrawingAndShapes.lines) {
		basicDrawingAndShapes.drawLines(cvs)
	}
	if (basicDrawingAndShapes.arcs) {
		basicDrawingAndShapes.drawArcs(cvs)
	}
	if (basicDrawingAndShapes.bezierAndQuadraticCurves) {
		basicDrawingAndShapes.drawBezierAndQuadraticCurves(cvs, scrollLeft)
	}
	if (basicDrawingAndShapes.combinations) {
		basicDrawingAndShapes.drawCombinations(cvs)
	}
	if (basicDrawingAndShapes.shapesWithHoles) {
		basicDrawingAndShapes.drawShapesWithHoles(cvs)
	}
	if (basicDrawingAndShapes.path2d) {
		basicDrawingAndShapes.drawPath2d(cvs)
	}
}

function stylesColorsAndTextPallete(cvs, timestamp) {
	if (stylesColorsAndText.colors) {
		stylesColorsAndText.drawColors(cvs)
	}
	if (stylesColorsAndText.transparency) {
		stylesColorsAndText.drawTransparency(cvs)
	}
	lineStylesPallete.draw(stylesColorsAndText.lineStyles, cvs, previousTimestamp, timestamp)
	if (stylesColorsAndText.gradients) {
		stylesColorsAndText.drawGradients(cvs)
	}
	if (stylesColorsAndText.patterns) {
		stylesColorsAndText.drawPatterns(cvs)
	}
	shadowsPallete.draw(stylesColorsAndText.shadows, cvs, previousTimestamp, timestamp, neonGlitch)
	if (stylesColorsAndText.canvasFill) {
		stylesColorsAndText.drawCanvasFill(cvs)
	}
	if (stylesColorsAndText.drawingText) {
		stylesColorsAndText.drawDrawingText(cvs)
	}
	if (stylesColorsAndText.stylingText) {
		stylesColorsAndText.drawStylingText(cvs)
	}
	if (stylesColorsAndText.textMeasurement) {
		stylesColorsAndText.drawTextMeasurement(cvs)
	}
}

function imagesAndTransformationsPallete(cvs) {
	if (imagesAndTransformations.drawingImages) {
		imagesAndTransformations.drawDrawingImages(cvs)
	}
	if (imagesAndTransformations.scalingImages) {
		imagesAndTransformations.drawScalingImages(cvs)
	}
	if (imagesAndTransformations.slicing) {
		imagesAndTransformations.drawSlicing(cvs)
	}
	if (imagesAndTransformations.artGallery) {
		imagesAndTransformations.drawArtGallery(cvs)
	}
	if (imagesAndTransformations.saveRestoreState) {
		imagesAndTransformations.drawSaveRestoreState(cvs)
	}
	if (imagesAndTransformations.translating) {
		imagesAndTransformations.drawTranslating(cvs)
	}
	if (imagesAndTransformations.rotating) {
		imagesAndTransformations.drawRotating(cvs)
	}
	if (imagesAndTransformations.scaling) {
		imagesAndTransformations.drawScaling(cvs)
	}
	if (imagesAndTransformations.transform) {
		imagesAndTransformations.drawTransform(cvs)
	}
}

function clippingAndAnimationsPallete(cvs, timestamp) {
	clippingPathsPallete.draw(clippingAndAnimations.clippingPaths, cvs, previousTimestamp, timestamp)
	inverseClippingPathsPallete.draw(clippingAndAnimations.inverseClippingPaths, cvs, previousTimestamp, timestamp)
	if (clippingAndAnimations.solarSystem) {
		clippingAndAnimations.drawSolarSystem(cvs)
	}
	clockPallete.draw(clippingAndAnimations.clock, cvs, previousTimestamp, timestamp)
	if (clippingAndAnimations.loopingPanorama) {
		clippingAndAnimations.drawLoopingPanorama(cvs, previousTimestamp, timestamp)
	}
	if (clippingAndAnimations.mouseFollowing) {
		clippingAndAnimations.drawMouseFollowing(cvs, mouseFollowParticles)
	}
	if (clippingAndAnimations.boundaries) {
		clippingAndAnimations.drawBoundaries(cvs)
	}
	if (clippingAndAnimations.acceleration) {
		clippingAndAnimations.drawAcceleration(cvs)
	}
}

function drawPallete(cvs, callback, timestamp) {
	// save default canvas state before drawing lesson series
	cvs.ctx.save()
	// draw lesson series
	callback(cvs, timestamp)
	// restore default canvas state
	cvs.ctx.restore()
}

export function initPallete(timestamp) {
	previousTimestamp = timestamp
	lineStylesPallete = getComplexePallete(700, 0, stylesColorsAndText.drawLineStyles, clearLineStyles)
	shadowsPallete = getComplexePallete(475, 380, stylesColorsAndText.drawShadows, clearShadows)
	clippingPathsPallete = getComplexePallete(1250, 650, clippingAndAnimations.drawClippingPaths, clearClippingPaths)
	inverseClippingPathsPallete = getComplexePallete(1250, 650, clippingAndAnimations.drawInverseClippingPaths, clearInverseClippingPaths)
	clockPallete = getComplexePallete(1250, 800, clippingAndAnimations.drawClock, clearClock)
}

function pallete(cvs, timestamp) {
	drawPallete(cvs, basicDrawingAndShapesPallete)
	drawPallete(cvs, stylesColorsAndTextPallete, timestamp)
	drawPallete(cvs, imagesAndTransformationsPallete)
	drawPallete(cvs, clippingAndAnimationsPallete, timestamp)
	previousTimestamp = timestamp
}

export default pallete