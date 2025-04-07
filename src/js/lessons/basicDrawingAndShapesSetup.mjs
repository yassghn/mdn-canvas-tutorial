/**
 * basicDrawingAndShapesSetup.mjs0
 */

import basicDrawingAndShapes from './basicDrawingAndShapes.mjs'

async function addMenuItem(itemId, itemText, checkboxId, callback, menu) {
	await menu.addMenuItem(itemId, itemText, checkboxId, callback)
}

function simpleExampleCallback(enabled) {
	basicDrawingAndShapes.simpleExample = enabled
}

function rectangularShapeCallback(enabled) {
	basicDrawingAndShapes.rectangularShape = enabled
}

function triangleShapeAndPathsCallback(enabled) {
	basicDrawingAndShapes.triangleShapeAndPaths = enabled
}

function movingThePenCallback(enabled) {
	basicDrawingAndShapes.movingThePen = enabled
}

function linesCallback(enabled) {
	basicDrawingAndShapes.lines = enabled
}

function arcsCallback(enabled) {
	basicDrawingAndShapes.arcs = enabled
}

function bezierAndQuadraticCurvesCallback(enabled) {
	basicDrawingAndShapes.bezierAndQuadraticCurves = enabled
}

function combinationsCallback(enabled) {
	basicDrawingAndShapes.combinations = enabled
}

function shapesWithHolesCallback(enabled) {
	basicDrawingAndShapes.shapesWithHoles = enabled
}

function path2dCallback(enabled) {
	basicDrawingAndShapes.path2d = enabled
}

const basicDrawingAndShapesSetup = {
	// simple example
	simpleExampleInit: async function (menu) {
		await addMenuItem('simple-example', 'simple example', 'simple-example-check', simpleExampleCallback, menu)
	},

	// rectangular shape
	rectangularShapeInit: async function (menu) {
		await addMenuItem('rectangular-shape', 'rectangular shape', 'rectangular-shape-check', rectangularShapeCallback, menu)
	},

	// drawing a triangle
	triangleShapeAndPathsInit: async function (menu) {
		await addMenuItem('triangle-shape-and-paths', 'triangle shape and paths', 'triangle-shape-and-paths-check', triangleShapeAndPathsCallback, menu)
	},

	// moving the pen
	movingThePenInit: async function (menu) {
		await addMenuItem('moving-the-pen', 'moving the pen', 'moving-the-pen-check', movingThePenCallback, menu)
	},

	// lines
	linesInit: async function (menu) {
		await addMenuItem('lines', 'lines', 'lines-check', linesCallback, menu)
	},

	// lines
	arcsInit: async function (menu) {
		await addMenuItem('arcs', 'arcs', 'arcs-check', arcsCallback, menu)
	},

	// cubic/quadratic bezier curves
	bezierAndQuadraticCurvesInit: async function (menu) {
		await addMenuItem('bezier-and-quadratic-curves', 'bezier and quadratic curves', 'bezier-and-quadratic-curves-check', bezierAndQuadraticCurvesCallback, menu)
	},

	// combining drawing lessons
	combinationsInit: async function(menu) {
		await addMenuItem('combinations', 'combinations', 'combinations-check', combinationsCallback, menu)
	},

	// shapes with holes lesson
	shapesWithHolesInit: async function(menu) {
		await addMenuItem('shapes-with-holes', 'shapes with holes', 'shapes-with-holes-check', shapesWithHolesCallback, menu)
	},

	// path 2d lesson
	path2dInit: async function(menu) {
		await addMenuItem('path2d', 'path2d', 'path2d-check', path2dCallback, menu)
	}
}

export default basicDrawingAndShapesSetup