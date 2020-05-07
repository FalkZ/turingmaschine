import { encodeTM, encodeInput } from "./tm/coder";
import { UniversalTM } from "./tm/UniversalTM";
import { TMError } from "./tm/types";
import { multiplication } from "./multiplication";
import { ui } from "./ui";

interface Store {
  reset: () => void;
  input: string;
  encodedTM: string;
  decodedTM: string;
  _TM?: UniversalTM;
  TM: UniversalTM;
  error?: TMError;
  dictionary: string[];
  collapseInput: boolean;
}

export const store: Store = {
  input: localStorage.getItem("input") || "1110_101",
  decodedTM: localStorage.getItem("decodedTM") || multiplication,
  get encodedTM(): string {
    return encodeTM(this.decodedTM) + "111" + encodeInput(this.input);
  },
  reset: function () {
    this.error = undefined;
    this._TM = new UniversalTM(this.encodedTM);
  },
  get TM() {
    if (!this._TM) this._TM = new UniversalTM(this.encodedTM);
    return this._TM;
  },
  set TM(tm) {
    this._TM = tm;
  },
  dictionary: ["_", "0", "1"],
  collapseInput: true,
};
