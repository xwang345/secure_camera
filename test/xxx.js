const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

loadImage('https://storage.googleapis.com/security-camera-bucket/15428786005781111.jpg').then((image) => {
    ctx.drawImage(image, 50, 0, 70, 70)

    console.log('<img src="' + canvas.toDataURL() + '" />')
})