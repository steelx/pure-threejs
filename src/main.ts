import "./style.css"

import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Scene
const scene = new THREE.Scene()

// Objects
const group = new THREE.Group()
scene.add(group)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const limeGreenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const cube1 = new THREE.Mesh(boxGeometry, redMaterial)
group.add(cube1)

const cube2 = new THREE.Mesh(boxGeometry, limeGreenMaterial)
cube2.position.x = -2
group.add(cube2)

const cube3 = new THREE.Mesh(boxGeometry, blueMaterial)
cube3.position.x = 2
group.add(cube3)

// 1 PI is 180 degrees
group.rotation.y = Math.PI / 4 // 45 degrees

// Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Camera
const SIZES = {
	width: 800,
	height: 600,
}
const camera = new THREE.PerspectiveCamera(75, SIZES.width / SIZES.height, 0.1, 100)
camera.position.z = 3

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(SIZES.width, SIZES.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.querySelector<HTMLDivElement>("#app")!.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// loop
const clock = new THREE.Clock()
;(function tick() {
	const dt = clock.getDelta()

	// Update objects
	group.rotation.y += 0.1 * dt
	group.position.y = Math.sin(clock.getElapsedTime())

	controls.update()

	// render
	renderer.render(scene, camera)

	window.requestAnimationFrame(tick)
})()
