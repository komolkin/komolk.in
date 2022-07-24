var myArray = ["68", "72", "71", "67", "69", "70", "65"];

const updateRate = () => {
  const randomItem = myArray[Math.floor(Math.random() * myArray.length)];
  document.querySelector("section.heart div .rate").innerHTML = randomItem;
};

setInterval(updateRate, 5000);
