import { LitElement, html, property, customElement } from "lit-element";
import plantumlEncoder from "plantuml-encoder";
import { TransitionMap } from "./tm/types";
import { store } from "./Store";

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
    .map(
      ([{ currentQ, inputSymbol }, { nextQ, writeSymbol, direction }]) =>
        `Q${currentQ} --> Q${nextQ}: ${store.dictionary[inputSymbol]} / ${store.dictionary[writeSymbol]},${direction}`
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
    const div = document.createElement("div");
    div.className = "loader";
    div.innerText = "Loading...";

    return html` <link
        rel="stylesheet"
        href="./loader.css"
      />${this.shadowRoot.appendChild(div)}

      <img
        @load=${() => {
          div.style.opacity = "0";
        }}
        src=${display(this.transitions, this.currentState)}
      />`;
  }
}
