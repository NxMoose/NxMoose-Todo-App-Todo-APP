import { state } from "./state.js";
import { getFilteredTasks } from "./filters.js";
import { TaskItem } from "./components/TaskItem.js";
import { EmptyState } from "./components/EmptyState.js";
import { elements } from "./elements.js";

export function clearInput() {
  elements.input.value = "";
  elements.input.focus();
}

export function updateCount() {
  const total = state.tasks.length;
  const remaining = state.tasks.filter((task) => !task.completed).length;
  const completed = total - remaining;

  let countText = "";

  if (total === 0) {
    countText = "Nenhuma tarefa";
  } else if (remaining === 0) {
    countText = `Todas as ${total} tarefas concluídas!`;
  } else {
    countText = `${remaining} de ${total} tarefas restantes`;
    if (completed > 0) {
      countText += ` (${completed} concluídas)`;
    }
  }

  elements.count.innerText = countText;
}

export function getFilterButtons() {
  return document.querySelectorAll(".filters button");
}

export function render() {
  elements.list.textContent = "";

  const tasks = getFilteredTasks();

  if (!tasks.length) {
    elements.list.appendChild(EmptyState());
    updateCount();
    return;
  }

  tasks.forEach((task) => {
    const li = TaskItem(task);
    elements.list.appendChild(li);
  });

  updateCount();
}
