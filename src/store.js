// Alles wird nur lokal im Browser (IndexedDB) gespeichert. Nichts verlässt das Gerät.
import { get, set, del } from 'idb-keyval';

export const load = async (key, fallback) => {
  try { const v = await get(key); return v === undefined ? fallback : v; } catch { return fallback; }
};
export const save = async (key, value) => { try { await set(key, value); } catch { /* Speicher nicht verfügbar */ } };

export const addCheckin = async (mood) => {
  const list = await load('checkins', []);
  list.push({ at: Date.now(), mood });
  await save('checkins', list.slice(-365));
  return list;
};

export const addNote = async (text, occasion) => {
  if (!text.trim()) return;
  const list = await load('notes', []);
  list.push({ at: Date.now(), text: text.trim(), occasion });
  await save('notes', list);
};

export const wipeAll = async () => {
  for (const k of ['checkins', 'notes', 'region', 'done', 'onboarded', 'contacts', 'after', 'voice']) { try { await del(k); } catch { /* */ } }
};
