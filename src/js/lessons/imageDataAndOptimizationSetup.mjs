/**
 * imageDataAndOptimizationSetup.mjs
 */

import imageDataAndOptimization from './imageDataAndOptimization.mjs'

async function addMenuItem(itemId, itemText, checkboxId, callback, menu) {
	await menu.addMenuItem(itemId, itemText, checkboxId, callback)
}

function colorPickerCallback(enabled) {
	imageDataAndOptimization.colorPicker = enabled
}

const imageDataAndOptimizationSetup = {
	// color picker
	colorPickerInit: async function (menu) {
		await addMenuItem('color-picker', 'color picker', 'color-picker-check', colorPickerCallback, menu)
	}
}

export default imageDataAndOptimizationSetup