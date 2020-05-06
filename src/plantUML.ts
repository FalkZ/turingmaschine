import { LitElement, html, property, customElement } from "lit-element";
import plantumlEncoder from "plantuml-encoder";
import {
  TransitionMap
} from "./tm/types";

const head = `
skinparam state {
  StartColor black
  ArrowColor #112
  EndColor  black
  BackgroundColor #ccd
  BorderColor #ccd
  BackgroundColor<<Current>> #66f
  BorderColor<<Current>> #66f
  FontName sans-serif
}
[*] --> Q0
Q1 --> [*]
`;

export const display = (fns: TransitionMap, currentState) => {
  const body = [...fns.entries()]
    .map(([{ currentQ, inputSymbol }, { nextQ, writeSymbol, direction }]) =>
      `Q${currentQ} --> Q${nextQ}: ${inputSymbol} / ${writeSymbol},${direction}`
    )
    .join("\n");
  const encoded = plantumlEncoder.encode(
    `${head}
state Q${currentState} <<Current>>
${body}`
  );

  return "https://www.plantuml.com/plantuml/svg/" + encoded;
};

@customElement("ui-diagram")
export class UIDiagram extends LitElement {
  @property()
  transitions: TransitionMap;
  @property()
  currentState: Number;
  render() {
    return html `<img src=${display(this.transitions, this.currentState)}>`;
  }
}
