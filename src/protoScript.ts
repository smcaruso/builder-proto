import gsap from "gsap"

export class PrototypeScript {
  
  state: number = 0
  messages: string[] = []
  // messageList:HTMLDivElement

  autofillClientMessages: string[] = [
    "I want to build a virtual electronics store where people can browse and compare different products",
    "yeah, it's motherboard-metropolis.shopify.com"
  ]

  constructor() {
    this.connectIntroChat()
  }

  connectIntroChat() {

    let textArea = document.getElementById("chat-box") as HTMLTextAreaElement
    let sendButton = document.getElementById("send-button") as HTMLButtonElement

    textArea.addEventListener('input', () => {

      textArea.value = this.autofillClientMessages[this.state]
      textArea.style.height = 'auto' // reset to recalc
      textArea.style.height = textArea.scrollHeight + 'px'

    })

    sendButton.addEventListener('click', () => {

      if (this.state === 0) {
        let main = document.querySelector("main.share-vision.first")
        main?.classList.remove("first")
        textArea.value = ""
        textArea.placeholder = ""
      }

    })

  }

}