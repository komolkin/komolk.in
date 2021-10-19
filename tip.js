const form = document.querySelector("form")

form.addEventListener("submit", function (event) {
    event.preventDefault()
    form.this.style.background = "red"
})