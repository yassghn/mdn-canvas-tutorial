/**
 * pallete.mjs
 */

import { renderComplexPallete } from './complexPallete.mjs'
import basicDrawingAndShapes from '../lessons/basicDrawingAndShapes.mjs'
import stylesColorsAndText from '../lessons/stylesColorsAndText.mjs'
import imagesAndTransformations from '../lessons/imagesAndTransformations.mjs'
import clippingAndAnimations from '../lessons/clippingAndAnimations.mjs'
import imageDataAndOptimization from '../lessons/imageDataAndOptimization.mjs'
import palleteHewer from './palleteHewer.mjs'

const _palleteArgs = {
	previousTimestamp: 0
}

const _complexPalletes = { ...palleteHewer() }

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
	// bezier and quadratic curves
	renderComplexPallete(_complexPalletes.bezierAndQuadraticCurvesPallete,
		basicDrawingAndShapes.bezierAndQuadraticCurves, cvs)
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
	// line styles
	renderComplexPallete(_complexPalletes.lineStylesPallete,
		stylesColorsAndText.lineStyles, cvs, _palleteArgs.previousTimestamp, timestamp)
	if (stylesColorsAndText.gradients) {
		stylesColorsAndText.drawGradients(cvs)
	}
	if (stylesColorsAndText.patterns) {
		stylesColorsAndText.drawPatterns(cvs)
	}
	// shadows pallete
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
	// clipping paths
	renderComplexPallete(_complexPalletes.clippingPathsPallete,
		clippingAndAnimations.clippingPaths, cvs)
	// inverse clipping paths
	renderComplexPallete(_complexPalletes.inverseClippingPathsPallete,
		clippingAndAnimations.inverseClippingPaths, cvs)
	if (clippingAndAnimations.solarSystem) {
		clippingAndAnimations.drawSolarSystem(cvs)
	}
	// clock
	renderComplexPallete(_complexPalletes.clockPallete, clippingAndAnimations.clock,
		cvs, _palleteArgs.previousTimestamp, timestamp)
	// looping panorama
	renderComplexPallete(_complexPalletes.loopingPanoramaPallete, clippingAndAnimations.loopingPanorama,
		cvs, _palleteArgs.previousTimestamp, timestamp)
	// mouse following
	renderComplexPallete(_complexPalletes.mouseFollowingPallete,
		clippingAndAnimations.mouseFollowing, cvs)
	// boundaries
	renderComplexPallete(_complexPalletes.boundariesPallete,
		clippingAndAnimations.boundaries, cvs)
	// acceleration
	renderComplexPallete(_complexPalletes.accelerationPallete,
		clippingAndAnimations.acceleration, cvs)

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