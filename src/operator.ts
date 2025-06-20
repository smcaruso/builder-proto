import gsap from "gsap"
import { Viewport } from "./viewport"

export class Operator {

  viewport?: Viewport

  constructor(viewport: Viewport) {

    this.viewport = viewport

    gsap.to(document.body, {
      backgroundImage: "radial-gradient(97.08% 240.77% at 1.39% 0%, #7BABDD 0%, #E0F1FF 100%)",
      duration: 1,
      ease: "out"
    })
  }

}