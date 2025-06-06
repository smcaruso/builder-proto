const css = `
  nav {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 11px;
    gap: 10px;

    width: 100%;
    height: 48px;

    background: linear-gradient(90.06deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.5) 21.22%, rgba(255, 255, 255, 0.75) 100.31%);
    box-shadow: 0px 4px 36px rgba(0, 0, 0, 0.25), inset 0px 1px 2px #FFFFFF, inset 0px -1px 2px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(32px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 12px;
  }

  nav .left-nav-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    gap: 10px;
  }
  `

export function defineNav() {
  customElements.define("nav-header", class extends HTMLElement {
    constructor() {
      super()
      const shadow = this.attachShadow({ mode: "open" })
      const style = document.createElement("style")
      style.textContent = css
      shadow.appendChild(style)
      shadow.innerHTML += `
        <nav class="nav-header">
          <div class="left-nav-group">
          <div class="logo">
            <img src="/ui/napster-logo.svg" alt="Logo">
            <span>Napster 3D Studio</span>
          </div>
        </nav>
      `
      shadow.appendChild(navbar)
    }
  })
}