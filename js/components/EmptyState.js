export function EmptyState() {
  const item = document.createElement("li");
  item.className = "empty-state";
  item.textContent = "Nenhuma tarefa ainda. Comece adicionando a primeira tarefa!";
  return item;
}
