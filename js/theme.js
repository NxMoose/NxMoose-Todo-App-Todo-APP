import { loadTheme, saveTheme } from "./storage.js";

const rootElement = document.documentElement;
const LIGHT = "light";
const DARK = "dark";

function getPreferredTheme() {
  const stored = loadTheme();
  if (stored === LIGHT || stored === DARK) {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? LIGHT : DARK;
}

export function initTheme() {
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);
  return currentTheme;
}

export function applyTheme(themeMode) {
  rootElement.dataset.theme = themeMode;
  saveTheme(themeMode);
}

export function toggleTheme() {
  const nextTheme = rootElement.dataset.theme === LIGHT ? DARK : LIGHT;
  applyTheme(nextTheme);
  return nextTheme;
}

export function isLightTheme() {
  return rootElement.dataset.theme === LIGHT;
}
