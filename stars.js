//Get context and screen size;
const ctx = canvas1.getContext("2d")
let pageWidth = window.innerWidth
let pageHeight = window.innerHeight
let starCount = 0

function resizeCanvas() {
  pageWidth = window.innerWidth
  pageHeight = window.innerHeight
  canvas1.width = pageWidth
  canvas1.height = pageHeight
}
resizeCanvas()

window.addEventListener("resize", function () {
  resizeCanvas()
  initiateStars()
})

function initiateStars() {
  for (let i=0; i < 250; i++) {
    addStar()
  }
}
initiateStars()

function addStar() {
  starCount++
  ctx.fillStyle = "white";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "white";
  let x = pageWidth * Math.random();
  let y = pageHeight * Math.random();
  let r = 3 * Math.random();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}