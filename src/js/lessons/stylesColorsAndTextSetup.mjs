/**
 * stylesColorsAndTextSetup.mjs
 */

import stylesColorsAndText from './stylesColorsAndText.mjs'
import { miterLimitInput } from '../modules/renderInputComponent.mjs'
import { loadPatternImage } from '../modules/loadWebResource.mjs'

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
	// hide/unhide miterLimit web components
	const label = document.getElementById('miterLimitLabel')
	const input = document.getElementById('miterLimit')
	label.hidden = enabled ? false : true
	input.hidden = enabled ? false : true
}

function gradientsCallback(enabled) {
	stylesColorsAndText.gradients = enabled
}

function patternsCallback(enabled) {
	stylesColorsAndText.patterns = enabled
}

function shadowsCallback(enabled) {
	stylesColorsAndText.shadows = enabled
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
		// create input web component
		miterLimitInput(1265, 200)
	},

	// gradients
	gradientsInit: async function (menu) {
		await addMenuItem('gradients', 'gradients', 'gradients-check', gradientsCallback, menu)
	},

	// patterns
	patternsInit: async function (menu) {
		await addMenuItem('patterns', 'patterns', 'patterns-check', patternsCallback, menu)
		// load patterns image
		await loadPatternImage()
	},

	// shadows
	shadowsInit: async function (menu) {
		await addMenuItem('shadows', 'shadows', 'shadows-check', shadowsCallback, menu)
	}
}

export default stylesColorsAndTextSetup