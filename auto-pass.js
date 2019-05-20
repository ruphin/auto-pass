const username = {};
const password = {};
const submitButton = document.createElement("input");
const proxyForm = document.createElement("form");
username.proxy = username.input = document.createElement("input");
password.proxy = password.input = document.createElement("input");

submitButton.type = "submit";
proxyForm.appendChild(username.proxy);
proxyForm.appendChild(password.proxy);
proxyForm.appendChild(submitButton);
proxyForm.addEventListener("submit", e => {
  e.preventDefault();
  return false;
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
};

const connect = (field, newInput) => {
  const { input, inputListener, proxy, proxyListener } = field;
  input.removeEventListener("change", inputListener);
  proxy.removeEventListener("change", proxyListener);
  const { id, type, name } = (field.input = newInput);
  Object.assign(field.proxy, { id, type, name });
  synchronise(field);
};

const synchronise = field => {
  const { input, proxy } = field;
  const inputValue = input.value;
  const proxyValue = proxy.value;
  const inputListener = () => {
    if (proxy.value !== input.value) {
      proxy.value = input.value;
    }
  };
  const proxyListener = () => {
    if (input.value !== proxy.value) {
      input.value = proxy.value;
    }
  };
  if (!proxyValue && inputValue) {
    proxy.value = input.value;
  }
  if (!inputValue && proxyValue) {
    input.value = proxy.value;
  }
  input.addEventListener("input", inputListener);
  proxy.addEventListener("input", proxyListener);
  Object.assign(field, { inputListener, proxyListener });
};
