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

const stylesColorsAndTextSetup = {
	// colors
	colorsInit: async function (menu) {
		await addMenuItem('colors', 'colors', 'colors-check', colorsCallback, menu)
	},

	// transparency
	transparencyInit: async function (menu) {
		await addMenuItem('transparency', 'transparency', 'transparency-check', transparencyCallback, menu)
	}
}

export default stylesColorsAndTextSetup