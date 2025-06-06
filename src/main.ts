import "./style.css"
import "./fonts.css"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Campton Headline</h1>
    <p>DM Sans paragraph</p>
    <div class="button-test">
      <button class="regular" type="button">
        <label>Regular Button</label>
      </button>
      <button class="flat" type="button">
        <label>Flat Button</label>
      </button>
      <button class="half" type="button">
        <label>Half Button</label>
      </button>
      <button class="magic" type="button">
        <img src="/ui/operator.svg" width="17px" height="17px" alt="Magic Icon" />
        <label>Magic Button</label>
      </button>
      <button class="flat-magic" type="button">
        <img src="/ui/operator.svg" width="17px" height="17px" alt="Magic Icon" />
        <label>Flat Magic Button</label>
      </button>
      <button class="magic-flat-half" type="button">
        <label>Flat Half Magic Button</label>
      </button>
    </div>
  </div>
`