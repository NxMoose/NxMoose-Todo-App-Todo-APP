export function createFilterButton(filter, label) {
  const button = document.createElement("button");
  button.dataset.filter = filter;
  button.textContent = label;
  return button;
}
