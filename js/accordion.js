function toggleDiv() {
  var displayStatus = document.getElementById("send-eth");
  if (displayStatus.style.display == "flex") {
    displayStatus.style.display = "none";
  } else {
    displayStatus.style.display = "flex";
  }
}
