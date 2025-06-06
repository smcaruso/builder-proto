export class RegularButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button type="button" class="regular"><label><slot>Regular Button</slot></label></button>`;
  }
}
customElements.define("regular-button", RegularButton);

export class FlatButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button type="button" class="flat"><label><slot>Flat Button</slot></label></button>`;
  }
}
customElements.define("flat-button", FlatButton);

export class HalfButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button type="button" class="half"><label><slot>Half Button</slot></label></button>`;
  }
}
customElements.define("half-button", HalfButton);

export class MagicButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button type="button" class="magic"><img src="/ui/operator.svg" width="17px" height="17px" alt="Magic Icon" /><label><slot>Magic Button</slot></label></button>`;
  }
}
customElements.define("magic-button", MagicButton);

export class FlatMagicButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button type="button" class="flat-magic"><img src="/ui/operator.svg" width="17px" height="17px" alt="Magic Icon" /><label><slot>Flat Magic Button</slot></label></button>`;
  }
}
customElements.define("flat-magic-button", FlatMagicButton);

export class MagicFlatHalfButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button type="button" class="magic-flat-half"><label><slot>Flat Half Magic Button</slot></label></button>`;
  }
}
customElements.define("magic-flat-half-button", MagicFlatHalfButton);