const form = document.querySelector("form")

form.addEventListener("submit", function (event) {
    event.preventDefault()
    if (window.ethereum) {
        form.style.background = "red"
    } else {
        alert("Please install an Ethereum wallet")
    }
})