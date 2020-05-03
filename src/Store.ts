import { encodeTM, encodeInput } from "./tm/coder";
import { UniversalTM } from "./tm/UniversalTM";
interface Store {
  input: string;
  encodedTM: ()=> string;
  decodedTM: string;
  TM: UniversalTM;
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
  get encodedTM: function (): string { return encodeTM(this.decodedTM) + "111" + encodeInput(this.input) },
  TM: new UniversalTM("111")
};
