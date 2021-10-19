const web3 = new Web3(Web3.givenProvider)

const form = document.querySelector("form")

const send = async function (amount) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

    // alert(accounts)
    // alert("You are going to send " + amount + " ETH")

    const wei = web3.utils.toWei(amount, "ether")

    if (accounts.length > 0) {
        window.ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: accounts[0],
                to: "0x383351E7787347fC7CfE44561c645D6b382e4525",
                value: wei
            }]
        })
    }
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