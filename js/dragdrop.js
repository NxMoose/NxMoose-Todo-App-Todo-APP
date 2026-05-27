import { elements } from "./elements.js";
import { reorderTasks } from "./tasks.js";
import { render } from "./ui.js";

let draggedId = null;

export function initializeDragDrop() {
  elements.list.addEventListener("dragstart", (event) => {
    const item = event.target.closest(".task-item");
    if (!item) return;
    draggedId = item.dataset.id;
    item.classList.add("dragging");
    event.dataTransfer?.setData("text/plain", draggedId);
    event.dataTransfer?.setDragImage(item, 16, 16);
  });

  elements.list.addEventListener("dragend", (event) => {
    const item = event.target.closest(".task-item");
    if (!item) return;
    item.classList.remove("dragging");
    draggedId = null;
  });

  elements.list.addEventListener("dragover", (event) => {
    event.preventDefault();
    const item = event.target.closest(".task-item");
    if (!item || item.dataset.id === draggedId) return;
    item.classList.add("drag-over");
  });

  elements.list.addEventListener("dragleave", (event) => {
    const item = event.target.closest(".task-item");
    item?.classList.remove("drag-over");
  });

  elements.list.addEventListener("drop", (event) => {
    event.preventDefault();
    const target = event.target.closest(".task-item");
    if (!target || !draggedId) return;
    target.classList.remove("drag-over");
    reorderTasks(draggedId, target.dataset.id);
    render();
  });
}
