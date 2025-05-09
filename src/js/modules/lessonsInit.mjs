/**
 * lessonsInit.mjs
 */

import {
	addBasicDrawingAndShapesMenu,
	addStylesColorsAndTextMenu,
	addImagesAndTransformationsMenu,
	addClippingAndAnimationsMenu,
	addImageDataAndOptimizationMenu
} from './lessonsMenus.mjs'
import basicDrawingAndShapesSetup from '../lessons/basicDrawingAndShapesSetup.mjs'
import stylesColorsAndTextSetup from '../lessons/stylesColorsAndTextSetup.mjs'
import imagesAndTransformationsSetup from '../lessons/imagesAndTransformationsSetup.mjs'
import clippingAndAnimationsSetup from '../lessons/clippingAndAnimationsSetup.mjs'
import settings from './settings.mjs'
import { enableAll } from './ui.mjs'

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
	await clippingAndAnimationsSetup.boundariesInit(menu)
	await clippingAndAnimationsSetup.accelerationInit(menu)
}

async function initImageDataAndOptimization(menu) {

}

async function _menuInit(cvs, addMenu, init) {
	const menu = await addMenu(cvs)
	await init(menu)
}

async function _initLessons(cvs) {
	await _menuInit(cvs, addBasicDrawingAndShapesMenu, initBasicDrawingAndShapes)
	await _menuInit(cvs, addStylesColorsAndTextMenu, initStylesColorsAndText)
	await _menuInit(cvs, addImagesAndTransformationsMenu, initImagesAndTransformations)
	await _menuInit(cvs, addClippingAndAnimationsMenu, initClippingAndAnimations)
	await _menuInit(cvs, addImageDataAndOptimizationMenu, initImageDataAndOptimization)
	if (settings.enableAll == true.toString()) {
		enableAll()
	}
}

function initLessons(cvs) {
	_initLessons(cvs)
}

export default initLessons