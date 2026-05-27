const priorityLabels = {
  high: "Alta",
  medium: "Média",
  low: "Baixa",
};

function createActionButton(action, id, label, variant) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `task-action task-action--${variant}`;
  button.dataset.action = action;
  button.dataset.id = id;
  button.setAttribute("aria-label", label);
  button.textContent = variant === "delete" ? "🗑" : "✔";
  return button;
}

export function TaskItem(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  li.className = `task-item${task.completed ? " completed" : ""}`;
  li.draggable = true;
  li.setAttribute("aria-describedby", `priority-${task.id}`);

  const taskMain = document.createElement("div");
  taskMain.className = "task-main";

  const title = document.createElement("span");
  title.className = "task-title";
  title.textContent = task.text;
  title.contentEditable = true;
  title.spellcheck = false;
  title.dataset.id = task.id;
  title.setAttribute("role", "textbox");
  title.setAttribute("aria-label", "Editar tarefa");
  title.setAttribute("tabindex", "0");

  const taskMeta = document.createElement("div");
  taskMeta.className = "task-meta";

  const priority = document.createElement("span");
  priority.id = `priority-${task.id}`;
  priority.className = `priority-pill priority-${task.priority}`;
  priority.textContent = priorityLabels[task.priority] || "Média";

  taskMeta.append(priority);
  taskMain.append(title, taskMeta);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  actions.append(
    createActionButton(
      "toggle",
      task.id,
      task.completed ? "Marcar como pendente" : "Marcar como concluída",
      "toggle",
    ),
    createActionButton("delete", task.id, "Excluir tarefa", "delete"),
  );

  li.append(taskMain, actions);
  return li;
}
