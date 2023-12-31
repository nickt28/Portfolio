const votal = document.getElementById('votal')
document.getElementById('project-card-votal').addEventListener('click', function () {
    votal.scrollIntoView({ behavior: 'smooth' });
})

// Creaet stars animation
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
  let speed = pageHeight/10000*(1+Math.random())
  stars.push({ x, y, r, speed })
}

// Draw the stars in stars array on the canvas
function updateStars() {
  ctx.clearRect(0, 0, pageWidth, pageHeight)
  
  stars.forEach(updateStar)
  
  ctx.fillStyle = "#ffffff21"
  ctx.beginPath()
  const endAngle = Math.PI * 2
  stars.forEach(star => {
    ctx.moveTo(star.x + star.r, star.y)
    ctx.arc(star.x, star.y, star.r, 0, endAngle)
  })
  ctx.fill()

  requestAnimationFrame(updateStars)
}

function updateStar(star) {
  // move the star up the canvas by the star's speed
  star.y -= star.speed
  // if the star goes off the top of the canvas + the star's radius, reset it to the bottom
  if (star.y < -star.r) {
    star.y = pageHeight
  }
}

resizeCanvas()
initiateStars()
updateStars()
