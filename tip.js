const form = document.querySelector("form")

const send = function (amount) {
    alert("You are going to send " + amount + "ETH")
}

form.addEventListener("submit", function (event) {
    event.preventDefault()
    if (window.ethereum) {
        const input = form.querySelector("input")
        send(input.value)
    } else {
        alert("Please install an Ethereum wallet")
    }
})