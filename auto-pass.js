const SUBMIT = "submit";
const INPUT = "input";
const username = {};
const password = {};
const proxyForm = document.createElement("form");
const createInput = () => document.createElement("input");
const hide = element => {
  element.tabIndex = "-1";
  element.setAttribute("aria-hidden", "true");
};
const submitButton = createInput();
const shadowDOM = !window.ShadyDOM || !window.ShadyDOM.inUse;
let realForm;
submitButton.type = SUBMIT;
username.proxy = username.input = createInput();
password.proxy = password.input = createInput();
proxyForm.appendChild(username.proxy);
proxyForm.appendChild(password.proxy);
proxyForm.appendChild(submitButton);
proxyForm.method = "post";
proxyForm.style = "visibility: hidden; height: 0; width: 0";
proxyForm.addEventListener(SUBMIT, e => {
  e.preventDefault();
});
hide(username.proxy);
hide(password.proxy);
hide(submitButton);
hide(proxyForm);

export const attachProxyForm = hostElement => {
  if (shadowDOM) {
    hostElement.appendChild(proxyForm);
  }
};

export const storePassword = () => {
  submitButton.click();
};

export const connectUsername = input => {
  connect(
    username,
    input
  );
};

export const connectPassword = input => {
  connect(
    password,
    input
  );
  if (realForm) {
    realForm.removeEventListener(SUBMIT, storePassword);
  }
  realForm = input.form;
  if (realForm) {
    realForm.addEventListener(SUBMIT, storePassword);
  }
};

const connect = (field, newInput) => {
  if (shadowDOM) {
    const { input, inputListener, proxy, proxyListener } = field;
    input.removeEventListener(INPUT, inputListener);
    proxy.removeEventListener(INPUT, proxyListener);
    const { id, type } = (field.input = newInput);
    Object.assign(proxy, { id, type });
    synchronise(field);
  }
};

const synchronise = field => {
  const { input, proxy } = field;
  field.proxyListener = sync(proxy, input);
  field.inputListener = sync(input, proxy);
};

const sync = (from, to) => {
  const listener = () => {
    const fromValue = from.value;
    if (to.value !== fromValue) {
      to.value = fromValue;
    }
  };
  const fromValue = from.value;
  if (!to.value && fromValue) {
    to.value = fromValue;
  }

  from.addEventListener(INPUT, listener);

  return listener;
};
