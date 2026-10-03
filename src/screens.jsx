import { useEffect, useState } from 'preact/hooks';
import { occasions, moods, hotlines, pillars, debrief } from './content.js';
import { load, save, addCheckin, addNote, wipeAll } from './store.js';
import { TopBar, NavBar, Chevron, Logo, go, back } from './ui.jsx';

/* ---------- Onboarding ---------- */
export function Onboarding({ done }) {
  const [page, setPage] = useState(0);
  const [region, setRegion] = useState('wien');
  const finish = async () => { await save('region', region); await save('onboarded', true); done(); };
  return (
    <div class="screen">
      <main class="content onboarding">
        <Logo size={72} />
        {page === 0 && (<>
          <h1>Servus, ich bin Resi.</h1>
          <p class="lead">Für den Moment danach – nach einer Reanimation, einem Todesfall, einem Fehler oder einem Dienst, der einfach zu viel war.</p>
          <p class="muted">Kurze Übungen, 2–3 Minuten. Kein Kurs, keine Pflicht.</p>
        </>)}
        {page === 1 && (<>
          <h1>Alles bleibt bei dir.</h1>
          <ul class="checks">
            <li>Kein Konto, keine E-Mail, kein Name.</li>
            <li>Alles wird nur auf diesem Handy gespeichert.</li>
            <li>Dein Arbeitgeber sieht nichts.</li>
            <li>Funktioniert auch ohne Internet.</li>
          </ul>
        </>)}
        {page === 2 && (<>
          <h1>Was Resi ist – und was nicht.</h1>
          <p class="lead">Resi hilft beim Durchatmen und Sortieren. Resi ersetzt keine Therapie und keine besseren Arbeitsbedingungen.</p>
          <label class="field">
            <span>In welchem Bundesland arbeitest du? Damit zeigt Resi die passenden Hilfe-Nummern.</span>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              {Object.entries(hotlines.regions).map(([k, r]) => <option key={k} value={k}>{r.label}</option>)}
            </select>
          </label>
        </>)}
      </main>
      <div class="bottom">
        <div class="dots" aria-hidden="true">{[0, 1, 2].map((n) => <span key={n} class={n === page ? 'on' : ''} />)}</div>
        <button class="btn" onClick={() => (page < 2 ? setPage(page + 1) : finish())}>{page < 2 ? 'Weiter' : 'Los geht’s'}</button>
      </div>
    </div>
  );
}

/* ---------- Start ---------- */
export function Start() {
  const [mood, setMood] = useState(null);
  const [thanks, setThanks] = useState(false);
  const [lowStreak, setLowStreak] = useState(false);

  const pick = async (m) => {
    setMood(m);
    const list = await addCheckin(m);
    setThanks(true);
    const lastThree = list.slice(-3);
    setLowStreak(lastThree.length === 3 && lastThree.every((c) => c.mood <= 2));
  };

  return (
    <div class="screen">
      <header class="topbar">
        <span class="brand"><Logo size={32} />Resi</span>
        <a class="pill" href="#/hilfe">Hilfe</a>
      </header>
      <main class="content">
        <h1>Wie war dein Dienst?</h1>
        <p class="muted">Ein Tap reicht. Niemand außer dir sieht das.</p>
        <div class="moods" role="group" aria-label="Stimmung">
          {moods.map((m) => (
            <button key={m.id} class={`mood ${mood === m.id ? 'on' : ''}`} aria-pressed={mood === m.id} onClick={() => pick(m.id)}>
              <span class="dot" style={{ background: m.color }} />{m.label}
            </button>
          ))}
        </div>
        {thanks && !lowStreak && <p class="note">Danke. Gut, dass du kurz bei dir warst.</p>}
        {lowStreak && (
          <p class="note warm">Es klingt, als wären die letzten Dienste schwer gewesen. Wenn du dich länger so fühlst, sprich mit jemandem. <a href="#/hilfe">Hier findest du Menschen, die zuhören.</a></p>
        )}

        <a class="hero" href="#/akut">
          <span class="hero-title">Gerade schwer</span>
          <span>2–3 Minuten für dich – nach einer Reanimation, einem Todesfall, einem Fehler oder einfach zu viel.</span>
        </a>

        <a class="card" href="#/lernen">
          <span><small>Lernen · 7 Säulen</small><strong>Kleine Einheiten für die Pause</strong><small>Optimismus, Akzeptanz, Bindungen …</small></span>
          <Chevron />
        </a>
        <a class="card" href="#/team">
          <span><small>Fürs Team</small><strong>10-Minuten-Nachbesprechung</strong><small>Leitfaden nach einem schweren Ereignis</small></span>
          <Chevron />
        </a>
      </main>
      <NavBar active="start" />
    </div>
  );
}

/* ---------- Gerade schwer ---------- */
export function Akut() {
  return (
    <div class="screen">
      <TopBar onBack={back} />
      <main class="content">
        <h1>Was ist passiert?</h1>
        <p class="muted">Du musst nichts erklären. Wähl, was am ehesten passt – oder einfach das Letzte.</p>
        <div class="list">
          {occasions.map((o, n) => (
            <a key={o.id} class={`row ${n === occasions.length - 1 ? 'accent' : ''}`} href={`#/uebung/${o.exercise}/${o.id}`}>
              {o.label}<Chevron />
            </a>
          ))}
        </div>
        <p class="lock">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          Deine Auswahl bleibt nur auf diesem Handy.
        </p>
      </main>
    </div>
  );
}

/* ---------- Danach ---------- */
export function Danach({ occasion }) {
  const [feel, setFeel] = useState(null);
  const [note, setNote] = useState('');
  const isError = occasion === 'fehler';
  const close = async () => { await addNote(note, occasion); if (feel) { const l = await load('after', []); l.push({ at: Date.now(), feel, occasion }); await save('after', l); } go('start'); };

  return (
    <div class="screen">
      <TopBar onBack={() => go('start')} close />
      <main class="content">
        <h1>Wie geht's dir jetzt?</h1>
        <div class="three" role="group" aria-label="Befinden nach der Übung">
          {['Etwas besser', 'Gleich', 'Schlechter'].map((f) => (
            <button key={f} class={`mood ${feel === f ? 'on' : ''}`} aria-pressed={feel === f} onClick={() => setFeel(f)}>{f}</button>
          ))}
        </div>
        {feel === 'Schlechter' && <p class="note warm">Danke, dass du ehrlich bist. Vielleicht ist jetzt ein Gespräch mit einem Menschen das Richtige. <a href="#/hilfe">Zur Hilfe</a></p>}

        <p class="note">{isError
          ? 'Nach einem Fehler fühlen sich viele schuldig oder beschämt. Das ist eine normale Reaktion – und du bist damit nicht allein.'
          : 'Nach so einem Dienst fühlen sich viele leer oder aufgewühlt. Das ist eine normale Reaktion – und du bist damit nicht allein.'}</p>

        <h2>Was jetzt guttun könnte</h2>
        <div class="box">
          <label for="note"><strong>Notiz für mich</strong></label>
          <textarea id="note" rows="3" value={note} onInput={(e) => setNote(e.target.value)} placeholder="Was geht mir nach? Was hat heute trotzdem geklappt?" />
        </div>
        <div class="box">
          <strong>Mit einer Kollegin oder einem Kollegen reden</strong>
          <span class="muted">So kannst du anfangen: „Hast du fünf Minuten? Mir geht die Situation von vorhin nach.“</span>
        </div>
        {isError && (
          <a class="row" href={`tel:${hotlines.secondVictim.tel}`}>
            <span><strong>Second Victim Österreich</strong><br /><small class="muted">Anonyme Beratung nach Fehlern · {hotlines.secondVictim.display}</small></span><Chevron />
          </a>
        )}
        <a class="row" href="#/hilfe"><strong>Professionelle Hilfe holen</strong><Chevron /></a>
      </main>
      <div class="bottom"><button class="btn" onClick={close}>Speichern und schließen</button></div>
    </div>
  );
}

/* ---------- Hilfe ---------- */
export function Hilfe() {
  const [region, setRegion] = useState('wien');
  useEffect(() => { load('region', 'wien').then(setRegion); }, []);
  const change = (v) => { setRegion(v); save('region', v); };
  const r = hotlines.regions[region] || hotlines.regions.wien;
  const sv = hotlines.secondVictim;

  return (
    <div class="screen">
      <TopBar onBack={back} noHelp />
      <main class="content">
        <h1>Du musst das nicht allein tragen.</h1>
        <p class="muted">Resi ersetzt keine Therapie. Hier findest du Menschen, die zuhören.</p>
        <div class="list">
          {hotlines.national.map((h) => (
            <a key={h.tel} class={`call ${h.primary ? 'primary' : ''}`} href={`tel:${h.tel}`}>
              <span><strong>{h.name} · {h.display || h.tel}</strong><small>{h.info}</small></span><Phone />
            </a>
          ))}
          <a class="call" href={`tel:${sv.tel}`}>
            <span><strong>{sv.name}</strong><small>{sv.display} · {sv.info}</small></span><Phone />
          </a>
        </div>

        <label class="field">
          <span>Krisendienst in deinem Bundesland</span>
          <select value={region} onChange={(e) => change(e.target.value)}>
            {Object.entries(hotlines.regions).map(([k, x]) => <option key={k} value={k}>{x.label}</option>)}
          </select>
        </label>
        <div class="list">
          {r.lines.length ? r.lines.map((h) => (
            <a key={h.tel} class="call" href={`tel:${h.tel}`}>
              <span><strong>{h.name}</strong><small>{h.display} · {h.info}</small></span><Phone />
            </a>
          )) : <p class="muted">Für {r.label} ist noch kein eigener Krisendienst eingetragen. Die TelefonSeelsorge 142 ist rund um die Uhr für dich da.</p>}
        </div>

        <div class="note">
          <strong>Hol dir Unterstützung, wenn …</strong>
          <ul>
            <li>du seit Wochen schlecht schläfst</li>
            <li>Bilder aus dem Dienst immer wieder kommen</li>
            <li>du dich leer oder taub fühlst</li>
            <li>du mehr trinkst, um abzuschalten</li>
          </ul>
        </div>
        <a class="emergency" href="tel:144">In akuter Gefahr: Notruf 144</a>
        <a class="link" href="#/info">Über Resi & Datenschutz</a>
      </main>
      <NavBar active="hilfe" />
    </div>
  );
}

const Phone = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1" /></svg>
);

/* ---------- Lernpfad ---------- */
export function Lernpfad() {
  const [open, setOpen] = useState(null);
  return (
    <div class="screen">
      <TopBar onBack={back} />
      <main class="content">
        <h1>Sieben Säulen</h1>
        <p class="muted">Kleine Einheiten, 3–5 Minuten, nach dem Modell von Ursula Nuber. Die Inhalte entstehen gerade – bald zum Anhören.</p>
        <div class="list">
          {pillars.map((p) => (
            <div key={p.id} class={`pillar ${open === p.id ? 'open' : ''}`}>
              <button aria-expanded={open === p.id} onClick={() => setOpen(open === p.id ? null : p.id)}>
                <strong>{p.name}</strong><span class="muted">{p.units.length} Einheiten</span>
              </button>
              {open === p.id && <ul>{p.units.map((u) => <li key={u}>{u} <small class="soon">bald</small></li>)}</ul>}
            </div>
          ))}
        </div>
      </main>
      <NavBar active="lernen" />
    </div>
  );
}

/* ---------- Verlauf ---------- */
export function Verlauf() {
  const [list, setList] = useState([]);
  const [notes, setNotes] = useState([]);
  useEffect(() => { load('checkins', []).then(setList); load('notes', []).then(setNotes); }, []);
  const days = Array.from({ length: 14 }, (_, k) => {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - (13 - k));
    const same = list.filter((c) => new Date(c.at).setHours(0, 0, 0, 0) === d.getTime());
    return { d, mood: same.length ? same[same.length - 1].mood : null };
  });
  const color = (m) => moods.find((x) => x.id === m)?.color;
  const wipe = async () => { if (confirm('Wirklich alle Einträge auf diesem Handy löschen?')) { await wipeAll(); location.hash = ''; location.reload(); } };

  return (
    <div class="screen">
      <TopBar onBack={back} />
      <main class="content">
        <h1>Mein Verlauf</h1>
        <p class="muted">Die letzten 14 Tage. Nur auf diesem Handy gespeichert.</p>
        <div class="chart" role="img" aria-label="Stimmung der letzten 14 Tage">
          {days.map(({ d, mood }) => (
            <div key={d.getTime()} class="bar">
              <div style={{ height: mood ? `${mood * 20}%` : '6%', background: mood ? color(mood) : '#D9E0DD' }} />
              <small>{d.getDate()}.</small>
            </div>
          ))}
        </div>
        <div class="legend">{moods.map((m) => <span key={m.id}><i style={{ background: m.color }} />{m.label}</span>)}</div>

        <h2>Meine Notizen</h2>
        {notes.length === 0 && <p class="muted">Noch keine Notizen.</p>}
        {[...notes].reverse().slice(0, 20).map((n) => (
          <div key={n.at} class="box"><small class="muted">{new Date(n.at).toLocaleDateString('de-AT')}</small><span>{n.text}</span></div>
        ))}
        <button class="ghost danger" onClick={wipe}>Alle Daten auf diesem Handy löschen</button>
      </main>
      <NavBar active="verlauf" />
    </div>
  );
}

/* ---------- Team-Debrief ---------- */
export function Debrief() {
  return (
    <div class="screen">
      <TopBar onBack={back} />
      <main class="content">
        <h1>10 Minuten fürs Team</h1>
        <p class="muted">Nach einem schweren Ereignis. Zusammen, im Stehen reicht. Eine Person liest die Fragen vor.</p>
        <ol class="debrief">
          {debrief.map((d) => <li key={d.q}><strong>{d.q}</strong><span class="muted">{d.hint}</span></li>)}
        </ol>
        <p class="note">Zum Schluss: Wer braucht heute noch etwas? Und: Danke an alle, die da waren.</p>
      </main>
    </div>
  );
}

/* ---------- Info ---------- */
export function Info() {
  return (
    <div class="screen">
      <TopBar onBack={back} />
      <main class="content prose">
        <h1>Über Resi</h1>
        <p>Resi ist ein nicht-kommerzielles Open-Source-Projekt für Pflegekräfte. Die fachliche Grundlage bildet die Arbeit „Resilienz für Intensivpersonal – Pflicht, oder Luxus?“ von Sarah Fabian-Maurer (2026).</p>
        <h2>Datenschutz</h2>
        <p>Resi speichert alle Eingaben nur lokal auf deinem Gerät. Es gibt kein Konto, kein Tracking und keine Analyse-Werkzeuge. Niemand – auch nicht die Entwickler – kann deine Einträge sehen. Wenn du die App löschst oder im Verlauf „Alle Daten löschen“ wählst, sind sie weg.</p>
        <p>Die App wird über GitHub Pages ausgeliefert. Beim Laden sieht GitHub, wie bei jeder Website, technisch deine IP-Adresse.</p>
        <h2>Wichtig</h2>
        <p>Resi ist kein Medizinprodukt und ersetzt keine Diagnose, Therapie oder Beratung. In akuter Gefahr: Notruf 144.</p>
        <p class="muted">Version 0.1 · Quellcode: github.com/Mercucios/resi</p>
      </main>
    </div>
  );
}
