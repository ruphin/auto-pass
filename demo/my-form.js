import { connectUsername, connectPassword } from "./auto-pass.js";

const html = t => t.join("");

const template = html`
  <div>#shadow-root</div>
  <form id="form" method="post" action="/success">
    <input id="usernameInput" />
    <input id="passwordInput" type="password" />
    <button>Log in</button>
  </form>
  <style>
    :host {
      display: inline-block;
      padding: 2px 10px 10px;
      border: 1px solid #343434;
    }
    form {
      margin-top: 10px;
    }
    input {
      display: block;
    }
    input,
    button {
      margin: 6px;
    }
  </style>
`;

class MyForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }
  connectedCallback() {
    const usernameInput = this.shadowRoot.getElementById("usernameInput");
    const passwordInput = this.shadowRoot.getElementById("passwordInput");
    const form = this.shadowRoot.getElementById("form");
    connectUsername(usernameInput);
    connectPassword(passwordInput);

    form.addEventListener("submit", e => {
      e.preventDefault();
      window.location.assign("/success/index.html");
    });
  }
}

customElements.define("my-form", MyForm);
