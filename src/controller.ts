import { encodeTM } from "./tm/coder";
import { UniversalTM } from "./tm/UniversalTM";
import { store } from "./Store";
import { ui } from "./ui";

export const onChangeDecodedInput = (value) => {
  store.input = value;

  store.TM = new UniversalTM(store.encodedTM);
  ui.requestUpdate();
};

export const onChangeEncodedTM = ({ target }) => {
  let tm = new UniversalTM(target.value);
  store.decodedTM = tm.decodedTM();
  store.input = tm.decodedInput();

  store.TM = new UniversalTM(store.encodedTM);
  ui.requestUpdate();
};

export const onChangeDecodedTM = ({ target }) => {
  store.decodedTM = target.value;

  store.TM = new UniversalTM(store.encodedTM);
  ui.requestUpdate();
};

export const run = () => {
  while (!store.TM.isFinished()) {
    store.TM.step();
  }
  ui.requestUpdate();
};
export const step = () => {
  if (!store.TM.isFinished()) {
    store.TM.step();
  }
  ui.requestUpdate();
};

export const reset = () => {
  store.reset();
  ui.requestUpdate();
};
