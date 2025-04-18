/**
 * pallete.mjs
 */

import basicDrawingAndShapes from '../lessons/basicDrawingAndShapes.mjs'
import stylesColorsAndText from '../lessons/stylesColorsAndText.mjs'
import imagesAndTransformations from '../lessons/imagesAndTransformations.mjs'
import clippingAndAnimations from '../lessons/clippingAndAnimations.mjs'

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
		basicDrawingAndShapes.drawBezierAndQuadraticCurves(cvs)
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

function stylesColorsAndTextPallete(cvs, lineDashOffset) {
	if (stylesColorsAndText.colors) {
		stylesColorsAndText.drawColors(cvs)
	}
	if (stylesColorsAndText.transparency) {
		stylesColorsAndText.drawTransparency(cvs)
	}
	if (stylesColorsAndText.lineStyles) {
		stylesColorsAndText.drawLineStyles(cvs, lineDashOffset)
	}
	if (stylesColorsAndText.gradients) {
		stylesColorsAndText.drawGradients(cvs)
	}
	if (stylesColorsAndText.patterns) {
		stylesColorsAndText.drawPatterns(cvs)
	}
	if (stylesColorsAndText.shadows) {
		stylesColorsAndText.drawShadows(cvs)
	}
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

function clippingAndAnimationsPallete(cvs) {
	if (clippingAndAnimations.clippingPaths) {
		clippingAndAnimations.drawClippingPaths(cvs)
	}
}

function drawPallete(cvs, callback, args) {
	// save default canvas state before drawing lesson series
	cvs.ctx.save()
	// draw lesson series
	callback(cvs, args)
	// restore default canvas state
	cvs.ctx.restore()
}

function pallete(cvs, lineDashOffset) {
	drawPallete(cvs, basicDrawingAndShapesPallete)
	drawPallete(cvs, stylesColorsAndTextPallete)
	drawPallete(cvs, stylesColorsAndTextPallete, lineDashOffset)
	drawPallete(cvs, imagesAndTransformationsPallete)
	drawPallete(cvs, clippingAndAnimationsPallete)
}

export default pallete