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
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i]
    star.y -= star.speed
    if (star.y < -star.r) {
      // if star goes off the top of the screen, reset its position to the bottom
      star.y = pageHeight + star.r
    }
    ctx.fillStyle = "white"
    ctx.shadowBlur = 10
    ctx.shadowColor = "white"
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
    ctx.fill()
  }
  requestAnimationFrame(updateStars)
}

resizeCanvas()
initiateStars()
updateStars()
