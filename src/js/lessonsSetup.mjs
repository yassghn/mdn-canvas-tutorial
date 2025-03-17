/**
 * lessonsSetup.mjs0
 */
import menu from './menu.mjs'
import lessons from './lessons.mjs'

async function addMenuItem(itemId, itemText, checkboxId, callback) {
	await menu.adddMenuItem(itemId, itemText, checkboxId, callback)
}

function simpleExampleCallback(enabled) {
	lessons.simpleExample = enabled
}

function rectangularShapeCallback(enabled) {
	lessons.rectangularShape = enabled
}

function triangleShapeAndPathsCallback(enabled) {
	lessons.triangleShapeAndPaths = enabled
}

function movingThePenCallback(enabled) {
	lessons.movingThePen = enabled
}

function linesCallback(enabled) {
	lessons.lines = enabled
}

function arcsCallback(enabled) {
	lessons.arcs = enabled
}

function bezierAndQuadraticCurvesCallback(enabled) {
	lessons.bezierAndQuadraticCurves = enabled
}

function combinationsCallback(enabled) {
	lessons.combinations = enabled
}

function shapesWithHolesCallback(enabled) {
	lessons.shapesWithHoles = enabled
}

function path2dCallback(enabled) {
	lessons.path2d = enabled
}

const lessonsSetup = {
	// simple example
	simpleExampleInit: async function () {
		await addMenuItem('simple-example', 'simple example', 'simple-example-check', simpleExampleCallback)
	},

	// rectangular shape
	rectangularShapeInit: async function () {
		await addMenuItem('rectangular-shape', 'rectangular shape', 'rectangular-shape-check', rectangularShapeCallback)
	},

	// drawing a triangle
	triangleShapeAndPathsInit: async function () {
		await addMenuItem('triangle-shape-and-paths', 'triangle shape and paths', 'triangle-shape-and-paths-check', triangleShapeAndPathsCallback)
	},

	// moving the pen
	movingThePenInit: async function () {
		await addMenuItem('moving-the-pen', 'moving the pen', 'moving-the-pen-check', movingThePenCallback)
	},

	// lines
	linesInit: async function () {
		await addMenuItem('lines', 'lines', 'lines-check', linesCallback)
	},

	// lines
	arcsInit: async function () {
		await addMenuItem('arcs', 'arcs', 'arcs-check', arcsCallback)
	},

	// cubic/quadratic bezier curves
	bezierAndQuadraticCurvesInit: async function () {
		await addMenuItem('bezier-and-quadratic-curves', 'bezier and quadratic curves', 'bezier-and-quadratic-curves-check', bezierAndQuadraticCurvesCallback)
	},

	// combining drawing lessons
	combinationsInit: async function() {
		await addMenuItem('combinations', 'combinations', 'combinations-check', combinationsCallback)
	},

	shapesWithHolesInit: async function() {
		await addMenuItem('shapes-with-holes', 'shapes-with-holes', 'shapes-with-holes-check', shapesWithHolesCallback)
	},

	// path 2d lesson
	path2dInit: async function() {
		await addMenuItem('path2d', 'path2d', 'path2d-check', path2dCallback)
	}
}

export default lessonsSetup