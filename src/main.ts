import "./style.css"
import "./fonts.css"
import { defineButtons } from "./components/buttons.ts"
import { NavBar } from "./components/header.ts"
import { ShareYourVision } from "./shareYourVision.ts"

defineButtons()
new NavBar()
new ShareYourVision()