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
const screenRight = parseFloat(getComputedStyle(canvas).width, 10)
const screenBottom = parseFloat(getComputedStyle(canvas).height, 10)
const randHeight = 100 + Math.floor(Math.random() * 300)
const avatar = new Entity((screenRight / 5), (screenBottom / 2), 25, 25, '#99FFFF')
const wall = new Entity(screenRight, 0, 50, randHeight, 'green')
const wall2 = new Entity(screenRight, (screenBottom - randHeight), 50, randHeight, 'green')
let delayWall = true
setTimeout(function () { delayWall = false }, 2000)

// avatar movement
const pressedKeys = {}

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
const wallSpeed = 4
function moveObstacle (wallNum) {
  wallNum.x -= wallSpeed
}

function topWallStreaming (wallNum) {
  if ((wallNum.x + wallNum.width) > 0) {
    moveObstacle(wallNum)
    // console.log(wall)
  } else if ((wallNum.x + wallNum.width) <= 0) {
    wallNum.x = screenRight
    console.log(wallNum)
    wallNum.height = (100 + Math.floor(Math.random() * 300))
  }
}

function bottomWallStreaming (wallNum) {
  if ((wallNum.x + wallNum.width) > 0) {
    moveObstacle(wallNum)
    // console.log(wall)
  } else if ((wallNum.x + wallNum.width) <= 0) {
    wallNum.x = screenRight
    console.log(wallNum)
    wallNum.height = (100 + Math.floor(Math.random() * 300))
    wallNum.y = screenBottom - wallNum.height
  }
}

// game loop
const gameLoopInterval = setInterval(gameLoop, 16)

function gameLoop() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  avatar.render()
  wall.render()
  topWallStreaming(wall)
  if (delayWall === false) {
    wall2.render()
    bottomWallStreaming(wall2)
  }
  handleMovement(4)
}

// collision detection
