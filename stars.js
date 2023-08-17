//Get context and screen size;
const ctx = canvas1.getContext("2d")
let pageWidth = window.innerWidth
let pageHeight = window.innerHeight
let stars = []

function resizeCanvas() {
  pageWidth = window.innerWidth
  pageHeight = window.innerHeight
  canvas1.width = pageWidth
  canvas1.height = pageHeight
}

window.addEventListener("resize", function () {
  resizeCanvas()
  resetStarsYCords()
})

function resetStarsYCords() {
  for (let i=0, l=stars.length; i<l; i++) {
    stars[i].x = pageWidth * Math.random()
  }
}

function initiateStars() {
  for (let i=0; i < 500; i++) {
    addStar()
  }
}

// Add a star to the stars array
function addStar() {
  let x = pageWidth * Math.random()
  let y = pageHeight * Math.random()
  let r = 3 * Math.random()
  let speed = 0.8 * Math.random() // random speed between 1 and 4 pixels per frame
  stars.push({ x, y, r, speed })
}

// Draw the stars in stars array on the canvas
function updateStars() {
  ctx.clearRect(0, 0, pageWidth, pageHeight)
  stars.forEach(updateStar)
  drawStars()
  requestAnimationFrame(updateStars)
}

function updateStar(star) {
  star.y -= star.speed
  if (star.y < -star.r) {
    star.y = pageHeight + star.r
  }
}

function drawStars() {
  ctx.fillStyle = "white"
  ctx.shadowBlur = 10
  ctx.shadowColor = "white"
  ctx.beginPath()
  stars.forEach(star => {
    ctx.moveTo(star.x + star.r, star.y)
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
  })
  ctx.fill()
}

resizeCanvas()
initiateStars()
updateStars()
