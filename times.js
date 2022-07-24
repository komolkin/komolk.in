const locations = document.querySelectorAll("section.times div");

const updateTimes = function () {
  locations.forEach((location) => {
    const output = location.querySelector("output");
    const timezone = location.getAttribute("data-timezone");

    const now = luxon.DateTime.now().setZone(timezone);

    output.innerHTML = now.toFormat("t");
  });
};

updateTimes();

setInterval(function () {
  updateTimes();
}, 1000);
