# Specifikation

1.	Linus Boréus
2.	Datahålet
3.	Personliga konfigurerbara databaser
4.	Program data.
5.	Funktionalitet:
    * a.	Registrera användare, med användarnamn och lösen.
    * b.	Konfigurera hur datan ska sparas.
    * c.	API för att spara, redigera och hämta data.
    * d.	Sida för att kunna kolla igenom sin egen data.
    * e.	Kunna välja viss data som visas på en publikt sida.
    * f.	Konfigurera automatisk borttagning t.ex. efter en viss tid och/eller de äldsta posterna om datamängden överstiger ett nummer.
    * g.	Söka i datan.
    * h.	Filtrera i datan.
6.	Prio: a, b, d

---
### Dynamisk datalagring

Grundidén är att en användare ska kunna registrera sig(användarnamn och lösen), och sedan kunna spara den typ av data som personen vill. Användaren ska också kunna skapa en publik sida med data som presenteras på ett configurerbart sätt.

---
Användaren ska kunna definera objekt att spara i databasen med hjälp av en indent list, för att göra det enkelt.
```
objekttyp1
  variabelnamn1
  variabelnamn2
  
objekttyp2
  variabelnamn1
  variabelnamn2
  variabelnamn3
    variabelIVariabel3namn
```
eller skapa något liknande [träd](https://www.w3schools.com/howto/howto_js_treeview.asp) med knappar för att skapa djupare objekt.

Databas typ: GraphQL?

---
Den publika sidan ska kunna configureras via pug liknande kod.

```
h1 titel
div
  p= %variabelnamn1%
  p= %variabelnamn2%
```
<h1>titel</h1>
  <p>variabelnamn1: data1</p>
  <p>variabelnamn2: data2</p>
