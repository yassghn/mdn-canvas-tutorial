/**
 * lessonsInit.mjs
 */

import { addBasicDrawingAndShapesMenu } from './lessonsMenus.mjs'
import basicDrawingAndShapesSetup from '../lessons/basicDrawingAndShapesSetup.mjs'

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

async function initLessons() {
	const basicDrawingAndShapesMenu = await addBasicDrawingAndShapesMenu()
	initBasicDrawingAndShapes(basicDrawingAndShapesMenu)
}

export default initLessons