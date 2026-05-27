import { state } from "./state.js";
import { saveTasks } from "./storage.js";
import { showToast } from "./toast.js";

let lastDeletedTask = null;
let lastDeletedPosition = null;

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function persistTasks(tasks) {
  state.tasks = tasks;
  saveTasks(tasks);
}

export function addTask(text, priority = "medium") {
  const value = text?.trim();
  if (!value) {
    showToast("Digite uma tarefa válida antes de adicionar.", "error");
    return false;
  }

  const newTask = {
    id: generateId(),
    text: value,
    completed: false,
    priority,
    createdAt: new Date().toISOString(),
  };

  persistTasks([...state.tasks, newTask]);
  showToast("Tarefa adicionada com sucesso.", "success");
  return true;
}

export function editTaskText(id, newText) {
  const value = newText?.trim();
  if (!value) {
    return;
  }

  persistTasks(
    state.tasks.map((task) =>
      task.id === id ? { ...task, text: value } : task,
    ),
  );
}

export function toggleTask(id) {
  persistTasks(
    state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    ),
  );
}

export function deleteTask(id) {
  const index = state.tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return;
  }

  lastDeletedTask = state.tasks[index];
  lastDeletedPosition = index;
  persistTasks(state.tasks.filter((task) => task.id !== id));

  showToast("Tarefa removida.", "default", {
    label: "Desfazer",
    handler: restoreLastDeleted,
  });
}

export function restoreLastDeleted() {
  if (!lastDeletedTask) {
    return;
  }

  const nextTasks = [...state.tasks];
  const insertIndex = Math.min(lastDeletedPosition, nextTasks.length);
  nextTasks.splice(insertIndex, 0, lastDeletedTask);
  persistTasks(nextTasks);
  showToast("Tarefa restaurada.", "success");
  lastDeletedTask = null;
  lastDeletedPosition = null;
}

export function clearCompleted() {
  const completedTasks = state.tasks.filter((task) => task.completed);
  if (!completedTasks.length) {
    showToast("Não há tarefas concluídas para limpar.", "error");
    return;
  }

  persistTasks(state.tasks.filter((task) => !task.completed));
  showToast("Tarefas concluídas removidas.", "success");
}

export function reorderTasks(fromId, toId) {
  const fromIndex = state.tasks.findIndex((task) => task.id === fromId);
  const toIndex = state.tasks.findIndex((task) => task.id === toId);
  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return;
  }

  const updatedTasks = [...state.tasks];
  const [movedTask] = updatedTasks.splice(fromIndex, 1);
  updatedTasks.splice(toIndex, 0, movedTask);
  persistTasks(updatedTasks);
}
