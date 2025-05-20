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
import ui from './ui.mjs'

const _palleteArgs = {
	previousTimestamp: 0
}

const _complexPalletes = { ...palleteHewer() }

function basicDrawingAndShapesPallete(cvs) {
	if (basicDrawingAndShapes.simpleExample) {
		basicDrawingAndShapes.renderSimpleExample(cvs)
	}
	if (basicDrawingAndShapes.rectangularShape) {
		basicDrawingAndShapes.renderRectangularShape(cvs)
	}
	if (basicDrawingAndShapes.triangleShapeAndPaths) {
		basicDrawingAndShapes.renderTriangleShapesAndPaths(cvs)
	}
	if (basicDrawingAndShapes.movingThePen) {
		basicDrawingAndShapes.renderMovingThePen(cvs)
	}
	if (basicDrawingAndShapes.lines) {
		basicDrawingAndShapes.renderLines(cvs)
	}
	if (basicDrawingAndShapes.arcs) {
		basicDrawingAndShapes.renderArcs(cvs)
	}
	// bezier and quadratic curves
	renderComplexPallete(_complexPalletes.bezierAndQuadraticCurvesPallete,
		basicDrawingAndShapes.bezierAndQuadraticCurves, cvs)
	if (basicDrawingAndShapes.combinations) {
		basicDrawingAndShapes.renderCombinations(cvs)
	}
	if (basicDrawingAndShapes.shapesWithHoles) {
		basicDrawingAndShapes.renderShapesWithHoles(cvs)
	}
	if (basicDrawingAndShapes.path2d) {
		basicDrawingAndShapes.renderPath2d(cvs)
	}
}

function stylesColorsAndTextPallete(cvs, timestamp) {
	if (stylesColorsAndText.colors) {
		stylesColorsAndText.renderColors(cvs)
	}
	if (stylesColorsAndText.transparency) {
		stylesColorsAndText.renderTransparency(cvs)
	}
	// line styles
	renderComplexPallete(_complexPalletes.lineStylesPallete,
		stylesColorsAndText.lineStyles, cvs, _palleteArgs.previousTimestamp, timestamp)
	if (stylesColorsAndText.gradients) {
		stylesColorsAndText.renderGradients(cvs)
	}
	if (stylesColorsAndText.patterns) {
		stylesColorsAndText.renderPatterns(cvs)
	}
	// shadows pallete
	renderComplexPallete(_complexPalletes.shadowsPallete, stylesColorsAndText.shadows,
		cvs, _palleteArgs.previousTimestamp, timestamp)
	if (stylesColorsAndText.canvasFill) {
		stylesColorsAndText.renderCanvasFill(cvs)
	}
	if (stylesColorsAndText.drawingText) {
		stylesColorsAndText.renderDrawingText(cvs)
	}
	if (stylesColorsAndText.stylingText) {
		stylesColorsAndText.renderStylingText(cvs)
	}
	if (stylesColorsAndText.textMeasurement) {
		stylesColorsAndText.renderTextMeasurement(cvs)
	}
}

function imagesAndTransformationsPallete(cvs) {
	if (imagesAndTransformations.drawingImages) {
		imagesAndTransformations.renderDrawingImages(cvs)
	}
	if (imagesAndTransformations.scalingImages) {
		imagesAndTransformations.renderScalingImages(cvs)
	}
	if (imagesAndTransformations.slicing) {
		imagesAndTransformations.renderSlicing(cvs)
	}
	if (imagesAndTransformations.artGallery) {
		imagesAndTransformations.renderArtGallery(cvs)
	}
	if (imagesAndTransformations.saveRestoreState) {
		imagesAndTransformations.renderSaveRestoreState(cvs)
	}
	if (imagesAndTransformations.translating) {
		imagesAndTransformations.renderTranslating(cvs)
	}
	if (imagesAndTransformations.rotating) {
		imagesAndTransformations.renderRotating(cvs)
	}
	if (imagesAndTransformations.scaling) {
		imagesAndTransformations.renderScaling(cvs)
	}
	if (imagesAndTransformations.transform) {
		imagesAndTransformations.renderTransform(cvs)
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
		clippingAndAnimations.renderSolarSystem(cvs)
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

function imageDataAndOptimizationPallete(cvs, timestamp) {
	// color picker
	renderComplexPallete(_complexPalletes.colorPickerPallete,
		imageDataAndOptimization.colorPicker, cvs, _palleteArgs.previousTimestamp, timestamp)

}

function renderPallete(cvs, callback, timestamp) {
	// save default canvas state before rendering lesson series
	cvs.ctx.save()
	// render lesson series
	callback(cvs, timestamp)
	// restore default canvas state
	cvs.ctx.restore()
}

export function initPallete(timestamp) {
	// set prev and current timestamp is the same on init
	_palleteArgs.previousTimestamp = timestamp
	// add color picker function
	function colorPickerClickHandler() {
		console.log('color picker click handler')
	}
	// add color picker click handler to ui functions
	ui.addFunction(colorPickerClickHandler)
}

function _pallete(cvs, timestamp) {
	renderPallete(cvs, basicDrawingAndShapesPallete)
	renderPallete(cvs, stylesColorsAndTextPallete, timestamp)
	renderPallete(cvs, imagesAndTransformationsPallete)
	renderPallete(cvs, clippingAndAnimationsPallete, timestamp)
	renderPallete(cvs, imageDataAndOptimizationPallete, timestamp)
	// update previous timestamp after rendering
	_palleteArgs.previousTimestamp = timestamp
}

function pallete(cvs, timestamp) {
	_pallete(cvs, timestamp)
}

export default pallete