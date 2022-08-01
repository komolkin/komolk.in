const cursorTag = document.querySelector("div.cursors");
const ball = cursorTag.querySelector("div");

let currentX = 0;
let currentY = 0;
let aimX = 0;
let aimY = 0;
let speed = 0.2;

const animate = function () {
  currentX += (aimX - currentX) * speed;
  currentY += (aimY - currentY) * speed;

  ball.style.left = currentX + "px";
  ball.style.top = currentY + "px";

  requestAnimationFrame(animate);
};

animate();

document.addEventListener("mousemove", function (event) {
  aimX = event.pageX;
  aimY = event.pageY;
});

$(document).ready(function () {
  $("nav, form").mouseover(function () {
    $(".circle").css({
      width: "16px",
      height: "16px",
      transition: "width .4s ease, height .4s ease",
    });
  });
  $("nav, form").mouseout(function () {
    $(".circle").css({ width: "64px", height: "64px" });
  });
});
