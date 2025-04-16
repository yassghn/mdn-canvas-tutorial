/**
 * loadWebResource.mjs
 */

async function loadImage(src, id) {
	const img = new Image()
	img.src = src
	img.setAttribute('id', id)
	img.setAttribute('hidden', '')
	// await decode to ensure image is loaded
	await img.decode()
	document.body.appendChild(img)
}

export async function loadPatternImage() {
	// load image
	await loadImage('/resource/pattern-mdn-tutorial.png', 'patterns-image')
}

export async function loadBackdropImage() {
	// load image
	await loadImage('/resource/backdrop.png', 'drawing-images-backdrop-image')
}

export async function loadScalingImage() {
	await loadImage('/resource/rhino.jpg', 'scaling-images-rhino-image')
}

export async function loadSlicingImage() {
	await loadImage('/resource/canvas_picture_frame.png', 'slicing-images-frame-image')
}