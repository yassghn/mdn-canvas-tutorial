/**
 * lessonsInit.mjs
 */

import { addBasicDrawingAndShapesMenu, addStylesColorsAndTextMenu, addImagesAndTransformationsMenu } from './lessonsMenus.mjs'
import basicDrawingAndShapesSetup from '../lessons/basicDrawingAndShapesSetup.mjs'
import stylesColorsAndTextSetup from '../lessons/stylesColorsAndTextSetup.mjs'
import imagesAndTransformationsSetup from '../lessons/imagesAndTransformationsSetup.mjs'

// init lessons
async function initBasicDrawingAndShapes(menu) {
	await basicDrawingAndShapesSetup.simpleExampleInit(menu)
	await basicDrawingAndShapesSetup.rectangularShapeInit(menu)
	await basicDrawingAndShapesSetup.triangleShapeAndPathsInit(menu)
	await basicDrawingAndShapesSetup.movingThePenInit(menu)
	await basicDrawingAndShapesSetup.linesInit(menu)
	await basicDrawingAndShapesSetup.arcsInit(menu)
	await basicDrawingAndShapesSetup.bezierAndQuadraticCurvesInit(menu)
	await basicDrawingAndShapesSetup.combinationsInit(menu)
	await basicDrawingAndShapesSetup.shapesWithHolesInit(menu)
	await basicDrawingAndShapesSetup.path2dInit(menu)
}

async function initStylesColorsAndText(menu) {
	await stylesColorsAndTextSetup.colorsInit(menu)
	await stylesColorsAndTextSetup.transparencyInit(menu)
	await stylesColorsAndTextSetup.lineStylesInit(menu)
	await stylesColorsAndTextSetup.gradientsInit(menu)
	await stylesColorsAndTextSetup.patternsInit(menu)
	await stylesColorsAndTextSetup.shadowsInit(menu)
	await stylesColorsAndTextSetup.canvasFillInit(menu)
	await stylesColorsAndTextSetup.drawingTextInit(menu)
	await stylesColorsAndTextSetup.stylingTextInit(menu)
	await stylesColorsAndTextSetup.textMeasurementInit(menu)
}

async function initImagesAndTransformations(menu) {
	await imagesAndTransformationsSetup.drawingImagesInit(menu)
	await imagesAndTransformationsSetup.scalingInit(menu)
	await imagesAndTransformationsSetup.slicingInit(menu)
	await imagesAndTransformationsSetup.artGalleryInit(menu)
	await imagesAndTransformationsSetup.saveRestoreStateInit(menu)
}

async function initLessons() {
	const basicDrawingAndShapesMenu = await addBasicDrawingAndShapesMenu()
	await initBasicDrawingAndShapes(basicDrawingAndShapesMenu)
	const stylesColorsAndTextMenu = await addStylesColorsAndTextMenu()
	await initStylesColorsAndText(stylesColorsAndTextMenu)
	const imagesAndTransformationsMenu = await addImagesAndTransformationsMenu()
	await initImagesAndTransformations(imagesAndTransformationsMenu)
}

export default initLessons