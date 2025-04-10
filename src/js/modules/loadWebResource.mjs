/**
 * loadWebResource.mjs
 */

export async function loadPatternImage() {
	const img = new Image()
	img.src = '/resource/pattern-mdn-tutorial.png'
	img.setAttribute('id', 'patterns-image')
	img.setAttribute('hidden', '')
	// await decode to ensure image is loaded
	await img.decode()
	document.body.appendChild(img)
}