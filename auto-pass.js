const SUBMIT = "submit";
const INPUT = "input";
const username = {};
const password = {};
const proxyForm = document.createElement("form");
const submitListener = () => storePassword();
const createInput = () => document.createElement("input");
const submitButton = createInput();
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

export const attachProxyForm = hostElement => {
  if (!window.ShadyDOM || !window.ShadyDOM.inUse) {
    hostElement.appendChild(proxyForm);
  }
};

export const storePassword = () => {
  submitButton.click();
};

export const connectUsernameInput = input => {
  connect(
    username,
    input
  );
};

export const connectPasswordInput = input => {
  connect(
    password,
    input
  );
  if (realForm) {
    realForm.removeEventListener(SUBMIT, submitListener);
  }
  realForm = input.form;
  if (realForm) {
    realForm.addEventListener(SUBMIT, submitListener);
  }
};

const connect = (field, newInput) => {
  const { input, inputListener, proxy, proxyListener } = field;
  input.removeEventListener(INPUT, inputListener);
  proxy.removeEventListener(INPUT, proxyListener);
  const { id, type } = (field.input = newInput);
  Object.assign(field.proxy, { id, type });
  synchronise(field);
};

const synchronise = field => {
  const { input, proxy } = field;
  field.proxyListener = attachListener(input, proxy);
  field.inputListener = attachListener(proxy, input);
};

const attachListener = (input, proxy) => {
  const listener = () => {
    const proxyValue = proxy.value;
    if (input.value !== proxyValue) {
      input.value = proxyValue;
    }
  };
  const proxyValue = proxy.value;
  if (!input.value && proxyValue) {
    input.value = proxyValue;
  }

  proxy.addEventListener(INPUT, listener);

  return listener;
};
