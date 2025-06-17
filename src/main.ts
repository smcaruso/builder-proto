import "./style.css"
import "./fonts.css"
import { defineButtons } from "./components/buttons.ts"
import { NavBar } from "./components/header.ts"
import { ShareYourVision } from "./shareYourVision.ts"
import { Viewport } from "./viewport.ts"
// import gsap from "gsap"

// window.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowRight") {
//     gsap.globalTimeline.getChildren(true, true, true).forEach(tween => tween.progress(1))
//   }
// })

defineButtons()
new NavBar()
const shareYourVision = new ShareYourVision()
shareYourVision.viewport = new Viewport()
