/**
 * stylesColorsAndTextSetup.mjs
 */

import stylesColorsAndText from './stylesColorsAndText.mjs'

async function addMenuItem(itemId, itemText, checkboxId, callback, menu) {
	await menu.addMenuItem(itemId, itemText, checkboxId, callback)
}

function colorsCallback(enabled) {
	stylesColorsAndText.colors = enabled
}

function transparencyCallback(enabled) {
	stylesColorsAndText.transparency = enabled
}

function lineStylesCallback(enabled) {
	stylesColorsAndText.lineStyles = enabled
}

const stylesColorsAndTextSetup = {
	// colors
	colorsInit: async function (menu) {
		await addMenuItem('colors', 'colors', 'colors-check', colorsCallback, menu)
	},

	// transparency
	transparencyInit: async function (menu) {
		await addMenuItem('transparency', 'transparency', 'transparency-check', transparencyCallback, menu)
	},

	// line styles
	lineStylesInit: async function (menu) {
		await addMenuItem('line-styles', 'line styles', 'line-styles-check', lineStylesCallback, menu)
	}
}

export default stylesColorsAndTextSetup