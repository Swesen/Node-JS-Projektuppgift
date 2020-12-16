# Node JS Projektuppgift

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
  p %data1%
  p %data2%
```
