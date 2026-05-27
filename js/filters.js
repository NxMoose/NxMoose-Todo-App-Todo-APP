import { state } from "./state.js";

export function getFilteredTasks() {
  switch (state.filter) {
    case "active":
      return state.tasks.filter((task) => !task.completed);
    case "completed":
      return state.tasks.filter((task) => task.completed);
    default:
      return state.tasks;
  }
}

export function setFilter(filter) {
  state.filter = filter;
  return filter;
}
