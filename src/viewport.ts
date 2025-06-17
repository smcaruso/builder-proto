import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as THREE from 'three'
import gsap from 'gsap'

export class Viewport {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private controls: OrbitControls
  private testObjects: { model: THREE.Object3D; speed: number }[] = []
  private raycaster = new THREE.Raycaster()
  private mouse = new THREE.Vector2()
  private hoveredObject: THREE.Object3D | null = null
  private textArea = document.getElementById("chat-box") as HTMLTextAreaElement
  private textAreaPlaceholders: string[] = [
    "an electronics store in an urban loft space",
    "a cozy bookstore with plants and vintage furniture",
    "a minimalist skincare kiosk in a high-end mall",
    "a sneaker boutique with industrial concrete walls",
    "a gourmet spice shop with warm wooden shelving",
    "a VR gaming lounge in a neon-lit warehouse",
    "a retro arcade-themed clothing store",
    "a jewelry pop-up in a converted train car",
    "a tech repair bar with sleek counters and stools",
    "an artisan coffee stand with reclaimed wood decor",
    "a digital art gallery in a white cube space",
    "a home goods store inspired by Japanese design",
    "a camping gear shop in a dome-shaped structure",
    "a music shop filled with vinyl and cassette tapes",
    "a bike repair and cafe hybrid on a city corner",
    "a curated fashion shop with rotating art exhibits",
    "a handmade ceramics store in a garden greenhouse",
    "a pet accessories boutique in a pink shipping container",
    "a travel essentials kiosk at an airport terminal",
    "a futuristic showroom for modular furniture"
  ]

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

    this.createTestCubes()

    this.animate = this.animate.bind(this)
    this.animate()

    window.addEventListener('mousemove', this.onMouseMove.bind(this))
    window.addEventListener('click', this.onClick.bind(this))
  }

  private createTestCubes() {
    const loader = new GLTFLoader()
    const texture = new THREE.TextureLoader().load('/model/previewcube.png')
    texture.flipY = false

    const totalObjects = 40

    loader.load('/model/previewcube.glb', gltf => {
      const quadrantCounts = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 }
      const maxPerQuadrant = totalObjects / 4

      let quadrant: keyof typeof quadrantCounts = 'Q1'

      for (let i = 0; i < totalObjects; i++) {
        const model = gltf.scene.clone(true)
        model.traverse(child => {
          if ((child as THREE.Mesh).isMesh) {
            // const baseMaterial = material.clone()
            // baseMaterial.map = texture
            (child as THREE.Mesh).material = new THREE.MeshBasicMaterial({ map: texture })
          }
        })

        const xSpread = window.innerWidth / window.innerHeight * 40
        const ySpread = 40

        let x = 0, y = 0
        const deadZoneSize = 10

        while (true) {
          x = (Math.random() - 0.5) * xSpread
          y = (Math.random() - 0.5) * ySpread

          const aspect = window.innerWidth / window.innerHeight
          if (
            Math.abs(x) < deadZoneSize * aspect &&
            Math.abs(y) < deadZoneSize
          ) continue

          quadrant =
            x >= 0 && y >= 0 ? 'Q1' :
            x < 0 && y >= 0 ? 'Q2' :
            x < 0 && y < 0 ? 'Q3' : 'Q4'

          if (quadrantCounts[quadrant] < maxPerQuadrant) break
        }

        quadrantCounts[quadrant]++

        model.position.set(x, y, ((Math.random() - 1.0) * 60) + 1)
        this.testObjects.push({
          model,
          speed: (Math.random() > 0.5 ? 1 : -1) * (0.001 + Math.random() * 0.005)
        })
        this.scene.add(model)
      }
    })
  }

  private animate() {
    // Raycasting logic for hover effect
    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.testObjects.map(obj => obj.model), true)

    if (this.hoveredObject && (intersects.length === 0 || this.hoveredObject !== intersects[0].object.parent)) {
      gsap.to(this.hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3 })
      this.hoveredObject.traverse(child => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
          gsap.to(mat.color, { r: 1, g: 1, b: 1, duration: 0.3 })
        }
      })
      this.textArea.placeholder = "Type, enter a URL, or upload a file."
      document.body.style.cursor = "default"
      this.textArea.classList.remove("hovered")
      this.hoveredObject = null
    }

    if (intersects.length > 0 && this.hoveredObject === null) {
      const object = intersects[0].object.parent
      if (object) {
        this.hoveredObject = object
        gsap.to(object.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3 })
        const randomIndex = Math.floor(Math.random() * this.textAreaPlaceholders.length)
        this.textArea.value = ""
        this.textArea.placeholder = this.textAreaPlaceholders[randomIndex]
        document.body.style.cursor = "pointer"
        this.textArea.classList.add("hovered")
        object.traverse(child => {
          if ((child as THREE.Mesh).isMesh) {
            const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
            gsap.to(mat.color, { r: 4, g: 2, b: 4, duration: 0.3 })
          }
        })
      }
    }

    requestAnimationFrame(this.animate)
    this.controls.update()
    for (const obj of this.testObjects) {
      obj.model.position.z += obj.speed
    }
    this.renderer.render(this.scene, this.camera)
  }

  private onMouseMove(event: MouseEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  private onClick() {
    if (this.hoveredObject && this.textArea) {
      this.textArea.value = this.textArea.placeholder
      this.textArea.placeholder = "Type, enter a URL, or upload a file."
      this.textArea.classList.remove("hovered")
    }
  }

  zoomOut() {
    gsap.to(this.camera.position, { z: 500, duration: 10, ease: "out" })
  }
}