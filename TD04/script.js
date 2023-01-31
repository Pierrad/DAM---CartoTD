// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0,0,3);


// Light
const light = new THREE.AmbientLight(0xffffff, 1, 100)
scene.add(light)

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create a sphere
const geometry = new THREE.SphereGeometry(1, 32, 32)
const texture = new THREE.TextureLoader().load("./earth.jpg")
const material = new THREE.MeshBasicMaterial({ map: texture })
const sphere = new THREE.Mesh(geometry, material)
sphere.position.set(0, 0, 0)
scene.add(sphere)


// Show current position on the sphere
navigator.geolocation.getCurrentPosition(function (position) {
  const { latitude, longitude } = position.coords

  const { x, y, z } = convertGeoCoordsToCartesianCoods(
    latitude,
    longitude,
    1
  )

  // Add a point to the sphere
  // const pointGeometry = new THREE.SphereGeometry(0.01, 32, 32)
  // const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  // const point = new THREE.Mesh(pointGeometry, pointMaterial)
  // point.position.set(x, y, z)
  // sphere.add(point)

  // Add a 3D model to the sphere
  const loader = new THREE.GLTFLoader()
  loader.load(
    "model.glb",
    function (gltf) {
      model = gltf.scene
  
      model.scale.set(0.005, 0.005, 0.005)
      model.position.set(x, y, z)
      model.rotation.set(2, 2, 4.5)

      sphere.add(model)
    },
    undefined,
    function (error) {
      console.error(error)
    }
  )
})

// Load Countries and add flags
fetch("https://restcountries.com/v3.1/all").then((response) => {
  return response.json()
}).then((data) => {
  data.forEach((country) => {
    const { latlng, flags } = country
    const { x, y, z } = convertGeoCoordsToCartesianCoods(
      latlng[0],
      latlng[1],
      1
    )

    const flagGeometry = new THREE.SphereGeometry(0.03, 32, 32)
    const flagTexture = new THREE.TextureLoader()
    const myTexture = flagTexture.load(flags.png)
    const flagMaterial = new THREE.MeshBasicMaterial({ map: myTexture })
    const flag = new THREE.Mesh(flagGeometry, flagMaterial)
    flag.position.set(x, y, z)
    sphere.add(flag)

  })
})

// Render
function animate() {
  requestAnimationFrame(animate)

  sphere.rotation.y += 0.01

  renderer.render(scene, camera)
}
animate()

function convertGeoCoordsToCartesianCoods(lat, lon, radius) {
  const phi = (lat * Math.PI) / 180
  const theta = ((lon - 180) * Math.PI) / 180

  const x = -(radius * Math.cos(phi) * Math.cos(theta))
  const y = radius * Math.sin(phi)
  const z = radius * Math.cos(phi) * Math.sin(theta)

  return { x, y, z }
}