const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Add moving light to scene
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 0, 0)
scene.add(light)

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const texture = new THREE.TextureLoader().load("texture.webp")
const material = new THREE.MeshBasicMaterial({ map: texture })
const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, -4, 0)
scene.add(cube)

// 3D object
const modelGroup = new THREE.Group()
let modelCenter = new THREE.Vector3()
const loader = new THREE.GLTFLoader()
loader.load(
  "model.glb",
  function (gltf) {
    model = gltf.scene

    model.scale.set(0.02, 0.02, 0.02)
    model.position.set(0, 0, 0)

    const box = new THREE.Box3().setFromObject(model)
    const boxCenter = box.getCenter(new THREE.Vector3())

    modelCenter = boxCenter
    modelGroup.position.set(modelCenter.x, 1, modelCenter.z)
    
    modelGroup.add(model)
    scene.add(modelGroup)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)

// Rain effect
const rainMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  size: 0.1,
})
const rainGeometry = new THREE.Geometry()
for (let i = 0; i < 10000; i++) {
  const vertex = new THREE.Vector3()
  vertex.x = Math.random() * 100 - 50
  vertex.y = Math.random() * 100 - 25
  vertex.z = Math.random() * 100 - 50
  rainGeometry.vertices.push(vertex)
}
const rainParticles = new THREE.Points(rainGeometry, rainMaterial)
scene.add(rainParticles)

camera.position.set(0, 0, 10)

// Render
function animate() {
  requestAnimationFrame(animate)

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (event) => {
      const { alpha, beta, gamma } = event
      const alphaUniform = alpha / 360
      const betaUniform = beta / 360
      const gammaUniform = gamma / 360

      cube.rotation.x = alphaUniform * 10
      cube.rotation.y = betaUniform * 10
      cube.rotation.z = gammaUniform * 10

      // rotate the group around its center (modelCenter)
      modelGroup.rotation.y = alphaUniform * 10
      modelGroup.rotation.x = betaUniform * 10
      modelGroup.rotation.z = gammaUniform * 10
    })
  }

  light.position.x = Math.cos(Date.now() / 1000) * 10
  light.position.z = Math.sin(Date.now() / 1000) * 10

  rainParticles.position.y -= 0.05

  renderer.render(cube, camera)
  renderer.render(rainParticles, camera)
  renderer.render(scene, camera)
}
animate()
