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

const lessonsSetup = {
	// simple example
	simpleExampleInit: async function() {
		await addMenuItem("simple-example", "simple example", "simple-example-check", simpleExampleCallback)
	},

	// rectangular shape
	rectangularShapeInit: async function() {
		await addMenuItem("rectangular-shape", "rectangular shape", "rectangular-shape-check", rectangularShapeCallback)
	}
}

export default lessonsSetup