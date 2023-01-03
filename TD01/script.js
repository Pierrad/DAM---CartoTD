if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude, altitude, speed, accuracy } = position.coords

    const positionEl = document.getElementById("position1")
    const precisionEl = document.getElementById("precision1")
    const speedEl = document.getElementById("speed1")
    const dateEl = document.getElementById("date1")

    positionEl.innerHTML = `Latitude: ${latitude} °, Longitude: ${longitude} °, Altitude: ${altitude} m`
    precisionEl.innerHTML = `Precision: ${accuracy} m`
    speedEl.innerHTML = `Speed: ${speed} m/s`
    dateEl.innerHTML = `Date: ${new Date(position.timestamp)}`
  })

  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude, altitude, speed, accuracy } = position.coords

    const positionEl = document.getElementById("position2")
    const precisionEl = document.getElementById("precision2")
    const speedEl = document.getElementById("speed2")
    const dateEl = document.getElementById("date2")

    positionEl.innerHTML = `Latitude: ${latitude} °, Longitude: ${longitude} °, Altitude: ${altitude} m`
    precisionEl.innerHTML = `Precision: ${accuracy} m`
    speedEl.innerHTML = `Speed: ${speed} m/s`
    dateEl.innerHTML = `Date: ${new Date(position.timestamp)}`
  })
} else {
  window.alert("Geolocation is not available")
}

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (event) => {
    const { alpha, beta, gamma } = event
    const alphaEl = document.getElementById("alpha")
    const betaEl = document.getElementById("beta")
    const gammaEl = document.getElementById("gamma")

    alphaEl.innerHTML = `Alpha: ${alpha} °`
    betaEl.innerHTML = `Beta: ${beta} °`
    gammaEl.innerHTML = `Gamma: ${gamma} °`
  })
}

if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", (event) => {
    const {
      acceleration,
      accelerationIncludingGravity,
      rotationRate,
    } = event
    const accelerationEl = document.getElementById("acceleration")
    const accelerationIncludingGravityEl = document.getElementById(
      "accelerationIncludingGravity"
    )
    const rotationRateEl = document.getElementById("rotationRate")

    accelerationEl.innerHTML = `Acceleration: ${acceleration.x} m/s², ${acceleration.y} m/s², ${acceleration.z} m/s²`
    accelerationIncludingGravityEl.innerHTML = `Acceleration including gravity: ${accelerationIncludingGravity.x} m/s², ${accelerationIncludingGravity.y} m/s², ${accelerationIncludingGravity.z} m/s²`
    rotationRateEl.innerHTML = `Rotation rate: ${rotationRate.alpha} °/s, ${rotationRate.beta} °/s, ${rotationRate.gamma} °/s`
  })
}

const touchEl = document.getElementById("touchposition")
const touchTypeEl = document.getElementById("touchtype")

document.addEventListener("touchstart", (event) => {
  touchTypeEl.innerHTML = "Touch start"

  const { touches } = event
  if (touches.length === 0) return

  touchEl.innerHTML = `Touch: ${touches[0].clientX}, ${touches[0].clientY}`
})

document.addEventListener("touchmove", () => {
  touchTypeEl.innerHTML = "Touch move"
})

document.addEventListener("touchend", () => {
  touchTypeEl.innerHTML = "Touch end"
})

document.addEventListener("touchcancel", () => {
  touchTypeEl.innerHTML = "Touch cancel"
})

// Draw on canvas
const drawCanvas = document.getElementById("canvas")
const ctx = drawCanvas.getContext("2d")
const viewport = window.visualViewport
let offsetX
let offsetY
const currentTouches = []

function getCurrentTouchIndexByID(idToFind) {
  for (let i = 0; i < currentTouches.length; i++) {
    const id = currentTouches[i].identifier
    if (id === idToFind) {
      return i
    }
  }
  return -1
}

function handleTouchStart(event) {
  const { touches } = event
  if (touches.length === 0) return

  offsetX = drawCanvas.getBoundingClientRect().left
  offsetY = drawCanvas.getBoundingClientRect().top
  for (let i = 0; i < touches.length; i++) {
    currentTouches.push({
      identifier: touches[i].identifier,
      clientX: touches[i].clientX,
      clientY: touches[i].clientY,
    })
  }
}

function handleTouchMove(event) {
  const { touches } = event
  if (touches.length === 0) return

  for (let i = 0; i < touches.length; i++) {
    const idx = getCurrentTouchIndexByID(touches[i].identifier)
    if (idx >= 0) {
      ctx.beginPath()
      ctx.moveTo(
        currentTouches[idx].clientX - offsetX,
        currentTouches[idx].clientY - offsetY
      )
      ctx.lineTo(touches[i].clientX - offsetX, touches[i].clientY - offsetY)
      ctx.lineWidth = 4
      ctx.strokeStyle = "black"
      ctx.lineJoin = "round"
      ctx.closePath()
      ctx.stroke()
      currentTouches.splice(idx, 1, {
        identifier: touches[i].identifier,
        clientX: touches[i].clientX,
        clientY: touches[i].clientY,
      })
    }
  }
}

function handleTouchEnd(event) {
  const { touches } = event
  if (touches.length === 0) return

  for (let i = 0; i < touches.length; i++) {
    let idx = getCurrentTouchIndexByID(touches[i].identifier)
    if (idx >= 0) {
      ctx.lineWidth = 4
      ctx.fillStyle = "black"
      currentTouches.splice(idx, 1)
    }
  }
}

function handleTouchCancel(event) {
  const { touches } = event
  if (touches.length === 0) return

  for (let i = 0; i < touches.length; i++) {
    let idx = getCurrentTouchIndexByID(touches[i].identifier)
    currentTouches.splice(idx, 1)
  }
}

function listenForDrawing() {
  drawCanvas.addEventListener("touchstart", handleTouchStart)
  drawCanvas.addEventListener("touchend", handleTouchEnd)
  drawCanvas.addEventListener("touchcancel", handleTouchCancel)
  drawCanvas.addEventListener("touchmove", handleTouchMove)
}

document.addEventListener("DOMContentLoaded", listenForDrawing)
