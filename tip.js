const form = document.querySelector("form")

const send = function (amount) {
    alert("You are going to send " + amount)
}

form.addEventListener("submit", function (event) {
    event.preventDefault()
    if (window.ethereum) {
        send("0.01")
    } else {
        alert("Please install an Ethereum wallet")
    }
})