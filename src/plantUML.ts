import plantumlEncoder from "plantuml-encoder";

const head = `
skinparam state {
  StartColor #ccd
  ArrowColor #112
  EndColor Red
  BackgroundColor #ccd
  BorderColor #ccd
  FontName sans-serif
}
[*] --> Q0
`;

export const display = (fns) => {
  const body = fns
    .map(
      ({ currentQ, inputSymbol, nextQ, writeSymbol, direction }) =>
        `${currentQ} --> ${nextQ}: ${inputSymbol} / ${writeSymbol},${direction}`
    )
    .join("\n");
  const encoded = plantumlEncoder.encode(head + body);

  const url = "https://www.plantuml.com/plantuml/svg/" + encoded;

  const image = new Image();
  image.src = url;
  document.body.appendChild(image);
};
