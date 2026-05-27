export function TaskItem(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  li.className = `task-item ${task.completed ? "completed" : ""}`.trim();

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task.text;
  text.contentEditable = true;

  const priority = document.createElement("span");
  priority.className = `priority ${task.priority}`;
  priority.textContent = task.priority;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const toggleBtn = document.createElement("button");
  toggleBtn.dataset.action = "toggle";
  toggleBtn.dataset.id = task.id;
  toggleBtn.textContent = task.completed ? "↺" : "✔";

  const deleteBtn = document.createElement("button");
  deleteBtn.dataset.action = "delete";
  deleteBtn.dataset.id = task.id;
  deleteBtn.textContent = "🗑";

  actions.append(toggleBtn, deleteBtn);
  li.append(text, priority, actions);

  return li;
}
