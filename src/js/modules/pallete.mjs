/**
 * pallete.mjs
 */

import hewComplexePallete, { renderComplexPallete } from './complexPallete.mjs'
import basicDrawingAndShapes from '../lessons/basicDrawingAndShapes.mjs'
import stylesColorsAndText from '../lessons/stylesColorsAndText.mjs'
import imagesAndTransformations from '../lessons/imagesAndTransformations.mjs'
import clippingAndAnimations from '../lessons/clippingAndAnimations.mjs'
import imageDataAndOptimization from '../lessons/imageDataAndOptimization.mjs'
import effects from './effects.mjs'
import { getBall, getSword } from './render.mjs'

const _complexPalletes = {
	bezierAndQuadraticCurvesPallete: null,
	clippingPathsPallete: null,
	inverseClippingPathsPallete: null,
	loopingPanoramaPallete: null,
	lineStylesPallete: null,
	shadowsPallete: null,
	clockPallete: null,
	mouseFollowingPallete: null,
	boundariesPallete: null,
	accelerationPallete: null
}

const _palleteArgs = {
	previousTimestamp: 0
}

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
	renderComplexPallete(_complexPalletes.bezierAndQuadraticCurvesPallete, basicDrawingAndShapes.bezierAndQuadraticCurves,
		cvs)
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
	renderComplexPallete(_complexPalletes.lineStylesPallete, stylesColorsAndText.lineStyles,
		cvs, _palleteArgs.previousTimestamp, timestamp)
	if (stylesColorsAndText.gradients) {
		stylesColorsAndText.drawGradients(cvs)
	}
	if (stylesColorsAndText.patterns) {
		stylesColorsAndText.drawPatterns(cvs)
	}
	renderComplexPallete(_complexPalletes.shadowsPallete, stylesColorsAndText.shadows,
		cvs, _palleteArgs.previousTimestamp, timestamp)
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
	renderComplexPallete(_complexPalletes.clippingPathsPallete, clippingAndAnimations.clippingPaths,
		cvs)
	renderComplexPallete(_complexPalletes.inverseClippingPathsPallete, clippingAndAnimations.inverseClippingPaths,
		cvs)
	if (clippingAndAnimations.solarSystem) {
		clippingAndAnimations.drawSolarSystem(cvs)
	}
	renderComplexPallete(_complexPalletes.clockPallete, clippingAndAnimations.clock,
		cvs, _palleteArgs.previousTimestamp, timestamp)
	renderComplexPallete(_complexPalletes.loopingPanoramaPallete, clippingAndAnimations.loopingPanorama,
		cvs, _palleteArgs.previousTimestamp, timestamp)
	renderComplexPallete(_complexPalletes.mouseFollowingPallete, clippingAndAnimations.mouseFollowing,
		cvs)
	renderComplexPallete(_complexPalletes.boundariesPallete, clippingAndAnimations.boundaries,
		cvs)
	renderComplexPallete(_complexPalletes.accelerationPallete, clippingAndAnimations.acceleration,
		cvs)

}

function imageDataAndOptimizationPallete(cvs) {
	if (imageDataAndOptimization.colorPicker) {
		imageDataAndOptimization.drawColorPicker(cvs)
	}
}

function renderPallete(cvs, callback, timestamp) {
	// save default canvas state before drawing lesson series
	cvs.ctx.save()
	// draw lesson series
	callback(cvs, timestamp)
	// restore default canvas state
	cvs.ctx.restore()
}

export function initPallete(timestamp) {
	// set prev and current timestamp is the same on init
	_palleteArgs.previousTimestamp = timestamp
	// init effects
	const efx = effects()
	const neonGlitch = efx.text.neonGlitch()
	const scrollLeft = efx.text.leftScroll()
	const mouseFollowParticles = efx.particles.spinningParticles()
	// init complex pallets
	_complexPalletes.bezierAndQuadraticCurvesPallete = hewComplexePallete(basicDrawingAndShapes.drawBezierAndQuadraticCurves, scrollLeft)
	_complexPalletes.lineStylesPallete = hewComplexePallete(stylesColorsAndText.drawLineStyles)
	_complexPalletes.lineStylesPallete.varsObj = {
		delay: 15,
		lineDashOffset: 0,
		lineStylesLastDraw: 0
	}
	_complexPalletes.shadowsPallete = hewComplexePallete(stylesColorsAndText.drawShadows, neonGlitch)
	_complexPalletes.shadowsPallete.varsObj = {
		shadowDelay: 122,
		shadowsLastDraw: 0
	}
	_complexPalletes.clippingPathsPallete = hewComplexePallete(clippingAndAnimations.drawClippingPaths)
	_complexPalletes.inverseClippingPathsPallete = hewComplexePallete(clippingAndAnimations.drawInverseClippingPaths)
	_complexPalletes.loopingPanoramaPallete = hewComplexePallete(clippingAndAnimations.drawLoopingPanorama)
	_complexPalletes.loopingPanoramaPallete.varsObj = {
		loopingPanoramaTimestamp: 0,
		loopingPanoramaImageX: 0
	}
	_complexPalletes.clockPallete = hewComplexePallete(clippingAndAnimations.drawClock)
	_complexPalletes.mouseFollowingPallete = hewComplexePallete(clippingAndAnimations.drawMouseFollowing, mouseFollowParticles)
	_complexPalletes.boundariesPallete = hewComplexePallete(clippingAndAnimations.drawBoundaries)
	_complexPalletes.boundariesPallete.varsObj = {
		sword: getSword()
	}
	_complexPalletes.accelerationPallete = hewComplexePallete(clippingAndAnimations.drawAcceleration)
	_complexPalletes.accelerationPallete.varsObj = {
		ball: getBall(),
		ballTrail: effects().shapes.ballTrail(),
	}
}

function _pallete(cvs, timestamp) {
	renderPallete(cvs, basicDrawingAndShapesPallete)
	renderPallete(cvs, stylesColorsAndTextPallete, timestamp)
	renderPallete(cvs, imagesAndTransformationsPallete)
	renderPallete(cvs, clippingAndAnimationsPallete, timestamp)
	renderPallete(cvs, imageDataAndOptimizationPallete)
	// update previous timestamp after drawing
	_palleteArgs.previousTimestamp = timestamp
}

function pallete(cvs, timestamp) {
	_pallete(cvs, timestamp)
}

export default pallete