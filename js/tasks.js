import { state } from "./state.js";
import { saveTasks } from "./storage.js";

function generateId() {
  return Date.now();
}

export function addTask(text, priority = "medium") {
  if (!text || !text.trim()) {
    alert("Por favor, digite uma tarefa válida!");
    return false;
  }

  const newTask = {
    id: generateId(),
    text: text.trim(),
    completed: false,
    priority,
    createdAt: new Date().toISOString(),
  };

  state.tasks.push(newTask);
  saveTasks(state.tasks);
  return true;
}

export function editTaskText(id, newText) {
  const taskId = Number(id);
  if (!newText || !newText.trim()) {
    return;
  }

  state.tasks = state.tasks.map((task) =>
    task.id === taskId ? { ...task, text: newText.trim() } : task,
  );
  saveTasks(state.tasks);
}

export function toggleTask(id) {
  const taskId = Number(id);
  state.tasks = state.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task,
  );
  saveTasks(state.tasks);
}

export function deleteTask(id) {
  const taskId = Number(id);
  if (!confirm("Tem certeza que deseja excluir esta tarefa?")) {
    return false;
  }

  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  saveTasks(state.tasks);
  return true;
}

export function reorderTasks(fromId, toId) {
  const sourceId = Number(fromId);
  const targetId = Number(toId);
  const fromIndex = state.tasks.findIndex((task) => task.id === sourceId);
  const toIndex = state.tasks.findIndex((task) => task.id === targetId);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return;
  }

  const [movedTask] = state.tasks.splice(fromIndex, 1);
  state.tasks.splice(toIndex, 0, movedTask);
  saveTasks(state.tasks);
}

export function clearCompleted() {
  if (!confirm("Tem certeza que deseja excluir todas as tarefas concluídas?")) {
    return;
  }

  state.tasks = state.tasks.filter((task) => !task.completed);
  saveTasks(state.tasks);
}
