const form = document.querySelector("form")

const send = function (color) {
    form.style.background = "red"
}

form.addEventListener("submit", function (event) {
    event.preventDefault()
    if (window.ethereum) {
        send()
    } else {
        alert("Please install an Ethereum wallet")
    }
})