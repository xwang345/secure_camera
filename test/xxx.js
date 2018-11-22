const { createCanvas, loadImage } = require('canvas')

loadImage('https://storage.googleapis.com/security-camera-bucket/15428786005781111.jpg').then((image) => {
    const canvas = createCanvas(200, 200)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 50, 0, 70, 70)
    console.log(canvas.toDataURL())
})