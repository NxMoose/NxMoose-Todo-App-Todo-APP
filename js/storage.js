export function saveTasks(tasks) {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Erro ao salvar tarefas:", error);
  }
}

export function loadTasks() {
  try {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
    return [];
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    console.error("Erro ao salvar tema:", error);
  }
}

export function loadTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    console.error("Erro ao carregar tema:", error);
    return null;
  }
}
