var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var active = false
var usingEraser = false
var first
autoresize()

window.onresize = function () {
  autoresize()
}

pencil.onclick = function () {
  usingEraser = false
  ctx.lineWidth = 1
  strokeStyle = "black"
}
eraser.onclick = function () {
  usingEraser = true
}
download.onclick = function () {
  var dataURL = canvas.toDataURL('image/png')
  var imgdownload = document.getElementById('adownload')
  imgdownload.href = dataURL
}

lineWidth(thin, 5)
lineWidth(thick,10)

color(red,'red')
color(green,'green')
color(blue,'blue')

if (document.body.ontouchstart !== undefined) {
  canvas.ontouchstart = function (start) {
    var x = start.touches[0].clientX
    var y = start.touches[0].clientY
    first = [x, y]
    active = !active
  }

  canvas.ontouchmove = function (move) {
    var x = move.touches[0].clientX
    var y = move.touches[0].clientY
    var last = [x, y]
    if (active) {
      if (usingEraser) {
        clear(x,y)
      } else {
        draw(first,x,y)
      }
    }
    first = last
  }

  canvas.ontouchend = function () {
    active = !active
  }
} else {
  canvas.onmousedown = function (down) {
    var x = down.clientX
    var y = down.clientY
    active = !active
    first = [x, y]
  }

  canvas.onmousemove = function (move) {
    var x = move.clientX
    var y = move.clientY
    var last = [x, y]
    if (active) {
      if (usingEraser) {
        clear(x, y)
      } else {
        draw(first, x, y)
      }
    }
    first = last
  }

  canvas.onmouseup = function () {
    active = !active
  }
}

/**********工具函数**************/
function autoresize() {
  var pagewidth = document.documentElement.clientWidth
  var pageheight = document.documentElement.clientHeight
  canvas.width = pagewidth
  canvas.height = pageheight
}

function color(id,color) {
  id.onclick = function () {
    ctx.strokeStyle = color
  }
}

function lineWidth(id, width) {
  id.onclick = function () {
    ctx.lineWidth = width
  }
}

function draw(arry, x, y) {
  ctx.beginPath()
  ctx.moveTo(arry[0], arry[1])
  ctx.lineTo(x, y)
  ctx.stroke()
}

function clear(x, y) {
  ctx.clearRect(x - 5, y - 5, 10, 10)
}