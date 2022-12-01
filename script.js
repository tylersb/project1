;({
  plugins: ['jsdom-quokka-plugin'],
  jsdom: { file: 'seir-1114/unit1/project1/index.html' }
})

// define vars/queryselectors
const start = document.querySelector('#start')
const quit = document.querySelector('#quit')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)
const gameLoopInterval = setInterval(gameLoop, 16)

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
const pressedKeys = {}
const screenBottom = parseFloat(getComputedStyle(canvas).height, 10)

// avatar movement
function handleMovement (speed) {
  // console.log(e.key)
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
console.log(screenBottom)

// game loop
function gameLoop() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  avatar.render()
  handleMovement(4)
}
// collision detection
