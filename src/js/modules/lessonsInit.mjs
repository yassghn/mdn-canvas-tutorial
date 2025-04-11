/**
 * lessonsInit.mjs
 */

import { addBasicDrawingAndShapesMenu, addStylesColorsAndTextMenu } from './lessonsMenus.mjs'
import basicDrawingAndShapesSetup from '../lessons/basicDrawingAndShapesSetup.mjs'
import stylesColorsAndTextSetup from '../lessons/stylesColorsAndTextSetup.mjs'

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
}

async function initLessons() {
	const basicDrawingAndShapesMenu = await addBasicDrawingAndShapesMenu()
	await initBasicDrawingAndShapes(basicDrawingAndShapesMenu)
	const stylesColorsAndTextMenu = await addStylesColorsAndTextMenu()
	await initStylesColorsAndText(stylesColorsAndTextMenu)

}

export default initLessons