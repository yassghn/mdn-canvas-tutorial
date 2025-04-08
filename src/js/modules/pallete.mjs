/**
 * pallete.mjs
 */

import basicDrawingAndShapes from '../lessons/basicDrawingAndShapes.mjs'
import stylesColorsAndText from '../lessons/stylesColorsAndText.mjs'

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

function stylesColorsAndTextPallete(cvs) {
	if (stylesColorsAndText.colors) {
		stylesColorsAndText.drawColors(cvs)
	}
	if (stylesColorsAndText.transparency) {
		stylesColorsAndText.drawTransparency(cvs)
	}
	if (stylesColorsAndText.lineStyles) {
		stylesColorsAndText.drawLineStyles(cvs)
	}
}

function pallete(cvs) {
	basicDrawingAndShapesPallete(cvs)
	stylesColorsAndTextPallete(cvs)
}

export default pallete