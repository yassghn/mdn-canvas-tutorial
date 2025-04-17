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

export async function loadArtGalleryImages() {
	await loadImage('resource/bg_gallery.png', 'gallery-bg-image')
	await loadImage('resource/gallery_1.jpg', 'gallery-1-image')
	await loadImage('resource/gallery_2.jpg', 'gallery-2-image')
	await loadImage('resource/gallery_3.jpg', 'gallery-3-image')
	await loadImage('resource/gallery_4.jpg', 'gallery-4-image')
	await loadImage('resource/gallery_5.jpg', 'gallery-5-image')
	await loadImage('resource/gallery_6.jpg', 'gallery-6-image')
	await loadImage('resource/gallery_7.jpg', 'gallery-7-image')
	await loadImage('resource/gallery_8.jpg', 'gallery-8-image')
}