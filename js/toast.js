const toastContainer = document.getElementById("toastContainer");
const TOAST_DURATION = 3200;

function createToast(message, variant, action) {
  const toast = document.createElement("div");
  toast.className = `toast toast--${variant}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");

  const content = document.createElement("span");
  content.textContent = message;
  toast.appendChild(content);

  if (action?.label && typeof action.handler === "function") {
    const actionButton = document.createElement("button");
    actionButton.type = "button";
    actionButton.className = "toast-action button button-ghost";
    actionButton.textContent = action.label;
    actionButton.addEventListener("click", () => {
      action.handler();
      toast.remove();
    });
    toast.appendChild(actionButton);
  }

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "toast-close visually-hidden";
  closeButton.ariaLabel = "Fechar notificação";
  closeButton.textContent = "×";
  closeButton.addEventListener("click", () => toast.remove());
  toast.appendChild(closeButton);

  return toast;
}

export function showToast(message, type = "default", action = {}) {
  if (!toastContainer) return;

  const variant = ["success", "error"].includes(type) ? type : "default";
  const toast = createToast(message, variant, action);
  toastContainer.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, TOAST_DURATION);
}
