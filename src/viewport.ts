import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { PreviewCubes } from './previewCubes'
import * as THREE from 'three'
import gsap from 'gsap'

export class Viewport {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private controls: OrbitControls
  private previewCubes?: PreviewCubes

  private enableHoverEffects = true

  constructor() {

    const container = document.createElement('div')
    container.classList.add('three')
    document.body.appendChild(container)

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0x0C0818, 25, 175)
    // this.scene.add(new THREE.AxesHelper(10))

    const aspect = window.innerWidth / window.innerHeight
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
    this.camera.position.z = 10

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

    this.scene.userData.camera = this.camera
    this.scene.userData.renderer = this.renderer

    
    this.animate = this.animate.bind(this)
    this.animate()
    
  }
  
  public connectTextArea(area: HTMLTextAreaElement) {
    this.previewCubes = new PreviewCubes(this.scene)
    this.previewCubes?.connectTextArea(area)
  }

  private animate() {
    if (this.enableHoverEffects) {
      this.previewCubes?.animate()
    }

    requestAnimationFrame(this.animate)
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  zoomOut() {
    gsap.to(this.camera.position, { z: 500, duration: 4, ease: "in-out", onComplete: this.dispose.bind(this)})
  }

  public dispose() {
    this.previewCubes?.dispose()
  }

}