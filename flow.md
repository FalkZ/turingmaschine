```
Q0, 0, Q0, 0, R
Q1, 0, Q1, 0, R
Q0, 1, Q1, 1, R
Q1, 1, Q0, 1, R
Q0, _, Q2, 0, R
Q1, _, Q2, 1, R
```

```plantUML
@startuml

skinparam state {
  StartColor #ccd
  ArrowColor #112
  EndColor Red
  BackgroundColor #ccd
  BorderColor #ccd
  FontName sans-serif
}

[*] --> Q0

Q0 --> Q0:  0 / 0, R
Q1 --> Q0:  1 / 1, R


@enduml

```
