import * as THREE from 'three'

export class Viewport {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private cube: THREE.Mesh

  constructor() {
    const container = document.createElement('div')
    container.classList.add('three')
    document.body.appendChild(container)

    this.scene = new THREE.Scene()

    const aspect = window.innerWidth / window.innerHeight
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
    this.camera.position.z = 5

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(this.renderer.domElement)

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    this.scene.add(light)

    this.animate = this.animate.bind(this)
    this.animate()
  }

  private animate() {
    requestAnimationFrame(this.animate)
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    this.renderer.render(this.scene, this.camera)
  }
}