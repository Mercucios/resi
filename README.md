# Resi

**Für den Moment danach.** Resi ist eine anonyme Begleit-App für Pflegekräfte: kurze geführte Übungen nach einer Reanimation, einem Todesfall, einem Fehler oder einem Dienst, der einfach zu viel war.

- Kein Konto, kein Tracking – alles bleibt lokal auf dem Gerät
- Funktioniert offline (Progressive Web App)
- Nicht-kommerziell und Open Source (MIT)

Fachliche Grundlage: *Resilienz für Intensivpersonal – Pflicht, oder Luxus?* von Sarah Fabian-Maurer (2026).

**App öffnen:** https://mercucios.github.io/resi/ und dann im Browser „Zum Home-Bildschirm hinzufügen“.

> Resi ist kein Medizinprodukt und ersetzt keine Therapie. In akuter Gefahr: Notruf 144.

## Inhalte ändern

Alle Texte, Übungen und Hilfe-Nummern stehen in **`src/content.js`**. Dort können sie geändert werden, ohne den restlichen Code anzufassen.

## Entwickeln

```bash
npm install
npm run dev      # lokale Vorschau
npm run build    # baut die App in den Ordner docs/ (wird von GitHub Pages veröffentlicht)
```

## Aufbau

| Datei | Inhalt |
| --- | --- |
| `src/content.js` | Übungstexte, Anlässe, Hilfe-Nummern, Lernpfad |
| `src/screens.jsx` | Alle Bildschirme |
| `src/player.jsx` | Geführte Übung mit Atemkreis |
| `src/store.js` | Lokale Speicherung (IndexedDB) |
| `src/styles.css` | Gestaltung |
| `public/icon.svg` | App-Icon |
