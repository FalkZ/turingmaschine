import { encodeTM, encodeInput } from "./tm/coder";
import { UniversalTM } from "./tm/UniversalTM";
import { TMError } from "./tm/types";

interface Store {
  reset: () => void;
  input: string;
  encodedTM: string;
  decodedTM: string;
  _TM?: UniversalTM;
  TM: UniversalTM;
  error: TMError;
}

export const store: Store = {
  input: "0001",
  decodedTM: `
Q0, 0, Q0, 0, R
Q2, 0, Q2, 0, R
Q0, 1, Q2, 1, R
Q2, 1, Q0, 1, R
Q0, _, Q1, 0, R
Q2, _, Q1, 1, R
  `.trim(),
  get encodedTM(): string {
    return encodeTM(this.decodedTM) + "111" + encodeInput(this.input);
  },
  reset: function() {
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
  error: undefined
};
