const KEY = 'tb_favs';

function safeRead() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function getFavs() {
  return safeRead();
}

export function isFav(symbol) {
  return getFavs().some((s) => s.symbol === symbol);
}

export function addFav({ symbol, name }) {
  if (!symbol) return;
  const list = getFavs();
  if (!list.some((s) => s.symbol === symbol)) {
    const next = [...list, { symbol, name: name || symbol }];
    localStorage.setItem(KEY, JSON.stringify(next));
  }
}

export function removeFav(symbol) {
  const list = getFavs().filter((s) => s.symbol !== symbol);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function toggleFav({ symbol, name }) {
  if (isFav(symbol)) {
    removeFav(symbol);
    return false;
  }
  addFav({ symbol, name });
  return true;
}
