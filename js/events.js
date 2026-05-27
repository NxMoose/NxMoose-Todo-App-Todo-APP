import { toggleTask, deleteTask, editTaskText, reorderTasks } from "./tasks.js";
import { elements } from "./elements.js";
import { render } from "./ui.js";

export function setupEventDelegation() {
  // ======================
  // CLICK
  // ======================
  elements.list.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) {
      const id = button.dataset.id;
      const action = button.dataset.action;

      if (action === "toggle") {
        toggleTask(id);
        render();
      }

      if (action === "delete") {
        if (deleteTask(id)) {
          render();
        }
      }

      return;
    }

    const taskText = event.target.closest(".task-text");
    if (!taskText) return;

    const id = taskText.dataset.id;
    toggleTask(id);
    render();
  });

  // ======================
  // EDIÇÃO
  // ======================
  elements.list.addEventListener(
    "blur",
    (event) => {
      const taskText = event.target.closest(".task-text");
      if (!taskText) return;
      editTaskText(taskText.dataset.id, taskText.textContent);
      render();
    },
    true,
  );

  // ======================
  // ENTER
  // ======================
  elements.list.addEventListener("keydown", (event) => {
    const taskText = event.target.closest(".task-text");
    if (!taskText) return;
    if (event.key === "Enter") {
      event.preventDefault();
      taskText.blur();
    }
  });
}

export function setupDragDelegation() {
  let draggedItem = null;

  // ======================
  // DRAG START
  // ======================
  elements.list.addEventListener("dragstart", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    draggedItem = li;
    li.classList.add("dragging");
  });

  // ======================
  // DRAG END
  // ======================
  elements.list.addEventListener("dragend", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    li.classList.remove("dragging");
  });

  // ======================
  // DRAG OVER
  // ======================
  elements.list.addEventListener("dragover", (event) => {
    event.preventDefault();
    const li = event.target.closest("li");
    if (!li || li === draggedItem) return;
    li.classList.add("drag-over");
  });

  // ======================
  // DRAG LEAVE
  // ======================
  elements.list.addEventListener("dragleave", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    li.classList.remove("drag-over");
  });

  // ======================
  // DROP
  // ======================
  elements.list.addEventListener("drop", (event) => {
    event.preventDefault();
    const targetLi = event.target.closest("li");
    if (!targetLi || !draggedItem) return;

    targetLi.classList.remove("drag-over");

    const fromId = draggedItem.dataset.id;
    const toId = targetLi.dataset.id;

    reorderTasks(fromId, toId);
    render();
  });
}
