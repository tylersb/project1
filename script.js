// defining general vars/queryselectors
const start = document.querySelector('#start')
const score = document.querySelector('#score')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)
// grabbing the coordinates for the right side of the screen and the bottom of the screen and remove the 'px' from the end for mathmatical use later in application
const screenRight = parseFloat(getComputedStyle(canvas).width, 10)
const screenBottom = parseFloat(getComputedStyle(canvas).height, 10)

// adding image assets to be used later with canvas
const avSprite = new Image()
avSprite.src = './assets/Ship.png'

const wallSprite = new Image()
wallSprite.src = './assets/Forcefield.png'

const background = new Image()
background.src = './assets/background.png'

// initial loading of background music and setting it to loop when the audio ends
const audio = new Audio('./assets/bgm.mp3')
audio.loop = true

// setting up class(es)
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

// defining game variables and variables that depend on previously defined classes
const randHeight = 200 + Math.floor(Math.random() * 200)
const midHitbox = screenBottom / 2 + 20

// hitboxes for the player controlled avatar
const avatar = new Entity(
  screenRight / 5,
  screenBottom / 2,
  25,
  55,
  'rgba(255, 255, 255, 0)'
)
const avatar2 = new Entity(
  screenRight / 5,
  midHitbox,
  42,
  15,
  'rgba(255, 255, 255, 0)'
)

// hitboxes for the wall obstacles that are spawned
const wall = new Entity(
  screenRight,
  0,
  50,
  randHeight,
  'rgba(255, 255, 255, 0)'
)
const wall2 = new Entity(
  screenRight,
  screenBottom - randHeight,
  50,
  randHeight,
  'rgba(255, 255, 255, 0)'
)

// initial game values for the start of the game
let delayWall = true
let gameRunning = false
let gameScore = 0

// game design/difficulty tunables
const wallSpeed = 3
const avatarSpeed = 5
const secondWallDelay = 700

// avatar movement
// empty array to hold true or false values that are fed into the array from the keydown/keyup/touchstart/touchend event listeners below
let pressedKeys = {}

// function to move both hitboxes for the player avatar with conditionals to prevent moving off the game screen either above or below the screen bounds
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

// equates touch screen events within the primary game window to be equivalent to pressing the W key with a keyboard
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault()
  pressedKeys.w = true
})
canvas.addEventListener('touchend', () => (pressedKeys.w = false))

// obstacle movement
function moveObstacle(wallNum) {
  wallNum.x -= wallSpeed
}

// functions to move obstacles across the screen and then once they move offscreen regenerate them again from the beginning with new randomized heights
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

// start/restart button function that resets game values to initial starting values
function startGame() {
  gameRunning = true
  pressedKeys = {}
  avatar.y = screenBottom / 2
  avatar2.y = midHitbox
  delayWall = true
  setTimeout(function () {
    delayWall = false
  }, secondWallDelay)
  wall.x = screenRight
  wall2.x = screenRight
  gameScore = 0
  if (audio.currentTime === 0) {
    audio.play()
  }
}
start.addEventListener('click', startGame)

// game loop
const gameLoopInterval = setInterval(gameLoop, 1)

function gameLoop() {
  // clear canvas and create avatar & wall hitboxes as well as images for the avatar and walls, then begin incrementing the game score.
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(background, 0, 0)
  avatar.render()
  avatar2.render()
  ctx.drawImage(avSprite, avatar.x - 7, avatar.y - 6, 50, 67)
  wall.render()
  ctx.drawImage(wallSprite, wall.x, wall.y, wall.width, wall.height)
  score.innerText = gameScore
  // delay initial rendering of second wall so that both walls don't generate on top of eachother and become impossible to pass 
  if (delayWall === false) {
    wall2.render()
    ctx.drawImage(wallSprite, wall2.x, wall2.y, wall2.width, wall2.height)
  }
  // check hit detection algorithm and stop game movement + show a Game Over screen if a collision is detected
  if (
    detectHit(avatar, wall) ||
    detectHit(avatar, wall2) ||
    detectHit(avatar2, wall) ||
    detectHit(avatar2, wall2)
  ) {
    gameRunning = false
    ctx.fillStyle = 'white'
    ctx.font = '60px serif'
    ctx.fillText('Game Over!', 350, 300)
  }
  if (gameRunning === true) {
    topWallStreaming(wall)
    if (delayWall === false) {
      bottomWallStreaming(wall2)
    }
    handleMovement(avatarSpeed)
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
  return left && right && top && bottom
}
