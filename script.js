// define general vars/queryselectors
const start = document.querySelector('#start')
const quit = document.querySelector('#quit')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

// set up class(es)
class Entity {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }
  
  render() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

// define variables that depend on classes to exist first
const avatar = new Entity(50, 300, 25, 25, '#99FFFF')
const screenRight = parseFloat(getComputedStyle(canvas).width, 10)
const wall = new Entity(screenRight, 0, 25, 250, 'green')

// avatar movement
const pressedKeys = {}
const screenBottom = parseFloat(getComputedStyle(canvas).height, 10)

function handleMovement (speed) {
  if (pressedKeys.w) {
    if (avatar.y > 0) {
      avatar.y -= speed
    }
  } else if (pressedKeys.w === false) {
    if ((avatar.y + avatar.height) < (screenBottom - 5)) {
      avatar.y += speed
    }
  }
}
document.addEventListener('keydown', (e) => (pressedKeys[e.key] = true))
document.addEventListener('keyup', (e) => (pressedKeys[e.key] = false))

// obstacle movement
function moveObstacle (speed) {
  wall.x -= speed
}

// game loop
const gameLoopInterval = setInterval(gameLoop, 16)

function gameLoop() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  avatar.render()
  wall.render()
  if ((wall.x + wall.width) > 0) {
    moveObstacle(3)
    console.log(wall)
  } else if ((wall.x + wall.width) <= 0) {
    wall.x = screenRight
    console.log(wall)
  }
  handleMovement(4)
}

// collision detection
