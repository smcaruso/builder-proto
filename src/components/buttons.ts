import { css } from "./button-css.ts"

export class RegularButton extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = css
    shadow.appendChild(style)
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'regular'
    const label = document.createElement('label')
    label.innerHTML = '<slot></slot>'
    button.appendChild(label)
    shadow.appendChild(button)
  }
}

export class FlatButton extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = css
    shadow.appendChild(style)
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'flat'
    const label = document.createElement('label')
    label.innerHTML = '<slot></slot>'
    button.appendChild(label)
    shadow.appendChild(button)
  }
}

export class HalfButton extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = css
    shadow.appendChild(style)
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'half'
    const label = document.createElement('label')
    label.innerHTML = '<slot></slot>'
    button.appendChild(label)
    shadow.appendChild(button)
  }
}

export class MagicButton extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = css
    shadow.appendChild(style)
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'magic'
    const img = document.createElement('img')
    img.src = '/ui/operator.svg'
    img.width = 17
    img.height = 17
    img.alt = 'Magic Icon'
    const label = document.createElement('label')
    label.innerHTML = '<slot></slot>'
    button.appendChild(img)
    button.appendChild(label)
    shadow.appendChild(button)
  }
}

export class FlatMagicButton extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = css
    shadow.appendChild(style)
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'flat-magic'
    const img = document.createElement('img')
    img.src = '/ui/operator.svg'
    img.width = 17
    img.height = 17
    img.alt = 'Magic Icon'
    const label = document.createElement('label')
    label.innerHTML = '<slot></slot>'
    button.appendChild(img)
    button.appendChild(label)
    shadow.appendChild(button)
  }
}

export class MagicFlatHalfButton extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = css
    shadow.appendChild(style)
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'magic-flat-half'
    const label = document.createElement('label')
    label.innerHTML = '<slot></slot>'
    button.appendChild(label)
    shadow.appendChild(button)
  }
}

export function defineButtons() {
  customElements.define("regular-button", RegularButton)
  customElements.define("flat-button", FlatButton)
  customElements.define("half-button", HalfButton)
  customElements.define("magic-button", MagicButton)
  customElements.define("flat-magic-button", FlatMagicButton)
  customElements.define("magic-flat-half-button", MagicFlatHalfButton)
}