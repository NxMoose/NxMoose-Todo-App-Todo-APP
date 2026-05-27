import { addTask, toggleTask, deleteTask, editTaskText, clearCompleted, reorderTasks } from "./tasks.js";
import { elements } from "./elements.js";
import { render } from "./ui.js";
import { setFilter } from "./filters.js";
import { toggleTheme } from "./theme.js";
import { showToast } from "./toast.js";

export function configureAppEvents({ onThemeChange } = {}) {
  elements.taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = elements.input.value;
    const priority = elements.prioritySelect.value;

    if (addTask(text, priority)) {
      elements.input.value = "";
      elements.input.focus();
      render();
      return;
    }

    showToast("Insira uma tarefa válida antes de adicionar.", "error");
  });

  elements.filterContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;

    setFilter(button.dataset.filter);
    render();
  });

  elements.list.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const taskId = button.dataset.id;
    const action = button.dataset.action;

    if (action === "toggle") {
      toggleTask(taskId);
      showToast("Estado da tarefa atualizado.", "success");
      render();
    }

    if (action === "delete") {
      deleteTask(taskId);
      render();
    }
  });

  elements.clearCompletedBtn.addEventListener("click", () => {
    clearCompleted();
    render();
  });

  elements.list.addEventListener("focusin", (event) => {
    const taskText = event.target.closest(".task-title");
    if (!taskText) return;
    taskText.dataset.originalText = taskText.textContent;
  });

  elements.list.addEventListener(
    "blur",
    (event) => {
      const taskText = event.target.closest(".task-title");
      if (!taskText) return;

      const updatedText = taskText.textContent.trim();
      if (!updatedText) {
        taskText.textContent = taskText.dataset.originalText || "";
        showToast("Texto da tarefa não pode ficar vazio.", "error");
        return;
      }

      editTaskText(taskText.dataset.id, updatedText);
      render();
    },
    true,
  );

  elements.list.addEventListener("keydown", (event) => {
    const taskText = event.target.closest(".task-title");
    if (!taskText) return;

    if (event.key === "Enter") {
      event.preventDefault();
      taskText.blur();
    }

    if (event.key === "Escape") {
      taskText.textContent = taskText.dataset.originalText || "";
      taskText.blur();
    }
  });

  elements.themeToggle.addEventListener("click", () => {
    toggleTheme();
    onThemeChange?.();
  });
}
