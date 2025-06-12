import gsap from "gsap"

export class ShareYourVision {
  
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

    textArea.addEventListener('input', () => {

      textArea.value = "I want to build a virtual electronics store where people can browse and compare different products"
      textArea.style.height = 'auto' // reset to recalc
      textArea.style.height = textArea.scrollHeight + 'px'

    })

    browseButton.addEventListener('click', () => {

      alert("browse files")

    })

    sendButton.addEventListener('click', this.removeIntroChat.bind(this))

  }

  removeIntroChat() {
    
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

    for (let i = 0; i<3; i++) {
      const themeOption = document.createElement("div")
      themeOption.className = "theme-option"
      themeOption.innerHTML = `
        <img src="/ui/theme${i}.png" alt="Theme ${i + 1}">
      `
      themeOption.style.opacity = "0"
      themeOption.style.transform = "translateY(-1rem)"
      this.themeOptions.push(themeOption)
      this.themePicker.appendChild(themeOption)
    }

    // Build operatorChat content using DOM
    // const messageHistory = document.createElement("div")
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

    gsap.to(chatBox, {
      opacity: 1,
      transform: "unset",
      duration: 0.5,
      delay: 1,
      ease: "out"
    })

    gsap.to(userMessage, {
      opacity: 1,
      transform: "unset",
      duration: 0.5,
      delay: 0,
      ease: "out"
    })

    const operatorBuildMessages: string[] = [
      "Matched “electronics” to 5 theme keywords.",
      "Here's a theme we think you'll love: <strong>Guava Boutique</strong>.",
      "See the list for some others that might be a good fit, too.",
      "Do you have a <strong>website</strong> or <strong>Shopify store</strong> for your electronics store?"
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
      }
    })

    const onSend = () => {
      this.operatorChatInput.value = ""
      this.operatorChatInput.style.height = 'auto'
      this.operatorChatSendButton.removeEventListener('click', onSend)
      this.suggestTheme()
    }

    this.operatorChatInput.addEventListener('input', () => {
      this.operatorChatInput.value = "yeah, it's motherboard-metropolis.shopify.com"
      this.operatorChatInput.style.height = 'auto' // reset to recalc
      this.operatorChatInput.style.height = this.operatorChatInput.scrollHeight + 'px'
      this.operatorChatSendButton.addEventListener( 'click', onSend.bind(this) )
    })


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

    gsap.to(userMessage, {
      opacity: 1,
      transform: "unset",
      duration: 0.5,
      delay: 0.25,
      ease: "out",
      onComplete: () => {

        const operatorMessage = document.createElement("div")
        operatorMessage.className = "message operator"
        operatorMessage.innerHTML = `
          <p>Perfect. We can connect to your Shopify and import your products now.</p>
          `
        const connectShopifyButton = document.createElement("regular-button")
        connectShopifyButton.innerText = "Connect Shopify"
        operatorMessage.style.opacity = "0"
        operatorMessage.style.transform = "translateY(0.5rem)"
        
        gsap.to(operatorMessage, {
          opacity: 1,
          transform: "unset",
          duration: 0.5,
          delay: 0.25,
          ease: "out",
          onComplete: () => {
            connectShopifyButton.style.opacity = "0"
            connectShopifyButton.style.transform = "translateY(0.5rem)"
            operatorMessage.append(connectShopifyButton)
            gsap.to(connectShopifyButton, {
              opacity: 1,
              transform: "unset",
              duration: 0.75,
              delay: 0.25,
              ease: "out",
            })
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
          }
        })
        
        
        this.messageHistory.appendChild(operatorMessage)

        this.scrollMessageHistoryToBottom()

      }
    })

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
                // need divider
                operatorMessage.appendChild(newOpMsg)
                gsap.to(newOpMsg, {opacity: 1, duration: 2})
              } else { // need to insert buttons
                const span = document.createElement("span")
                span.className = "reasoning-message"
                span.style.opacity = "0"
                span.innerHTML = operatorBuildMessages[i]
                operatorMessage.appendChild(span)
                gsap.to(span, {opacity: 1, duration: 2})
              }
            }, i * 750)
          }
        }, 2000)
      }
    })

  }

  scrollMessageHistoryToBottom() {
    this.messageHistory.scrollTop = this.messageHistory.scrollHeight
  }

}