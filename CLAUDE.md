# Resi – Hinweise für Claude

Resi ist eine nicht-kommerzielle, anonyme Begleit-App (PWA) für Pflegekräfte, vor allem in der Intensivpflege. Sie bietet kurze geführte Übungen „für den Moment danach“ (Reanimation, Todesfall, Fehler, belastende Gespräche, Überlastung). Fachliche Grundlage ist die Arbeit von Sarah Fabian-Maurer (2026) mit den sieben Säulen der Resilienz nach Ursula Nuber und den Synthesen: psychische Entlastung, moralische und emotionale Stabilisierung, Teamresilienz.

## Grundsätze (nicht verhandelbar)

- **Kein Konto, kein Tracking, keine Analyse-SDKs, keine Server-Aufrufe mit Nutzerdaten.** Alles bleibt lokal (IndexedDB über `src/store.js`).
- **Offline-fähig:** neue Assets (z. B. Audio-Dateien) müssen in `workbox.globPatterns` in `vite.config.js` erfasst sein.
- **Kein Medizinprodukt:** keine Diagnosen, keine Risiko-Scores, keine Therapieversprechen. Hinweise auf Hilfe immer als Angebot formulieren („Wenn du dich länger so fühlst …“).
- **Ton:** Du-Form, warm, kurz, österreichisch angehaucht, nie makaber. Humor nur außerhalb der Akut-Situationen.
- **Barrierearm:** echte Buttons und Links, Touch-Ziele mindestens 44 px, `prefers-reduced-motion` beachten.

## Technik

- Vite + Preact, `vite-plugin-pwa`. Deployment über GitHub Pages aus dem Ordner `docs/` (Branch `main`).
- **Nach jeder Änderung `npm run build` ausführen und den Ordner `docs/` mit committen**, sonst ändert sich die Live-App nicht.
- `base` ist `/resi/` (URL: https://mercucios.github.io/resi/).
- Inhalte (Texte, Übungen, Hilfe-Nummern, Lernpfad) stehen ausschließlich in `src/content.js`.
- Icons entstehen aus `public/icon.svg` über `scripts/make-icons.mjs` (läuft automatisch beim Build).

## Zusammenarbeit

David ist Projektinhaber und kein Vollzeit-Entwickler: Änderungen kurz auf Deutsch erklären.
Bei jeder Änderung: Versionsnummer erhöhen (`package.json` und Info-Screen in `src/screens.jsx`), Eintrag in `CHANGELOG.md` ergänzen und David die neue Version in der Antwort nennen. Sarah prüft alle Inhalte fachlich – neue oder geänderte Übungstexte als Entwurf kennzeichnen.
