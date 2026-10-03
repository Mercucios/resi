// Alle Inhalte von Resi an einem Ort – hier können Texte geändert werden, ohne den Code anzufassen.
// p = Pause in Sekunden nach dem Satz.

export const exercises = {
  ankommen: {
    title: 'Erst mal ankommen',
    minutes: 3,
    steps: [
      { t: 'Du hast dir gerade einen Moment genommen. Das ist gut. Du musst jetzt nichts leisten.', p: 2 },
      { t: 'Wenn du kannst, stell beide Füße auf den Boden. Spür, wie der Boden dich trägt.', p: 5 },
      { t: 'Wir atmen jetzt gemeinsam. Atme durch die Nase ein – eins, zwei, drei, vier. Und langsam durch den Mund aus – eins, zwei, drei, vier, fünf, sechs.', p: 5, breathe: true },
      { t: 'Noch einmal. Ein – zwei, drei, vier. Aus – zwei, drei, vier, fünf, sechs.', p: 5, breathe: true },
      { t: 'Und ein drittes Mal, in deinem eigenen Tempo.', p: 10, breathe: true },
      { t: 'Schau dich kurz um. Such dir drei Dinge, die du gerade siehst.', p: 5 },
      { t: 'Zwei Geräusche, die du hörst.', p: 5 },
      { t: 'Und eine Stelle, an der dein Körper etwas berührt – die Lehne, deine Hände, den Boden.', p: 5 },
      { t: 'Der Dienst war viel. Es ist in Ordnung, dass er dich mitnimmt. Du hast heute getan, was in dem Moment möglich war.', p: 3 },
      { t: 'Wenn du magst, atme noch einmal tief aus. Und dann geh in deinem Tempo weiter.', p: 2 }
    ]
  },
  reanimation: {
    title: 'Nach einer Reanimation',
    minutes: 3,
    steps: [
      { t: 'Eine Reanimation ist ein Ausnahmezustand, für den Körper und für den Kopf. Vielleicht zittern deine Hände noch, vielleicht ist dein Herz schnell. Das ist das Adrenalin. Es darf jetzt langsam abklingen.', p: 3 },
      { t: 'Lass die Schultern einmal nach oben ziehen – ganz hoch zu den Ohren.', p: 4 },
      { t: 'Und fallen lassen.', p: 4 },
      { t: 'Noch einmal. Hoch – und los.', p: 4 },
      { t: 'Atme jetzt länger aus, als du einatmest. Ein – zwei, drei, vier. Aus – zwei, drei, vier, fünf, sechs.', p: 5, breathe: true },
      { t: 'Lange Ausatmung sagt deinem Körper: Der Notfall ist vorbei.', p: 5, breathe: true },
      { t: 'Noch zweimal so, in deinem Tempo.', p: 10, breathe: true },
      { t: 'Wie es auch ausgegangen ist: Ihr habt als Team alles gegeben. Jeder Handgriff, jede Kompression, jede Absprache war Arbeit am Leben eines Menschen.', p: 3 },
      { t: 'Vielleicht kommen jetzt Bilder oder Fragen hoch. Das ist normal. Du musst sie nicht allein sortieren. Ein kurzes Gespräch im Team, noch heute, kann viel abnehmen.', p: 3 },
      { t: 'Trink einen Schluck Wasser, wenn du kannst. Und nimm dir die nächsten Minuten etwas langsamer.', p: 2 }
    ]
  },
  tod: {
    title: 'Wenn jemand verstorben ist',
    minutes: 3,
    steps: [
      { t: 'Jemand, den du begleitet hast, ist gestorben. Das darf dich berühren – auch wenn es zum Beruf gehört, auch wenn es erwartet war.', p: 3 },
      { t: 'Nimm dir einen Atemzug für dich. Ein … und aus.', p: 5, breathe: true },
      { t: 'Wenn du magst, denk kurz an diesen Menschen. An ein Detail – ein Gesicht, eine Stimme, eine Geste.', p: 10 },
      { t: 'Du kannst innerlich einen Satz sagen, der für dich passt. Vielleicht: „Ich habe dich begleitet, so gut ich konnte.“ Oder einfach: „Leb wohl.“', p: 6 },
      { t: 'Trauer im Dienst hat oft keinen Platz. Sie ist trotzdem da. Es ist in Ordnung, sie zu spüren und später mit jemandem darüber zu reden.', p: 3 },
      { t: 'Atme noch zweimal langsam aus.', p: 6, breathe: true },
      { t: 'Und wenn du bereit bist, kehr zurück zu dem, was jetzt dran ist.', p: 2 }
    ]
  },
  fehler: {
    title: 'Nach einem Fehler',
    minutes: 3,
    steps: [
      { t: 'Etwas ist passiert, das nicht hätte passieren sollen. Oder es war knapp. Vielleicht spürst du Scham, Angst oder Schuld.', p: 2 },
      { t: 'Diese Gefühle sind eine normale Reaktion. Sie zeigen, wie wichtig dir deine Patientinnen und Patienten sind.', p: 3 },
      { t: 'Viele Pflegekräfte erleben das. Du bist damit nicht allein – auch wenn es sich gerade so anfühlt.', p: 3 },
      { t: 'Atme einmal tief ein. Und lang aus.', p: 5, breathe: true },
      { t: 'Noch einmal.', p: 5, breathe: true },
      { t: 'Stell dir vor, eine Kollegin, die du schätzt, hätte das erlebt. Was würdest du ihr sagen?', p: 10 },
      { t: 'Versuch, diesen Satz jetzt auch dir selbst zu sagen.', p: 6 },
      { t: 'Fehler passieren selten nur wegen einer Person. Meist spielen viele Dinge zusammen – Zeitdruck, Abläufe, Besetzung.', p: 3 },
      { t: 'Was jetzt hilft, ist ein nächster kleiner Schritt. Sprich mit jemandem, dem du vertraust. Wenn nötig: Melde es, so wie es bei euch vorgesehen ist. Und hol dir Unterstützung – im Team, bei deiner Leitung oder anonym, zum Beispiel beim Verein Second Victim.', p: 3 },
      { t: 'Du bist mehr als dieser Moment.', p: 3 }
    ]
  }
};

export const occasions = [
  { id: 'reanimation', label: 'Reanimation oder Notfall', exercise: 'reanimation' },
  { id: 'tod', label: 'Jemand ist verstorben', exercise: 'tod' },
  { id: 'fehler', label: 'Fehler oder Beinahe-Fehler', exercise: 'fehler', secondVictim: true },
  { id: 'angehoerige', label: 'Schweres Gespräch mit Angehörigen', exercise: 'ankommen' },
  { id: 'gewalt', label: 'Beschimpft oder angegriffen', exercise: 'ankommen' },
  { id: 'zuviel', label: 'Einfach alles zu viel', exercise: 'ankommen' }
];

// Stimmungs-Skala beim Check-in. Farben: klar unterscheidbar und von hell nach dunkel abgestuft.
export const moods = [
  { id: 5, label: 'Gut', color: '#2E8B57',
    reply: 'Sch\u00f6n! Was hat heute gut getan? Merk es dir \u2013 an schweren Tagen hilft genau das.' },
  { id: 4, label: 'Okay', color: '#8DBF3F',
    reply: 'Okay ist okay. G\u00f6nn dir trotzdem eine kleine Pause, bevor der Alltag weitergeht.' },
  { id: 3, label: 'Z\u00e4h', color: '#F2C230',
    reply: 'Z\u00e4he Dienste kosten Kraft. Schon drei ruhige Atemz\u00fcge k\u00f6nnen helfen.',
    action: { label: 'Kurz durchatmen', href: '#/uebung/ankommen' } },
  { id: 2, label: 'M\u00fcde', color: '#E67E22',
    reply: 'Du hast heute viel gegeben. Jetzt z\u00e4hlt das Einfache: trinken, essen, schlafen.',
    action: { label: 'Kurz durchatmen', href: '#/uebung/ankommen' } },
  { id: 1, label: 'Schwer', color: '#B03A2E',
    reply: 'Das klingt nach einem schweren Dienst. Du musst das nicht allein tragen.',
    action: { label: 'Gerade schwer', href: '#/akut' }, help: true }
];

// Stand 03.10.2026 – Quellen: gesundheit.gv.at, telefonseelsorge.at, secondvictim.at. Vor jeder Veröffentlichung prüfen.
export const hotlines = {
  national: [
    { name: 'TelefonSeelsorge – Notruf', tel: '142', info: 'rund um die Uhr · anonym · gratis · auch Chat', primary: true },
    { name: 'Ö3-Kummernummer', tel: '116123', display: '116 123', info: 'täglich 16–24 Uhr' }
  ],
  secondVictim: { name: 'Second Victim Österreich', tel: '+43720704344', display: '+43 720 70 43 44', info: 'Für Gesundheitspersonal nach Fehlern und belastenden Ereignissen · Mo 9–11, Do 17–19 Uhr · anonym · gratis', mail: 'beratung@secondvictim.at' },
  regions: {
    wien: { label: 'Wien', lines: [
      { name: 'Psychiatrische Soforthilfe (PSD)', tel: '0131330', display: '01 31330', info: 'rund um die Uhr' },
      { name: 'Kriseninterventionszentrum', tel: '014069595', display: '01 406 95 95', info: 'Mo–Fr 8–17 Uhr' }
    ] },
    stmk: { label: 'Steiermark', lines: [{ name: 'PsyNot', tel: '0800449933', display: '0800 44 99 33', info: 'rund um die Uhr' }] },
    ktn: { label: 'Kärnten', lines: [
      { name: 'Psychiatrischer Not- und Krisendienst Ost', tel: '06643007007', display: '0664 300 70 07', info: 'rund um die Uhr' },
      { name: 'Psychiatrischer Not- und Krisendienst West', tel: '06643009003', display: '0664 300 90 03', info: 'rund um die Uhr' }
    ] },
    ooe: { label: 'Oberösterreich', lines: [{ name: 'Krisenhilfe OÖ', tel: '07322177', display: '0732 2177', info: 'rund um die Uhr' }] },
    sbg: { label: 'Salzburg', lines: [{ name: 'Krisenhotline Salzburg', tel: '0662433351', display: '0662 433351', info: 'rund um die Uhr' }] },
    tirol: { label: 'Tirol', lines: [{ name: 'Psychosozialer Krisendienst', tel: '0800400120', display: '0800 400 120', info: 'täglich 9–19 Uhr' }] },
    noe: { label: 'Niederösterreich', lines: [] },
    bgld: { label: 'Burgenland', lines: [] },
    vbg: { label: 'Vorarlberg', lines: [] }
  }
};

export const pillars = [
  { id: 'optimismus', name: 'Optimismus', units: ['Hoffnung trotz schwerer Tage', 'Drei gute Dinge', 'Was mir Kraft gibt', 'Der Blick nach vorn'] },
  { id: 'akzeptanz', name: 'Akzeptanz', units: ['Was ist, darf sein', 'Was ich heute nicht ändern konnte', 'Grenzen anerkennen', 'Loslassen nach dem Dienst'] },
  { id: 'loesung', name: 'Lösungsorientierung', units: ['Gedankenkarussell stoppen', 'Der nächste kleine Schritt', 'Was liegt in meiner Hand?', 'Um Hilfe bitten'] },
  { id: 'bindungen', name: 'Bindungen', units: ['Das Team als Halt', 'Unterstützung annehmen', 'Kolleginnen stärken', 'Freundschaft außerhalb der Station'] },
  { id: 'fuersorge', name: 'Selbstfürsorge', units: ['Schlaf nach dem Nachtdienst', 'Essen im Schichtdienst', 'Bewegung in kleinen Dosen', 'Abschalten ohne Alkohol'] },
  { id: 'verantwortung', name: 'Selbstverantwortung', units: ['Für eigene Bedürfnisse einstehen', 'Nein sagen', 'Pausen nehmen', 'Grenzen im Team ansprechen'] },
  { id: 'lernen', name: 'Aus Erfahrung lernen', units: ['Fehlerkultur', 'Nach einem Fehler weitermachen', 'Kleine Erfolge sehen', 'Was ich heute gelernt habe'] }
];

export const debrief = [
  { q: 'Was ist passiert?', hint: 'Kurz, nur die Fakten. Jede und jeder aus ihrer oder seiner Sicht.' },
  { q: 'Wie geht es uns damit?', hint: 'Gefühle sind erlaubt. Niemand muss etwas sagen.' },
  { q: 'Was hat gut funktioniert?', hint: 'Auch in schweren Situationen klappt vieles.' },
  { q: 'Was brauchen wir jetzt?', hint: 'Pause, Gespräch, Unterstützung, eine Änderung im Ablauf?' }
];
