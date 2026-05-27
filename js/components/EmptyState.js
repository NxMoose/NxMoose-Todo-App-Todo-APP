export function EmptyState() {
  const empty = document.createElement("p");
  empty.className = "empty";
  empty.textContent = "Nenhuma tarefa ainda 🚀";
  return empty;
}
