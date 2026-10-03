// Kleine wiederverwendbare Bausteine
export const go = (path) => { location.hash = '/' + path; };
export const back = () => { history.length > 1 ? history.back() : go('start'); };

export const Chevron = ({ color = 'currentColor' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
);

export const Logo = ({ size = 32 }) => <img src={`${import.meta.env.BASE_URL}icon.svg`} width={size} height={size} alt="" style={{ borderRadius: size * 0.22 }} />;

export function TopBar({ onBack, backLabel = 'Zurück', close, title, dark, noHelp }) {
  return (
    <header class={`topbar ${dark ? 'dark' : ''}`}>
      {onBack ? (
        <button class="round" aria-label={close ? 'Schließen' : backLabel} onClick={onBack}>
          {close
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 6l-6 6 6 6" /></svg>}
        </button>
      ) : <span />}
      {title && <span class="topbar-title">{title}</span>}
      {noHelp ? <span /> : <a class="pill" href="#/hilfe">Hilfe</a>}
    </header>
  );
}

export function NavBar({ active }) {
  const items = [
    ['start', 'Start', <path d="M4 11l8-7 8 7v9H4z" />],
    ['lernen', 'Lernen', <path d="M5 20V8M10 20V5M15 20v-9M20 20V7" />],
    ['verlauf', 'Verlauf', <path d="M4 17l5-5 4 3 7-8" />],
    ['hilfe', 'Hilfe', <g><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.5v.5" /></g>]
  ];
  return (
    <nav class="navbar" aria-label="Hauptmenü">
      {items.map(([id, label, icon]) => (
        <a key={id} href={`#/${id}`} class={active === id ? 'active' : ''} aria-current={active === id ? 'page' : undefined}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{icon}</svg>
          {label}
        </a>
      ))}
    </nav>
  );
}
