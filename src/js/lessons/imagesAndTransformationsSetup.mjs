/**
 * imagesAndTransformationsSetup.mjs
 */

import imagesAndTransformations from './imagesAndTransformations.mjs'
import { loadArtGalleryImages, loadBackdropImage, loadScalingImage, loadSlicingImage } from '../modules/loadWebResource.mjs'

async function addMenuItem(itemId, itemText, checkboxId, callback, menu) {
	await menu.addMenuItem(itemId, itemText, checkboxId, callback)
}

function drawingImagesCallback(enabled) {
	imagesAndTransformations.drawingImages = enabled
}

function scalingCallback(enabled) {
	imagesAndTransformations.scaling = enabled
}

function slicingCallback(enabled) {
	imagesAndTransformations.slicing = enabled
}

function artGalleryCallback(enabled) {
	imagesAndTransformations.artGallery = enabled
}

function saveRestoreStateCallback(enabled) {
	imagesAndTransformations.saveRestoreState = enabled
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
		// load rhino image
		loadScalingImage()
	},

	// slicing
	slicingInit: async function (menu) {
		await addMenuItem('slicing', 'slicing', 'slicing-check', slicingCallback, menu)
		// load picture frame image
		loadSlicingImage()
	},

	// art gallery
	artGalleryInit: async function (menu) {
		await addMenuItem('art-gallery', 'art gallery', 'art-gallery-check', artGalleryCallback, menu)
		// load gallery images
		loadArtGalleryImages()
	},

	// save restore state
	saveRestoreStateInit: async function (menu) {
		await addMenuItem('save-restore-state', 'save restore state', 'save-restore-state-check', saveRestoreStateCallback, menu)
	}
}

export default imagesAndTransformationsSetup