import "./style.css"
import "./fonts.css"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Share your vision</h1>
    <textarea id="vision" placeholder="Write your vision here..."></textarea>
  </div>
`