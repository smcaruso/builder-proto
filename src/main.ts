import "./style.css"
import "./fonts.css"
import { defineButtons } from "./components/buttons.ts"
import { NavBar } from "./components/header.ts"
// import { ShareYourVision } from "./shareYourVision.ts"
import { Viewport } from "./viewport.ts"
import { Operator } from "./operator.ts"

defineButtons()
const navBar = new NavBar()
const viewport = new Viewport()
// const shareYourVision = new ShareYourVision(viewport)
const operator = new Operator(viewport)

console.log(navBar, viewport, operator)