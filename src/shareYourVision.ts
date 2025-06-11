import gsap from "gsap"

export class ShareYourVision {
  
  state: number = 0
  messages: string[] = []

  main: HTMLElement = document.querySelector("main") as HTMLElement
  introChat: HTMLDivElement = document.createElement("div")
  themePicker: HTMLDivElement = document.createElement("div")
  themeOptions: HTMLDivElement[] = [document.createElement("div")]
  operatorChat: HTMLDivElement = document.createElement("div")
  operatorChatMessages: HTMLDivElement[] = []
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

    const themeOption = document.createElement("div")
    themeOption.className = "theme-option"
    themeOption.innerHTML = `
      <img src="/ui/blank-theme.png" alt="Theme 1">
    `
    themeOption.style.opacity = "0"
    themeOption.style.transform = "translateY(-1rem)"
    this.themeOptions.push(themeOption)
    this.themePicker.appendChild(themeOption)

    // Build operatorChat content using DOM
    const messageHistory = document.createElement("div")
    messageHistory.className = "message-history"

    const userMessage = document.createElement("div")
    userMessage.className = "message user"
    userMessage.innerHTML = `
      <p>I want to build a virtual electronics store where people can browse and compare different products.</p>
    `
    messageHistory.appendChild(userMessage)
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
    messageHistory.appendChild(operatorMessage)
    this.operatorChatMessages.push(operatorMessage)

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
    browseButton.textContent = "Browse..."

    this.operatorChatSendButton = document.createElement("button")
    this.operatorChatSendButton.type = "button"
    this.operatorChatSendButton.id = "send-button"
    this.operatorChatSendButton.textContent = "Send"

    chatBox.appendChild(this.operatorChatInput)
    chatBox.appendChild(browseButton)
    chatBox.appendChild(this.operatorChatSendButton)

    this.operatorChat.appendChild(messageHistory)
    this.operatorChat.appendChild(chatBox)

    gsap.to(themeOption, {
      transform: "unset",
      opacity: 1,
      duration: 0.5
    })

    chatBox.style.opacity = "0"
    operatorMessage.style.opacity = "0"
    userMessage.style.opacity = "0"

    gsap.to(chatBox, {
      opacity: 1,
      duration: 0.5,
      delay: 1,
      ease: "out"
    })

    gsap.to(userMessage, {
      opacity: 1,
      duration: 0.5,
      delay: 0,
      ease: "out"
    })

    gsap.to(operatorMessage, {
      opacity: 1,
      duration: 0.5,
      delay: 0.5,
      ease: "out"
    })
  }

}