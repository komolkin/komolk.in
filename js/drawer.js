const canvasTag = document.querySelector('canvas')

canvasTag.width = window.innerWidth * 2
canvasTag.height = window.innerHeight * 2

canvasTag.style.width = window.innerWidth + 'px'
canvasTag.style.height = window.innerHeight + 'px'

const context = canvasTag.getContext('2d')
context.scale(2, 2)

const image = document.createElement('img')
image.src = '../images/image1.jpg'

document.addEventListener('mousemove', function () {
    if (image.complete) {
        context.drawImage(image, event.pageX, event.pageY, 480, 600)
    }
})