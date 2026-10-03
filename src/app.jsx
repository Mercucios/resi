import { useEffect, useState } from 'preact/hooks';
import { load } from './store.js';
import { Onboarding, Start, Akut, Danach, Hilfe, Lernpfad, Verlauf, Debrief, Info } from './screens.jsx';
import { Player } from './player.jsx';

// Einfaches Routing über den Teil nach dem # in der Adresse, z. B. #/uebung/tod
const parse = () => {
  const [name = 'start', ...rest] = location.hash.replace(/^#\/?/, '').split('/');
  return { name: name || 'start', params: rest };
};

export function App() {
  const [route, setRoute] = useState(parse());
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    const on = () => { setRoute(parse()); window.scrollTo(0, 0); document.getElementById('app')?.scrollTo(0, 0); };
    addEventListener('hashchange', on);
    load('onboarded', false).then((v) => { setOnboarded(v); setReady(true); });
    return () => removeEventListener('hashchange', on);
  }, []);

  if (!ready) return null;
  if (!onboarded) return <Onboarding done={() => setOnboarded(true)} />;

  const [a, b] = route.params;
  switch (route.name) {
    case 'akut': return <Akut />;
    case 'uebung': return <Player id={a} occasion={b} />;
    case 'danach': return <Danach occasion={a} />;
    case 'hilfe': return <Hilfe />;
    case 'lernen': return <Lernpfad />;
    case 'verlauf': return <Verlauf />;
    case 'team': return <Debrief />;
    case 'info': return <Info />;
    default: return <Start />;
  }
}
