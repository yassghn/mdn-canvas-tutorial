/**
 * imagesAndTransformationsSetup.mjs
 */

import imagesAndTransformations from './imagesAndTransformations.mjs'
import { loadBackdropImage } from '../modules/loadWebResource.mjs'

async function addMenuItem(itemId, itemText, checkboxId, callback, menu) {
	await menu.addMenuItem(itemId, itemText, checkboxId, callback)
}

function drawingImagesCallback(enabled) {
	imagesAndTransformations.drawingImages = enabled
}

function scalingCallback(enabled) {
	imagesAndTransformations.scaling = enabled
}

const imagesAndTransformationsSetup = {
	// drawing images
	drawingImagesInit: async function (menu) {
		await addMenuItem('drawing-images', 'drawing images', 'drawing-images-check', drawingImagesCallback, menu)
		// load backdrop image
		loadBackdropImage()
	},

	// scaling
	scalingInit: async function (menu) {
		await addMenuItem('scaling', 'scaling', 'scaling-check', scalingCallback, menu)
	}
}

export default imagesAndTransformationsSetup