import { state } from "./state.js";
import { loadTasks, loadTheme, saveTheme } from "./storage.js";
import { render, clearInput, getFilterButtons } from "./ui.js";
import { addTask } from "./tasks.js";
import { setFilter } from "./filters.js";
import { createFilterButton } from "./components/FilterButton.js";
import { elements } from "./elements.js";
import { setupEventDelegation, setupDragDelegation } from "./events.js";

function applyTheme(isLight) {
  document.body.classList.toggle("light", isLight);
  elements.themeToggle.textContent = isLight ? "☀️" : "🌙";
}

function initTheme() {
  const savedTheme = loadTheme();
  const isLight = savedTheme === "light";
  applyTheme(isLight);
}

function toggleTheme() {
  const isLight = !document.body.classList.contains("light");
  applyTheme(isLight);
  saveTheme(isLight ? "light" : "dark");
}

function setupFilterButtons() {
  const filterContainer = document.querySelector(".filters");
  filterContainer.textContent = "";

  const options = [
    { filter: "all", label: "Todas" },
    { filter: "active", label: "Pendentes" },
    { filter: "completed", label: "Concluídas" },
  ];

  options.forEach(({ filter, label }) => {
    const button = createFilterButton(filter, label);
    filterContainer.appendChild(button);
  });

  getFilterButtons().forEach((button) => {
    button.addEventListener("click", () => {
      setFilter(button.dataset.filter);
      getFilterButtons().forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === state.filter);
      });
      render();
    });
  });
}

function init() {
  state.tasks = loadTasks();
  initTheme();
  setupFilterButtons();
  setFilter(state.filter);
  getFilterButtons().forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === state.filter);
  });

  setupEventDelegation();
  setupDragDelegation();

  render();

  elements.addBtn.addEventListener("click", () => {
    if (addTask(elements.input.value, elements.prioritySelect.value)) {
      clearInput();
      render();
    }
  });

  elements.input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (addTask(elements.input.value, elements.prioritySelect.value)) {
        clearInput();
        render();
      }
    }
  });

  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.input.focus();
}

window.addEventListener("DOMContentLoaded", init);
