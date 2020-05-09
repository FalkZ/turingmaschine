import { encodeTM } from "./tm/coder";
import { UniversalTM } from "./tm/UniversalTM";
import { store } from "./Store";
import { ui } from "./ui";
import { TMError } from "./tm/types";
import { multiplication } from "./multiplication";

const onError = (error: TMError) => {
  store.error = error;
};

const createTMandUpdateUI = () => {
  try {
    store.TM = new UniversalTM(store.encodedTM);
    store.error = undefined;
  } catch (error) {
    onError(error);
  }
  ui.requestUpdate();
};

export const onChangeDecodedInput = (value) => {
  store.input = value;
  localStorage.setItem("input", value);

  createTMandUpdateUI();
};

export const onChangeEncodedTM = ({ target }) => {
  try {
    let tm = new UniversalTM(target.value);
    store.decodedTM = tm.decodedTM();
    store.input = tm.decodedInput();
    createTMandUpdateUI();
  } catch (error) {
    onError(error);
  }
  ui.requestUpdate();
};

export const onChangeDecodedTM = ({ target }) => {
  store.decodedTM = target.value;
  localStorage.setItem("decodedTM", target.value);

  createTMandUpdateUI();
};

export const run = () => {
  store.error = undefined;
  try {
    let index = 1000;
    for (; !store.TM.isFinished() && index > 0; index--) {
      store.TM.step();
    }
    if (index === 0) {
      onError(new TMError("Infinite loop? ", false));
    }
  } catch (error) {
    onError(error);
  }
  ui.requestUpdate();
};

export const step = () => {
  store.error = undefined;
  try {
    if (!store.TM.isFinished()) {
      store.TM.step();
    }
  } catch (error) {
    onError(error);
  }
  ui.requestUpdate();
};

export const reset = () => {
  try {
    store.reset();
  } catch (error) {
    onError(error);
  }
  ui.requestUpdate();
};

export const clearStorage = () => {
  localStorage.removeItem("input");
  localStorage.removeItem("decodedTM");

  store.input = "1110_101";
  store.decodedTM = multiplication;
  ui.requestUpdate();
};
