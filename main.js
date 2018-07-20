var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var active = false

window.onresize = function () {
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
}

canvas.onmousedown = function(down){
  var x = down.clientX
  var y = down.clientY
  active = !active
  var first = [x, y]
}

canvas.onmousemove = function (move) {
  var x = move.clientX
  var y = move.clientY
  var last = [x,y]
  if (active) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.moveTo(first[0],first[1])
    ctx.lineTo(x,y)
    ctx.stroke()
  }
  first = last
}

canvas.onmouseup = function () {
  active = !active
}

