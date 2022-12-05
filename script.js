// define general vars/queryselectors
const start = document.querySelector('#start')
const score = document.querySelector('#score')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

const avSprite = new Image()
avSprite.src = './assets/Ship.png'

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

// define variables that depend on classes to exist first / game variables
const screenRight = parseFloat(getComputedStyle(canvas).width, 10)
const screenBottom = parseFloat(getComputedStyle(canvas).height, 10)
const randHeight = 200 + Math.floor(Math.random() * 200)
const midHitbox = screenBottom / 2 + 20
const avatar = new Entity(screenRight / 5, screenBottom / 2, 25, 55, 'rgba(255, 255, 255, 0)')
const avatar2 = new Entity(screenRight / 5, midHitbox, 42, 15, 'rgba(255, 255, 255, 0)')
const wall = new Entity(screenRight, 0, 50, randHeight, 'green')
const wall2 = new Entity(
  screenRight,
  screenBottom - randHeight,
  50,
  randHeight,
  'green'
)
let delayWall = true
let gameRunning = false
let gameScore = 0

// avatar movement
let pressedKeys = {}

function handleMovement(speed) {
  if (pressedKeys.w) {
    if (avatar.y > 0) {
      avatar.y -= speed
      avatar2.y -= speed
    }
  } else if (pressedKeys.w === false) {
    if (avatar.y + avatar.height < screenBottom - 5) {
      avatar.y += speed
      avatar2.y += speed
    }
  }
}
document.addEventListener('keydown', (e) => (pressedKeys[e.key] = true))
document.addEventListener('keyup', (e) => (pressedKeys[e.key] = false))

// obstacle movement
const wallSpeed = 4
function moveObstacle(wallNum) {
  wallNum.x -= wallSpeed
}

function topWallStreaming(wallNum) {
  if (wallNum.x + wallNum.width > 0) {
    moveObstacle(wallNum)
  } else if (wallNum.x + wallNum.width <= 0) {
    wallNum.x = screenRight
    wallNum.height = 200 + Math.floor(Math.random() * 200)
  }
}

function bottomWallStreaming(wallNum) {
  if (wallNum.x + wallNum.width > 0) {
    moveObstacle(wallNum)
  } else if (wallNum.x + wallNum.width <= 0) {
    wallNum.x = screenRight
    wallNum.height = 200 + Math.floor(Math.random() * 200)
    wallNum.y = screenBottom - wallNum.height
  }
}

// button functionality
function resetGame() {
  gameRunning = true
  pressedKeys = {}
  avatar.y = screenBottom / 2
  avatar2.y = midHitbox
  delayWall = true
  setTimeout(function () {
    delayWall = false
  }, 2000)
  wall.x = screenRight
  wall2.x = screenRight
  gameScore = 0
}
start.addEventListener('click', resetGame)

// game loop
const gameLoopInterval = setInterval(gameLoop, 16)

function gameLoop() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  avatar.render()
  avatar2.render()
  ctx.drawImage(avSprite, avatar.x - 7, avatar.y - 6, 50, 67)
  wall.render()
  score.innerText = gameScore
  if (delayWall === false) {
    wall2.render()
  }
  if (
    detectHit(avatar, wall) ||
    detectHit(avatar, wall2) ||
    detectHit(avatar2, wall) ||
    detectHit(avatar2, wall2)
  ) {
    gameRunning = false
  }
  if (gameRunning === true) {
    topWallStreaming(wall)
    if (delayWall === false) {
      bottomWallStreaming(wall2)
    }
    handleMovement(4)
    gameScore++
  }
}

// collision detection
function detectHit(objectOne, objectTwo) {
  // AABB -- axis aligned bounding box collision detection
  // check for overlaps, side by side
  const left = objectOne.x + objectOne.width >= objectTwo.x
  const right = objectOne.x <= objectTwo.x + objectTwo.width
  const top = objectOne.y + objectOne.height >= objectTwo.y
  const bottom = objectOne.y <= objectTwo.y + objectTwo.height
  // console.log(left, right, top, bottom)
  return left && right && top && bottom
}
