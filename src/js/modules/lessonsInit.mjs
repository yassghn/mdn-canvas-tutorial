/**
 * lessonsInit.mjs
 */

import { addBasicDrawingAndShapesMenu,
	 	 addStylesColorsAndTextMenu,
		 addImagesAndTransformationsMenu,
		 addClippingAndAnimationsMenu } from './lessonsMenus.mjs'
import basicDrawingAndShapesSetup from '../lessons/basicDrawingAndShapesSetup.mjs'
import stylesColorsAndTextSetup from '../lessons/stylesColorsAndTextSetup.mjs'
import imagesAndTransformationsSetup from '../lessons/imagesAndTransformationsSetup.mjs'
import clippingAndAnimationsSetup from '../lessons/clippingAndAnimationsSetup.mjs'

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
	await imagesAndTransformationsSetup.scalingImagesInit(menu)
	await imagesAndTransformationsSetup.slicingInit(menu)
	await imagesAndTransformationsSetup.artGalleryInit(menu)
	await imagesAndTransformationsSetup.saveRestoreStateInit(menu)
	await imagesAndTransformationsSetup.translatingInit(menu)
	await imagesAndTransformationsSetup.rotatingInit(menu)
	await imagesAndTransformationsSetup.scalingInit(menu)
	await imagesAndTransformationsSetup.transformInit(menu)
}

async function initClippingAndAnimations(menu) {
	await clippingAndAnimationsSetup.clippingPathsInit(menu)
	await clippingAndAnimationsSetup.inverseClippingPathsInit(menu)
	await clippingAndAnimationsSetup.solarSystemInit(menu)
	await clippingAndAnimationsSetup.clockInit(menu)
	await clippingAndAnimationsSetup.loopingPanoramaInit(menu)
	await clippingAndAnimationsSetup.mouseFollowingInit(menu)
}

async function initLessons(cvs) {
	const basicDrawingAndShapesMenu = await addBasicDrawingAndShapesMenu(cvs)
	await initBasicDrawingAndShapes(basicDrawingAndShapesMenu)
	const stylesColorsAndTextMenu = await addStylesColorsAndTextMenu(cvs)
	await initStylesColorsAndText(stylesColorsAndTextMenu)
	const imagesAndTransformationsMenu = await addImagesAndTransformationsMenu(cvs)
	await initImagesAndTransformations(imagesAndTransformationsMenu)
	const clippingAndAnimationsMenu = await addClippingAndAnimationsMenu(cvs)
	await initClippingAndAnimations(clippingAndAnimationsMenu)
}

export default initLessons