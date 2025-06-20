import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import * as THREE from 'three'
import gsap from 'gsap'

export class PreviewCubes {
  private testObjects: { model: THREE.Object3D; speed: number }[] = []
  private raycaster = new THREE.Raycaster()
  private mouse = new THREE.Vector2()
  private hoveredObject: THREE.Object3D | null = null
  private textArea?: HTMLTextAreaElement
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
  private enableHoverEffects = true
  private scene: THREE.Scene

  constructor(scene: THREE.Scene) {
    this.scene = scene

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
          speed: (Math.random() > 0.5 ? 1 : -1) * (0.002 + Math.random() * 0.01)
        })
        this.scene.add(model)
      }
    })
  }

  public connectTextArea(area: HTMLTextAreaElement) {
    this.textArea = area
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('click', this.onClick)
  }

  private handleHoverEffects() {
    this.raycaster.setFromCamera(this.mouse, this.scene.userData.camera as THREE.Camera)
    const intersects = this.raycaster.intersectObjects(this.testObjects.map(obj => obj.model), true)

    if (this.hoveredObject && (intersects.length === 0 || this.hoveredObject !== intersects[0].object.parent)) {
      gsap.to(this.hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3 })
      this.hoveredObject.traverse(child => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
          gsap.to(mat.color, { r: 1, g: 1, b: 1, duration: 0.3 })
        }
      })
      if (this.textArea) {
        this.textArea.placeholder = "Type, enter a URL, or upload a file."
        document.body.style.cursor = "default"
        this.textArea.classList.remove("hovered")
        this.hoveredObject = null
      }
    }

    if (intersects.length > 0 && this.hoveredObject === null) {
      const object = intersects[0].object.parent
      if (object && this.textArea) {
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
  }

  public animate() {
    if (this.enableHoverEffects) {
      this.handleHoverEffects()
    }

    if (this.testObjects.length > 0) {
      for (const obj of this.testObjects) {
        obj.model.position.z += obj.speed
      }
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target?.classList.contains("chat-box")) return

    const rect = (this.scene.userData.renderer as THREE.WebGLRenderer).domElement.getBoundingClientRect()
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  private onClick = () => {
    if (this.hoveredObject && this.textArea) {
      this.textArea.value = this.textArea.placeholder
      this.textArea.placeholder = "Type, enter a URL, or upload a file."
      this.textArea.classList.remove("hovered")
    }
  }

  public dispose() {
    for (const obj of this.testObjects) {
      this.scene.remove(obj.model)
      obj.model.traverse(child => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          this.scene.remove(mesh)
          mesh.geometry.dispose()
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(m => m.dispose())
          } else {
            mesh.material.dispose()
          }
        }
      })
    }
    
    this.testObjects = []

    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('click', this.onClick)
  }
}