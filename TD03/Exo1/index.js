//
// Exercice 1 - Canvas
//

const canvas = document.getElementById("canvas")
const mountainImg = document.getElementById("mountainImg")
const ctx = canvas.getContext("2d")
ctx.drawImage(mountainImg, 0, 0)

drawSunForCanvas(ctx)
drawHouseForCanvas(ctx)

function drawSunForCanvas(ctx) {
  ctx.beginPath()
  ctx.arc(50, 50, 25, 0, 2 * Math.PI) // x, y, radius, startAngle, endAngle
  ctx.fillStyle = "yellow"
  ctx.fill()
}

function drawHouseForCanvas(ctx) {
  ctx.strokeStyle = "black"

  ctx.fillStyle = "orange"
  ctx.fillRect(100, 220, 100, 80) // x, y, width, height
  ctx.strokeRect(100, 220, 100, 80)

  ctx.fillStyle = "maroon"
  ctx.strokeRect(125, 250, 40, 50)
  ctx.fillRect(125, 250, 40, 50)

  ctx.fillStyle = "red"
  ctx.beginPath()
  ctx.moveTo(100, 220) // x, y
  ctx.lineTo(200, 220) // x, y
  ctx.lineTo(150, 150)
  ctx.fill()
}

//
// Exercice 2 - SVG
//

const svg = document.getElementById("svg")

drawBackgroundForSVG(svg)
drawGroundForSVG(svg)
drawMountainForSVG(svg, 20, 200)
drawMountainForSVG(svg, 120, 200)
drawMountainForSVG(svg, 200, 200)
drawMountainForSVG(svg, 300, 200)
drawSunForSVG(svg)
drawHouseForSVG(svg)

const svgDoor = document.getElementById("svgDoor")
const svgSun = document.getElementById("svgSun")
const svgBackground = document.getElementById("svgBackground")

svgDoor.addEventListener("mouseenter", () => {
  svgDoor.setAttribute("fill", getRandomColor())
})

svgSun.addEventListener("click", () => {
  if (svgBackground.getAttribute("fill") === "lightblue") {
    svgBackground.setAttribute("fill", "grey")
  } else {
    svgBackground.setAttribute("fill", "lightblue")
  }
})

function drawBackgroundForSVG(svg) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  rect.id = "svgBackground"
  rect.setAttribute("x", 0)
  rect.setAttribute("y", 0)
  rect.setAttribute("width", 500)
  rect.setAttribute("height", 300)
  rect.setAttribute("fill", "lightblue")
  svg.appendChild(rect)
}

function drawGroundForSVG(svg) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  rect.setAttribute("x", 0)
  rect.setAttribute("y", 200)
  rect.setAttribute("width", 500)
  rect.setAttribute("height", 100)
  rect.setAttribute("fill", "green")
  svg.appendChild(rect)
}

function drawMountainForSVG(svg, x, y) {
  const polygon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  )
  polygon.setAttribute(
    "points",
    `${x},${y} ${x + 170},${y} ${x + 90},${y - 150}`
  ) // x, y, x, y, x, y
  polygon.setAttribute("stroke", "black")
  polygon.setAttribute("fill", "maroon")
  svg.appendChild(polygon)
}

function drawSunForSVG(svg) {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  )
  circle.id = "svgSun"
  circle.style.cursor = "pointer"
  circle.setAttribute("cx", 400)
  circle.setAttribute("cy", 50)
  circle.setAttribute("r", 40)
  circle.setAttribute("fill", "yellow")
  svg.appendChild(circle)
}

function drawHouseForSVG(svg) {
  // wall
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  rect.setAttribute("x", 80)
  rect.setAttribute("y", 200)
  rect.setAttribute("width", 100)
  rect.setAttribute("height", 80)
  rect.setAttribute("stroke", "black")
  rect.setAttribute("fill", "orange")
  svg.appendChild(rect)

  // door
  const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  rect2.id = "svgDoor"
  rect2.setAttribute("x", 105)
  rect2.setAttribute("y", 230)
  rect2.setAttribute("width", 40)
  rect2.setAttribute("height", 50)
  rect.setAttribute("stroke", "black")
  rect2.setAttribute("fill", "maroon")
  svg.appendChild(rect2)

  // roof
  const polygon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  )
  polygon.setAttribute("points", "80,200 180,200 130,150") // x, y, x, y, x, y
  polygon.setAttribute("stroke", "black")
  polygon.setAttribute("fill", "red")
  svg.appendChild(polygon)
}

function getRandomColor() {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
