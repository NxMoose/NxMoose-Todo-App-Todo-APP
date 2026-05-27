import { state } from "./state.js";
import { getFilteredTasks } from "./filters.js";
import { TaskItem } from "./components/TaskItem.js";
import { EmptyState } from "./components/EmptyState.js";
import { elements } from "./elements.js";

const FILTER_OPTIONS = [
  { filter: "all", label: "Todas" },
  { filter: "active", label: "Pendentes" },
  { filter: "completed", label: "Concluídas" },
];

export function initializeFilterBar() {
  const fragment = document.createDocumentFragment();

  FILTER_OPTIONS.forEach(({ filter, label }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button";
    button.dataset.filter = filter;
    button.textContent = label;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-pressed", String(filter === state.filter));
    fragment.appendChild(button);
  });

  elements.filterContainer.textContent = "";
  elements.filterContainer.appendChild(fragment);
}

export function updateFilterBar() {
  const buttons = elements.filterContainer.querySelectorAll("button[data-filter]");
  buttons.forEach((button) => {
    const isActive = button.dataset.filter === state.filter;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

export function updateCount() {
  const total = state.tasks.length;
  const remaining = state.tasks.filter((task) => !task.completed).length;
  const completed = total - remaining;

  let countText = "";
  if (total === 0) {
    countText = "Nenhuma tarefa adicionada ainda.";
  } else if (remaining === 0) {
    countText = `Todas as ${total} tarefas concluídas.`;
  } else {
    countText = `${remaining} de ${total} tarefas restantes`;
    if (completed > 0) {
      countText += ` (${completed} concluídas)`;
    }
  }

  elements.count.textContent = countText;
}

export function render() {
  const tasks = getFilteredTasks();
  const fragment = document.createDocumentFragment();

  if (!tasks.length) {
    fragment.appendChild(EmptyState());
  } else {
    tasks.forEach((task) => fragment.appendChild(TaskItem(task)));
  }

  elements.list.replaceChildren(fragment);
  updateCount();
  updateFilterBar();
}
