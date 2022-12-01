;({
  plugins: ['jsdom-quokka-plugin'],
  jsdom: { file: 'seir-1114/unit1/project1/index.html' }
})

// define vars/queryselectors
const start = document.querySelector('#start')
const quit = document.querySelector('#quit')
const canvas = document.querySelector('canvas')
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

const ctx = canvas.getContext('2d')

// set up class(es)
class Entity {
  constructor (x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  render () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

// define variables that depend on classes to exist first

// avatar movement

// game loop

// collision detection
