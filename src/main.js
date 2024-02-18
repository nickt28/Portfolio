// PDF Height
document.getElementById('pdf').addEventListener('load', function() {
  this.style.height = '800px';
});

// Smooth scroll to project cards
document.getElementById('project-card-votal').addEventListener('click', function () {
  document.getElementById('votal').scrollIntoView({ behavior: 'smooth' });
})

// Create a new canvas element
let newCanvas = document.createElement('canvas');
newCanvas.id = 'canvas1';
document.getElementById('background').appendChild(newCanvas);

// Create stars animation
let canvas1 = document.getElementById('canvas1');
let ctx = canvas1.getContext('2d');

let stars = []

function resizeCanvas() {
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
}

window.addEventListener("resize", function () {
  console.log('resizeCanvas')
  oldX = canvas1.width;
  resizeCanvas()
  resetStarsXCords(oldX)
})

function resetStarsXCords(oldX) {
  let widthChanged = oldX !== window.innerWidth;
  if (widthChanged) {
    for (let i=0, l=stars.length; i<l; i++) {
      stars[i].x *= canvas1.width / oldX;
    }
  }
}

function initiateStars() {
  let numStars = canvas1.width < 800 ? 250 : 500;
  for (let i=0; i < numStars; i++) {
    addStar();
  }
}

// Add a star to the stars array
function addStar() {
  let x = canvas1.width * Math.random()
  let y = canvas1.height * Math.random()
  let r = 3 * Math.random()
  let speed = canvas1.height/10000*(1+Math.random())
  stars.push({ x, y, r, speed })
}

// Draw the stars in stars array on the canvas
function updateStars() {
  ctx.clearRect(0, 0, canvas1.width, canvas1.height)
  
  ctx.fillStyle = "#ffffff21"
  ctx.beginPath()
  const endAngle = Math.PI * 2

  stars.forEach(star => {
    // move the star up the canvas by the star's speed
    star.y -= star.speed
    // if the star goes off the top of the canvas + the star's radius, reset it to the bottom
    if (star.y < -star.r) {
      star.y = canvas1.height
    }
    ctx.moveTo(star.x + star.r, star.y)
    ctx.arc(star.x, star.y, star.r, 0, endAngle)
  })
  
  ctx.fill()
  requestAnimationFrame(updateStars)
}

resizeCanvas()
initiateStars()
updateStars()
