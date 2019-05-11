const canvasTag = document.querySelector('canvas')

canvasTag.width = window.innerWidth * 2
canvasTag.height = window.innerHeight * 2

canvasTag.style.width = window.innerWidth + 'px'
canvasTag.style.height = window.innerHeight + 'px'

const context = canvasTag.getContext('2d')
context.scale(2, 2)

let i = 0

const images = ['../images/image1.jpg', '../images/image2.jpg'].map(src => {
    const image = document.createElement('img')
    image.src = src
    return image
})

// const image = document.createElement('img')
// image.src = '../images/image1.jpg'

document.addEventListener('mousemove', function () {
    if (images[i].complete) {
        context.drawImage(images[i], event.pageX - 240, event.pageY - 300, 480, 600)
    }
})

canvasTag.addEventListener('click', function () {
    i = i + 1
    if (i >= images.length) {
        i = 0
    }
})