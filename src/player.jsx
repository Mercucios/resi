import { useEffect, useRef, useState } from 'preact/hooks';
import { exercises } from './content.js';
import { TopBar, go, back } from './ui.jsx';
import { save, load } from './store.js';

// Geführte Übung: zeigt Satz für Satz, mit Atemkreis.
// Optional „Vorlesen“ über die Sprachausgabe des Geräts, bis echte Audios aufgenommen sind.
const readSeconds = (text) => Math.max(3, text.split(/\s+/).length * 0.6);

export function Player({ id = 'ankommen', occasion }) {
  const ex = exercises[id] || exercises.ankommen;
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [voice, setVoice] = useState(false);
  const timer = useRef();
  const step = ex.steps[i];
  const last = i === ex.steps.length - 1;
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => { load('voice', false).then(setVoice); return () => { clearTimeout(timer.current); canSpeak && speechSynthesis.cancel(); }; }, []);

  useEffect(() => {
    clearTimeout(timer.current);
    if (!playing) { canSpeak && speechSynthesis.cancel(); return; }
    const next = () => {
      if (last) { setPlaying(false); finish(); return; }
      timer.current = setTimeout(() => setI((n) => n + 1), step.p * 1000);
    };
    if (voice && canSpeak) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(step.t);
      u.lang = 'de-AT'; u.rate = 0.82; u.pitch = 0.95;
      const v = speechSynthesis.getVoices().find((x) => x.lang.startsWith('de-AT')) || speechSynthesis.getVoices().find((x) => x.lang.startsWith('de'));
      if (v) u.voice = v;
      u.onend = next;
      speechSynthesis.speak(u);
    } else {
      timer.current = setTimeout(next, readSeconds(step.t) * 1000);
    }
  }, [i, playing, voice]);

  const finish = async () => {
    const done = await load('done', {});
    done[id] = (done[id] || 0) + 1;
    await save('done', done);
    go(`danach/${occasion || id}`);
  };

  const toggleVoice = () => { const v = !voice; setVoice(v); save('voice', v); };
  const progress = Math.round(((i + (playing ? 0.5 : 0)) / ex.steps.length) * 100);

  return (
    <div class="screen dark">
      <TopBar onBack={back} dark />
      <main class="player">
        <h1>{ex.title}</h1>
        <p class="muted-dark">ca. {ex.minutes} Minuten · funktioniert offline</p>

        <div class={`breath ${playing && step.breathe ? 'on' : ''}`} aria-hidden="true">
          <div class="ring r1" /><div class="ring r2" />
          <button class="play" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Starten'}>
            {playing
              ? <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              : <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
          </button>
        </div>

        <div class="progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"><div style={{ width: `${progress}%` }} /></div>

        <p class="step" aria-live="polite">{step.t}</p>

        <div class="step-nav">
          <button class="ghost" disabled={i === 0} onClick={() => setI(i - 1)}>Zurück</button>
          <span>{i + 1} / {ex.steps.length}</span>
          <button class="ghost" onClick={() => (last ? finish() : setI(i + 1))}>{last ? 'Fertig' : 'Weiter'}</button>
        </div>

        {canSpeak && (
          <label class="voice">
            <input type="checkbox" checked={voice} onChange={toggleVoice} />
            Vorlesen lassen (Gerätestimme, vorläufig)
          </label>
        )}
      </main>
      <div class="bottom">
        <button class="btn light" onClick={finish}>Fertig</button>
      </div>
    </div>
  );
}
