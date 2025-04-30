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

function scalingImagesCallback(enabled) {
	imagesAndTransformations.scalingImages = enabled
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

function translatingCallback(enabled) {
	imagesAndTransformations.translating = enabled
}

function rotatingCallback(enabled) {
	imagesAndTransformations.rotating = enabled
}

function scalingCallback(enabled) {
	imagesAndTransformations.scaling = enabled
}

function transformCallback(enabled) {
	imagesAndTransformations.transform = enabled
}

const imagesAndTransformationsSetup = {
	// drawing images
	drawingImagesInit: async function (menu) {
		await addMenuItem('drawing-images', 'drawing images', 'drawing-images-check', drawingImagesCallback, menu)
		// load backdrop image
		await loadBackdropImage()
	},

	// scaling
	scalingImagesInit: async function (menu) {
		await addMenuItem('scaling-images', 'scaling images', 'scaling-images-check', scalingImagesCallback, menu)
		// load rhino image
		await loadScalingImage()
	},

	// slicing
	slicingInit: async function (menu) {
		await addMenuItem('slicing', 'slicing', 'slicing-check', slicingCallback, menu)
		// load picture frame image
		await loadSlicingImage()
	},

	// art gallery
	artGalleryInit: async function (menu) {
		await addMenuItem('art-gallery', 'art gallery', 'art-gallery-check', artGalleryCallback, menu)
		// load gallery images
		await loadArtGalleryImages()
	},

	// save restore state
	saveRestoreStateInit: async function (menu) {
		await addMenuItem('save-restore-state', 'save restore state', 'save-restore-state-check', saveRestoreStateCallback, menu)
	},

	// translating
	translatingInit: async function (menu) {
		await addMenuItem('translating', 'translating', 'translating-check', translatingCallback, menu)
	},

	// rotating
	rotatingInit: async function (menu) {
		await addMenuItem('rotating', 'rotating', 'rotating-check', rotatingCallback, menu)
	},

	// scaling
	scalingInit: async function (menu) {
		await addMenuItem('scaling', 'scaling', 'scaling-check', scalingCallback, menu)
	},

	// transform
	transformInit: async function (menu) {
		await addMenuItem('transform', 'transform', 'transform-check', transformCallback, menu)
	}
}

export default imagesAndTransformationsSetup