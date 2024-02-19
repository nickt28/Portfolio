// PDF Height
document.getElementById('pdf').addEventListener('load', function() {
  this.style.height = '800px';
  this.style.boxShadow = 'rgb(0 0 0 / 15%) 0px 10px 15px 0px';
});

// Smooth scroll to project cards
document.getElementById('project-card-votal').addEventListener('click', function () {
  document.getElementById('votal').scrollIntoView({ behavior: 'smooth' });
})

class DarkMode {
  constructor() {
    this.darkMode = localStorage.getItem('darkMode');
    this.observer = [];

    // Check if the user has set a preference for dark mode
    if (this.darkMode === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode = 'true';
      localStorage.setItem('darkMode', this.darkMode);
    }
  }

  toggleDarkModeClass(docClassList) {
    if (this.isDark() === 'true') {
      docClassList.add('dark');
    } else {
      docClassList.remove('dark');
    }
  }

  setupToggle(checkbox, docClassList) {
    checkbox.addEventListener('change', () => {
      this.toggle();
    });
  }

  addObserver(action) {
    this.observer.push(action);
  }

  notifyObservers() {
    this.observer.forEach(actions => actions(this.darkMode));
  }

  toggle() {
    this.darkMode = this.darkMode === 'true' ? 'false' : 'true';
    localStorage.setItem('darkMode', this.darkMode);
    this.notifyObservers();
  }

  isDark() {
    return this.darkMode;
  }
}

// Dark mode setup
const docClassList = document.documentElement.classList
const checkbox = document.getElementById('switch');

const darkMode = new DarkMode();
darkMode.setupToggle(checkbox, docClassList);

// Apply dark mode if it's enabled
if (darkMode.isDark() === 'true') {
  darkMode.toggleDarkModeClass(docClassList)
  checkbox.checked = true;
}

// Add background-color observer
darkMode.addObserver(() => {
  darkMode.toggleDarkModeClass(docClassList);
});

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
  let numStars = canvas1.width < 800 ? 100 : 300;
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

// Set the color of the stars and add to darkMode observer
let starColor = "#dcdcdc";
if (darkMode.isDark() === 'true') {
  starColor = "#5f9ea0";
}

darkMode.addObserver(() => {
  starColor = darkMode.isDark() === 'true' ? "#5f9ea0" : "#dcdcdc";
});

function updateStars() {
  ctx.clearRect(0, 0, canvas1.width, canvas1.height)
  ctx.fillStyle = starColor
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
