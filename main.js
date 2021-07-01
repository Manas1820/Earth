import './style.css'
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'


// Making a sphere
const geometry = new THREE.SphereGeometry(5, 50, 50)
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture: {
      value: new THREE.TextureLoader().load("map.jpg")
    }
  }
})

const sphere = new THREE.Mesh(geometry, material)


const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  antialias:true,
})
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const controls =new OrbitControls(camera, renderer.domElement)

// scatter light on the geometry obtained on the front side
// const light = new THREE.DirectionalLight(0xffffff, 1)
// scene.add(light)
// light.position.set(0, 0, 1)

// // scatter light on the geometry obtained on the back side
// const back_light = new THREE.DirectionalLight(0xffffff, 1)
// scene.add(back_light)
// back_light.position.set(0, 0, -1)


scene.add(sphere);

camera.position.z = 10

const mouse = {
  x: undefined,
  y: undefined
}

addEventListener('mousemove', () => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  raycaster.setFromCamera(mouse, camera)
  controls.update()
}

animate()