import {
  attachProxyForm,
  storePassword,
  connectUsernameInput,
  connectPasswordInput
} from "./auto-pass.js";

export class AutoPass extends HTMLElement {
  connectedCallback() {
    attachProxyForm(this);
  }
  storePassword() {
    storePassword();
  }
  connectUsernameInput(input) {
    connectUsernameInput(input);
  }
  connectPasswordInput(input) {
    connectPasswordInput(input);
  }
}

customElements.define("auto-pass", AutoPass);
