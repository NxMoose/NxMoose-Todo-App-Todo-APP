import { state } from "./state.js";
import { loadTasks } from "./storage.js";
import { initTheme, isLightTheme, toggleTheme } from "./theme.js";
import { initializeFilterBar, render } from "./ui.js";
import { initializeDragDrop } from "./dragdrop.js";
import { configureAppEvents } from "./events.js";
import { elements } from "./elements.js";

function updateThemeToggleButton() {
  const isLight = isLightTheme();
  elements.themeToggle.setAttribute("aria-pressed", String(isLight));
  elements.themeToggle.innerHTML = `${isLight ? "☀️" : "🌙"}`;
}

function init() {
  state.tasks = loadTasks();
  initTheme();
  updateThemeToggleButton();
  initializeFilterBar();
  configureAppEvents({ onThemeChange: updateThemeToggleButton });
  initializeDragDrop();
  render();
  elements.input.focus();
}

window.addEventListener("DOMContentLoaded", init);
