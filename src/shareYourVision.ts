import gsap from "gsap"
import { Viewport } from "./viewport"

export class ShareYourVision {
  
  viewport?: Viewport

  state: number = 0
  messages: string[] = []

  main: HTMLElement = document.querySelector("main") as HTMLElement
  introChat: HTMLDivElement = document.createElement("div")
  themePicker: HTMLDivElement = document.createElement("div")
  themeOptions: HTMLDivElement[] = []
  operatorChat: HTMLDivElement = document.createElement("div")
  operatorChatMessages: HTMLDivElement[] = []
  messageHistory: HTMLDivElement = document.createElement("div")
  operatorChatInput: HTMLTextAreaElement = document.createElement("textarea")
  operatorChatSendButton: HTMLButtonElement = document.createElement("button")
  themeIndex: number = 3

  constructor() {
    this.connectIntroChat()
  }

  connectIntroChat() {

    if (!this.main) return

    this.introChat.className = "operator-chat"
    this.main.appendChild(this.introChat)

    const intro = document.createElement("div")
    intro.className = "chat-intro"
    intro.innerHTML = `
      <h1>Share your vision.</h1>
      <h2>Tell us about yourself and the kind of space you want to build, or send us inspiration.</h2>
    `

    const chatBox = document.createElement("div")
    chatBox.className = "chat-box"

    const textArea = document.createElement("textarea")
    textArea.name = "operator"
    textArea.id = "chat-box"
    textArea.placeholder = "Type, enter a URL, or upload a file."
    textArea.rows = 1

    const browseButton = document.createElement("button")
    browseButton.type = "button"
    browseButton.textContent = "Browse..."

    const sendButton = document.createElement("button")
    sendButton.type = "button"
    sendButton.id = "send-button"
    sendButton.textContent = "Send"

    chatBox.appendChild(textArea)
    chatBox.appendChild(browseButton)
    chatBox.appendChild(sendButton)

    this.introChat.appendChild(intro)
    this.introChat.appendChild(chatBox)

    let textInputTried: boolean = false

    textArea.addEventListener('input', () => {

      textArea.value = "I want to build a virtual electronics store where people can browse and compare different products"
      textArea.style.height = 'auto' // reset to recalc
      textArea.style.height = textArea.scrollHeight + 'px'
      textInputTried = true
    })

    browseButton.addEventListener('click', () => {

      alert("browse files")

    })

    sendButton.addEventListener('click', () => {
      if (textInputTried) { this.removeIntroChat() }
    })

  }

  removeIntroChat() {

    this.viewport?.zoomOut()
    
    gsap.to(this.introChat, {
      opacity: 0,
      transform: "translateY(calc(-25% + 1rem))",
      duration: 0.5,
      ease: "out",
      onComplete: () => {
        this.introChat.remove()
        const main = document.querySelector("main") as HTMLElement
        main.classList.remove("intro")
        this.postThemePicker()
      }
    })
  }

  postThemePicker() {

    if (!this.main) return

    this.themePicker.className = "theme-picker"
    this.operatorChat.className = "operator-chat"
    this.main.append(this.themePicker, this.operatorChat)

    for (let i = 0; i < 3; i++) {
      const themeOption = document.createElement("div")
      themeOption.className = "theme-option"
      const filename = `theme${i}.png`
      themeOption.innerHTML = `
        <img src="/ui/${filename}" alt="Theme ${i + 1}">
      `
      themeOption.style.opacity = "0"
      themeOption.style.transform = "translateY(-1rem)"
      this.themeOptions.push(themeOption)
      this.themePicker.appendChild(themeOption)

    }

    this.messageHistory.className = "message-history"

    const userMessage = document.createElement("div")
    userMessage.className = "message user"
    userMessage.innerHTML = `
      <p>I want to build a virtual electronics store where people can browse and compare different products.</p>
    `
    this.messageHistory.appendChild(userMessage)
    this.operatorChatMessages.push(userMessage)

    const operatorMessage = document.createElement("div")
    operatorMessage.className = "message operator reasoning"
    operatorMessage.innerHTML = `
      <div class="message-header">
        <img src="/ui/operator.svg" alt="Operator Icon" style="filter: brightness(0) invert(1);">
        <span class="headline">Thinking about electronics...</span>
        <span class="action">Stop</span>
      </div>
      <div class="progress-bar"></div>
    `
    this.messageHistory.appendChild(operatorMessage)
    this.operatorChatMessages.push(operatorMessage)

    this.scrollMessageHistoryToBottom()

    const chatBox = document.createElement("div")
    chatBox.className = "chat-box"

    this.operatorChatInput = document.createElement("textarea")
    this.operatorChatInput.name = "operator"
    this.operatorChatInput.id = "chat-box"
    this.operatorChatInput.placeholder = "Type, enter a URL, or upload a file."
    this.operatorChatInput.rows = 1

    const browseButton = document.createElement("button")
    browseButton.type = "button"
    browseButton.id = "browse-button"
    browseButton.style.opacity = "0.5"
    browseButton.textContent = "Browse..."

    this.operatorChatSendButton = document.createElement("button")
    this.operatorChatSendButton.type = "button"
    this.operatorChatSendButton.id = "send-button"
    this.operatorChatSendButton.textContent = "Send"

    chatBox.appendChild(this.operatorChatInput)
    chatBox.appendChild(browseButton)
    chatBox.appendChild(this.operatorChatSendButton)

    this.operatorChat.appendChild(this.messageHistory)
    this.operatorChat.appendChild(chatBox)

    gsap.to(this.themeOptions[1], {
      transform: "unset",
      opacity: 1,
      duration: 0.5
    })

    // build animations

    chatBox.style.opacity = "0"
    chatBox.style.transform = "translateY(0.5rem)"
    operatorMessage.style.opacity = "0"
    operatorMessage.style.transform = "translateY(0.5rem)"
    userMessage.style.opacity = "0"
    userMessage.style.transform = "translateY(0.5rem)"

    this.animateIn(chatBox, 1)
    this.animateIn(userMessage, 0)

    const operatorBuildMessages: string[] = [
      "Matched “electronics” to 5 theme keywords.",
      "Here's a theme we think you'll love: <strong>Guava Boutique</strong>.",
      "See the list for some others that might be a good fit, too.",
      "Do you have a <strong>website</strong> or <strong>Shopify store</strong> for your electronics store?"
    ]

    this.animateIn(operatorMessage, 0.5)
    // The rest of the onComplete logic remains unchanged:
    gsap.delayedCall(0.5 + 0.5, () => { // 0.5 delay + 0.5 duration
      setTimeout(() => {
        operatorMessage.innerHTML = `
          <div class="message-header">
            <img src="/ui/operator.svg" alt="Operator Icon" style="filter: brightness(0) invert(1);">
            <span class="headline">${operatorBuildMessages[0]}</span>
          </div>
          <div class="divider" style="width:100%; border-bottom: 0.5px solid white;"> </div>
        `
        this.themeOptions.forEach( (each, index) => {
          if (index === 1) {
            gsap.to(each, {
              opacity: 1,
              transform: "unset",
              duration: 0.5,
              ease: "out"
            })
            this.themeOptions[index].innerHTML = `
            <img src="/ui/theme${index}x.png" alt="Theme ${index + 1}">`
            this.themePicker.addEventListener("wheel", () => { this.rotateThemeOptions() })
          } else {
              gsap.to(each, {
                opacity: 0.5,
                transform: "unset",
                duration: 0.5,
                ease: "out"
              })
          }
        })

        for (let i = 1; i <= 3; i++) {
          setTimeout(() => {
            const span = document.createElement("span")
            span.className = "reasoning-message"
            span.style.opacity = "0"
            span.innerHTML = operatorBuildMessages[i]
            operatorMessage.appendChild(span)
            gsap.to(span, {opacity: 1, duration: 2})
          }, i * 750)
        }
      }, 2000)
    })


    // Store references to handlers for removal
    const onSend = () => {
      this.operatorChatInput.value = ""
      this.operatorChatInput.style.height = 'auto'
      this.operatorChatSendButton.removeEventListener('click', onSend)
      this.operatorChatInput.removeEventListener('input', onInput)

      // Add new event listener for sending user message
      this.operatorChatSendButton.addEventListener('click', () => {
        const newMessage = this.operatorChatInput.value.trim()
        if (!newMessage) return

        const userMessage = document.createElement("div")
        userMessage.className = "message user"
        userMessage.innerHTML = `<p>${newMessage}</p>`
        this.messageHistory.appendChild(userMessage)
        this.operatorChatMessages.push(userMessage)
        this.animateIn(userMessage, 0.25)

        this.scrollMessageHistoryToBottom()
        this.operatorChatInput.value = ""
        this.operatorChatInput.style.height = 'auto'
      })

      this.suggestTheme()
    }

    const onInput = () => {
      this.operatorChatInput.value = "yeah, it's motherboard-metropolis.shopify.com"
      this.operatorChatInput.style.height = 'auto' // reset to recalc
      this.operatorChatInput.style.height = this.operatorChatInput.scrollHeight + 'px'
      this.operatorChatSendButton.addEventListener('click', onSend)
    }

    this.operatorChatInput.addEventListener('input', onInput)


  }

  suggestTheme() {

    const userMessage = document.createElement("div")
    userMessage.className = "message user"
    userMessage.innerHTML = `
      <p>yeah, it's motherboard-metropolis.shopify.com</p>
    `
    this.messageHistory.appendChild(userMessage)
    this.operatorChatMessages.push(userMessage)

    this.scrollMessageHistoryToBottom()

    userMessage.style.opacity = "0"
    userMessage.style.transform = "translateY(0.5rem)"

    this.animateIn(userMessage, 0.25)
    // The rest of the animation logic for operatorMessage and connectShopifyButton:
    const operatorMessage = document.createElement("div")
    operatorMessage.className = "message operator"
    operatorMessage.innerHTML = `
      <p>Perfect. We can connect to your Shopify and import your products now.</p>
      `
    const connectShopifyButton = document.createElement("regular-button")
    connectShopifyButton.innerText = "Connect Shopify"
    operatorMessage.style.opacity = "0"
    operatorMessage.style.transform = "translateY(0.5rem)"

    const crumb = document.querySelector(".crumb#project-name") as HTMLDivElement
    crumb.textContent = "Motherboard Metropolis"
    crumb.classList.add("editable")

    // Animate in operatorMessage
    this.animateIn(operatorMessage, 0.25)
    // After operatorMessage animates in, animate connectShopifyButton
    gsap.delayedCall(0.25 + 0.5, () => { // 0.25 delay + 0.5 duration
      connectShopifyButton.style.opacity = "0"
      connectShopifyButton.style.transform = "translateY(0.5rem)"
      operatorMessage.append(connectShopifyButton)
      this.animateIn(connectShopifyButton, 0.25)
      connectShopifyButton?.addEventListener("click", () => {
        this.postShopifyDialog()
        gsap.to(connectShopifyButton, {
          opacity: 0,
          transform: "translateY(0.5rem)",
          duration: 0.5,
          ease: "out",
          onComplete: () => { connectShopifyButton.remove() }
        })
      })
    })

    this.messageHistory.appendChild(operatorMessage)
    this.scrollMessageHistoryToBottom()

  }

  postShopifyDialog() {
    const shopifyOverlay = document.createElement("div")
    shopifyOverlay.classList.add("shopify-dialog")
    this.main.append(shopifyOverlay)

    const shopifyDialog: HTMLImageElement = document.createElement("img")
    shopifyDialog.src = "/ui/shopify.png"
    shopifyOverlay.append(shopifyDialog)

    shopifyOverlay.style.backdropFilter = "blur(0px)"
    shopifyOverlay.style.backgroundColor = "#00000000"
    shopifyDialog.style.opacity = "0"
    shopifyDialog.style.transform = "translateY(0.5rem)"

    gsap.to(shopifyOverlay, {
      backgroundColor: "#00000022",
      backdropFilter: "blur(12px)",
      duration: 0.75,
      ease: "out"
    })

    gsap.to(shopifyDialog, {
      opacity: 1,
      transform: "unset",
      duration: 0.5,
      delay: 0.25,
      ease: "out"
    })
    
    shopifyDialog.addEventListener("click", () => {
      gsap.to(shopifyDialog, {
        opacity: 0,
        transform: "translateY(0.5rem)",
        duration: 0.25,
        ease: "out",
      })
      gsap.to(shopifyOverlay, {
        backgroundColor: "#00000000",
        backdropFilter: "blur(0px)",
        duration: 0.25,
        delay: 0.5,
        ease: "out",
        onComplete: () => {
          shopifyOverlay.remove()
          this.confirmShopifyConnection() }
      })
    })

  }

  confirmShopifyConnection() {
    const operatorMessage = document.createElement("div")
    operatorMessage.className = "message operator reasoning"
    operatorMessage.innerHTML = `
      <div class="message-header">
        <img src="/ui/operator.svg" alt="Operator Icon" style="filter: brightness(0) invert(1);">
        <span class="headline">Connecting to Shopify...</span>
        <span class="action">Stop</span>
      </div>
      <div class="progress-bar"></div>
    `
    operatorMessage.style.opacity = "0"
    operatorMessage.style.transform = "translateY(0.5rem)"

    this.messageHistory.appendChild(operatorMessage)
    this.operatorChatMessages.push(operatorMessage)


    const operatorBuildMessages: string[] = [
      "Shopify Connected",
      "Found 16 products in Motherboard Metropolis",
      "We found <strong>16 products</strong> in your store. That's enough to get started—anything else you want to add before we get to work? ",
      "Otherwise, <strong>choose a theme</strong> from the preview list to start building."
    ]

    gsap.to(operatorMessage, {
      opacity: 1,
      transform: "unset",
      duration: 0.5,
      delay: 0.5,
      ease: "out",
      onComplete: () => {
        setTimeout(() => {
          operatorMessage.innerHTML = `
            <div class="divider" style="width:100%; border-bottom: 0.5px solid white;"> </div>
            <div class="message-header">
              <img src="/ui/icon-check.svg" width="24px" height="24px" alt="Operation Icon" style="filter: brightness(0) invert(1);">
              <span class="headline">${operatorBuildMessages[0]}</span>
            </div>
          `
          for (let i = 1; i <= 3; i++) {
            setTimeout(() => {
              if (i === 1) {
                const newOpMsg = document.createElement("div")
                newOpMsg.className = "message-header"
                newOpMsg.style.opacity = "0"
                newOpMsg.innerHTML = `
                  <img src="/ui/operator.svg" alt="Operator Icon" style="filter: brightness(0) invert(1);">
                  <span class="headline">${operatorBuildMessages[i]}</span>
                `
                const divider = document.createElement("div")
                divider.className = "divider"
                divider.style.width = "100%"
                divider.style.opacity = "0"
                divider.style.borderBottom = "0.5px solid white"
                operatorMessage.append(newOpMsg, divider)
                gsap.to(newOpMsg, {opacity: 1, duration: 2})
                gsap.to(divider, {opacity: 1, duration: 2})
              } else if (i === 2) {
                const span = document.createElement("span")
                span.className = "reasoning-message"
                span.style.opacity = "0"
                span.innerHTML = operatorBuildMessages[i]
                operatorMessage.appendChild(span)
                gsap.to(span, { opacity: 1, duration: 2 })

                // Wrap both buttons in a button-row div and animate the row
                const buttonRow = document.createElement("div")
                buttonRow.className = "button-row"
                buttonRow.style.opacity = "0"
                buttonRow.style.transform = "translateY(0.5rem)"

                const previewThemeButton = document.createElement("regular-button")
                previewThemeButton.textContent = "Preview another theme"

                // Add event listener to rotate theme images
                previewThemeButton.addEventListener("click", () => {
                  this.rotateThemeOptions()
                })

                this.themePicker.addEventListener("click", (e) => {
                  const target = (e.target as HTMLElement).closest(".theme-option")
                  if (!target) return

                  this.confirmThemeSelection()

                  gsap.to(this.themePicker, {
                    opacity: 0,
                    duration: 0.25,
                    ease: "out",
                    onComplete: () => {
                      // Reset scroll position
                      this.themePicker.style.transform = "translate(-96px, -224px)"

                      // Remove elements after index 2
                      const updated = Array.from(this.themePicker.querySelectorAll(".theme-option"))
                      for (let i = 3; i < updated.length; i++) {
                        updated[i].remove()
                      }

                      // Reset opacity
                      const refreshed = Array.from(this.themePicker.querySelectorAll(".theme-option")) as HTMLElement[]
                      refreshed.forEach((el, index) => {
                        el.style.opacity = index === 1 ? "1" : "0"
                      })

                      // Fade back in
                      gsap.to(this.themePicker, {
                        opacity: 1,
                        duration: 0.25,
                        ease: "out"
                      })

                    }
                  })
                })

                const manageContentButton = document.createElement("regular-button")
                manageContentButton.textContent = "View & manage content"

                buttonRow.append(previewThemeButton, manageContentButton)
                operatorMessage.appendChild(buttonRow)

                gsap.to(buttonRow, { opacity: 1, transform: "unset", duration: 0.5, delay: 0.5 })
              } else if (i === 3) {
                const span = document.createElement("span")
                span.className = "reasoning-message"
                span.style.opacity = "0"
                span.innerHTML = operatorBuildMessages[i]
                operatorMessage.appendChild(span)
                gsap.to(span, { opacity: 1, duration: 2 })
              }
              this.scrollMessageHistoryToBottom()
            }, i * 750)
          }
        }, 2000)
      }
    })

  }

  confirmThemeSelection() {

    this.themePicker.style.pointerEvents = "none"
    const themeConfirm = document.createElement("div")
    themeConfirm.className = "theme-confirm"

    themeConfirm.innerHTML = `
      <h2>Guava Boutique</h2>
      <div class="thumb-row">
        <img src="/ui/guava1.png" height="68px" alt="Preview 1">
        <img src="/ui/guava2.png" height="68px" alt="Preview 2">
        <img src="/ui/guava3.png" height="68px" alt="Preview 3">
        <img src="/ui/guava4.png" height="68px" alt="Preview 4">
      </div>
      <p>Consumer electronics and fruit... name a more iconic duo. These clean, modern spaces let your products speak for themselves, and pops of natural woods and stone add a touch of elegance. Dulcet tones of mechanical keyboards and mouse clicks fill the air!</p>
      <div class="button-row">
        <magic-button id="magic-layout">Build with Magic Layout</magic-button>
        <regular-button id="back-to-themes">← Back to Themes</regular-button>
      </div>
      <p class="tiny-link"><a href="#">Or, start with a blank Space in the Editor.</a></p>
    `

    themeConfirm.style.opacity = "0"
    themeConfirm.style.transform = "translateY(0.5rem)"

    gsap.to(this.operatorChat, {
      opacity: 0,
      duration: 0.5,
      ease: "out",
      onComplete: () => {
        this.operatorChat.style.display = "none"
        this.main.appendChild(themeConfirm)
        this.animateIn(themeConfirm, 0)
      }
    })

    const thumbs = themeConfirm.querySelectorAll("img")
    thumbs.forEach((img, index) => {
      img.addEventListener("click", () => {
        console.log(`Clicked thumbnail ${index + 1}`)
      })
    })

    const magicButton = themeConfirm.querySelector("#magic-layout") as HTMLButtonElement
    const backButton = themeConfirm.querySelector("#back-to-themes") as HTMLButtonElement

    magicButton.addEventListener("click", () => {
      gsap.to(this.main, {
        opacity: 0,
        duration: 0.5,
        ease: "out",
        onComplete: () => {
          this.main.remove()
          gsap.to(document.body, {
            backgroundImage: "radial-gradient(97.08% 240.77% at 1.39% 0%, #7BABDD 0%, #E0F1FF 100%)",
            duration: 1,
            ease: "out"
          })
        }
      })
      // document.body.style.backgroundImage = "radial-gradient(97.08% 240.77% at 1.39% 0%, #7BABDD 0%, #E0F1FF 100%)"
    })

    backButton.addEventListener("click", () => {
      gsap.to(themeConfirm, {
        opacity: 0,
        duration: 0.25,
        ease: "out",
        onComplete: () => {
          themeConfirm.remove()
          this.operatorChat.style.display = "flex"
          this.themePicker.removeAttribute("style")
          gsap.to(this.themePicker, {
            y: -224,
            duration: 0
          })
          const updated = Array.from(this.themePicker.querySelectorAll(".theme-option")) as HTMLElement[]
          updated.forEach((el) => {
            if (el.style.opacity !== "1") {
              gsap.to(el, { opacity: 0.5, duration: 0.25, ease: "out" })
            }
          })

          gsap.to(this.operatorChat, {
            opacity: 1,
            duration: 0.5,
            ease: "out"
          })
        }
      })
    })
  }

  scrollMessageHistoryToBottom() {
    this.messageHistory.scrollTop = this.messageHistory.scrollHeight
  }

  animateIn(el: HTMLElement, delay: number = 0) {
    gsap.to(el, {
      opacity: 1,
      transform: "unset",
      duration: 0.5,
      delay: delay,
      ease: "out"
    })
  }

  rotateThemeOptions() {
    const activeTweens = gsap.globalTimeline.getChildren().some(tween => tween.isActive())
    if (activeTweens) return

    // Cycle themeIndex between 0, 1, 2
    this.themeIndex = (this.themeIndex + 1) % 3
    const filename = this.themeIndex === 1 ? `theme1x.png` : `theme${this.themeIndex}.png`

    const newOption = document.createElement("div")
    newOption.className = "theme-option"
    newOption.innerHTML = `<img src="/ui/${filename}" alt="Theme ${this.themeIndex + 1}">`
    newOption.style.opacity = "0.5"
    this.themePicker.appendChild(newOption)

    const shiftAmount = (window.innerHeight - 60) / 2
    gsap.to(this.themePicker, {
      y: `-=${shiftAmount}`,
      duration: 0.5,
      ease: "out",
      onComplete: () => {
        const updated = Array.from(this.themePicker.querySelectorAll(".theme-option")) as HTMLElement[]
        updated.forEach((el, index) => {
          el.style.opacity = index === updated.length - 2 ? "1" : "0.5"
        })
      }
    })
  }

}