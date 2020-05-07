```

              1101 * 101
        |     110x * 101
     101|     110x * 101
     101|     11xx * 101
    1001|     1xxx * 101
    1001|     1xxx * 101
   11001|     1xxx * 101
```

```
              1101 * 101
+          101
           101 101 * 101
+           101
           1111 01 * 101
+              0
           11110 1 * 101
+             101
          1000001  * 101
```

```
// gap erstellen
Q0, 0, Q10, _, L
Q10, _, Q20, O, R
Q0, 1, Q11, _, L
Q11, _, Q20, O, R
Q20, _, Q2, _, R
// rechts spulen
Q2, 0, Q2, 0, R
Q2, 1, Q2, 1, R
// space überspringen
Q2, _, Q3, _, R
// rechts spulen
Q3, 0, Q3, 0, R
Q3, 1, Q3, 1, R
// zeichen markieren
Q3, _, Q4, _, L
Q3, I, Q4, I, L
Q3, O, Q4, O, L
Q4, 1, Q31, I, L
Q4, 0, Q30, O, L
// links spulen
Q30, 0, Q30, 0, L
Q30, 1, Q30, 1, L
Q30, _, Q30, _, L
Q31, 0, Q31, 0, L
Q31, 1, Q31, 1, L
Q31, _, Q31, _, L
// zahl übertragen
Q30, I, Q40, 1, L
Q30, O, Q40, 0, L
Q31, O, Q40, 1, L
// übertrag
Q31, I, Q41, 0, L
Q41, 0, Q8, I, R
Q41, _, Q8, I, R
Q41, 1, Q8, I, R
// todo: addition
// grenze markieren
Q40, 0, Q8, O, R
Q40, _, Q8, O, R
Q40, 1, Q8, I, R
// rechts spulen gap
Q8, 0, Q8, 0, R
Q8, 1, Q8, 1, R
Q8, _, Q2, _, R
// gap schieben
Q4, _, Q5, _, L
Q5, 1, Q5, 1, L
Q5, 0, Q5, 0, L
Q5, _, Q6, _, R
Q6, 0, Q60, _, L
Q6, 1, Q61, _, L
// ende der rechnung
Q6, _, Q100, _, R
// nächste gap schieben
Q60, _, Q5, 0, R
// grenze neu setzen
Q61, _, Q9, O, L
// alte grenze löschen
Q9, 0, Q9, 0, L
Q9, 1, Q9, 1, L
Q9, O, Q93, _, R
Q9, I, Q93, 1, R
// zurück zum gap
Q93, 0, Q93, 0, R
Q93, 1, Q93, 1, R
Q93, O, Q93, O, R
Q93, I, Q93, I, R
Q93, _, Q94, _, R
// reset der markierung
Q94, _, Q94, _, R
Q94, O, Q95, 0, R
Q94, I, Q95, 1, R
Q95, O, Q95, 0, R
Q95, I, Q95, 1, R
Q95, _, Q4, _, L
// rest löschen
Q100, I, Q100, _, R
Q100, O, Q100, _, R
Q100, _, Q1, _, L
```

```
// gap erstellen
Q0, 0, Q10, _, L
Q10, _, Q20, O, R
Q0, 1, Q11, _, L
Q11, _, Q20, O, R
Q20, _, Q2, _, R
// rechts spulen
Q2, 0, Q2, 0, R
Q2, 1, Q2, 1, R
// space überspringen
Q2, _, Q3, _, R
// rechts spulen
Q3, 0, Q3, 0, R
Q3, 1, Q3, 1, R
// zeichen markieren
Q3, _, Q4, _, L
Q3, I, Q4, I, L
Q3, O, Q4, O, L
Q4, 1, Q31, I, L
Q4, 0, Q30, O, L
// links spulen
Q30, 0, Q30, 0, L
Q30, 1, Q30, 1, L
Q30, _, Q30, _, L
Q31, 0, Q31, 0, L
Q31, 1, Q31, 1, L
Q31, _, Q31, _, L
// zahl übertragen
Q30, I, Q40, 1, L
Q30, O, Q40, 0, L
Q31, O, Q40, 1, L
// addition
Q31, I, Q41, 0, L
Q41, 0, Q8, I, R
Q41, _, Q8, I, R
Q41, 1, Q45, 0, L
// übertrag bis aufgeht
Q45, 0, Q49, 1, R
Q45, _, Q49, 1, R
Q45, 1, Q45, 0, L
// zur markierung zurück
Q49, 0, Q49, 0, R
Q49, 1, Q49, 1, R
Q49, O, Q8, O, R
Q49, I, Q8, I, R
// grenze markieren
Q40, 0, Q8, O, R
Q40, _, Q8, O, R
Q40, 1, Q8, I, R
// rechts spulen gap
Q8, 0, Q8, 0, R
Q8, 1, Q8, 1, R
Q8, _, Q2, _, R
// gap schieben
Q4, _, Q5, _, L
Q5, 1, Q5, 1, L
Q5, 0, Q5, 0, L
Q5, _, Q6, _, R
Q6, 0, Q60, _, L
Q6, 1, Q61, _, L
// ende der rechnung
Q6, _, Q100, _, R
// nächste gap schieben
Q60, _, Q5, 0, R
// grenze neu setzen
Q61, _, Q9, O, L
// alte grenze löschen
Q9, 0, Q9, 0, L
Q9, 1, Q9, 1, L
Q9, O, Q93, _, R
Q9, I, Q93, 1, R
// zurück zum gap
Q93, 0, Q93, 0, R
Q93, 1, Q93, 1, R
Q93, O, Q93, O, R
Q93, I, Q93, I, R
Q93, _, Q99, _, R
// zum 2. gap
Q99, 1, Q99, 1, R
Q99, 0, Q99, 0, R
Q99, _, Q94, _, R
// reset der markierung
Q94, _, Q94, _, R
Q94, O, Q95, 0, R
Q94, I, Q95, 1, R
Q95, O, Q95, 0, R
Q95, I, Q95, 1, R
Q95, _, Q4, _, L
// rest löschen
Q100, I, Q100, _, R
Q100, O, Q100, _, R
Q100, _, Q1, _, L
```
