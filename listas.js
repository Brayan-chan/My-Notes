function toggleNumberedList() {
  document.execCommand("insertOrderedList", false, null);
}

function toggleBulletList() {
  document.execCommand("insertUnorderedList", false, null);
}

function toggleTaskList() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const fragment = range.extractContents();

  const div = document.createElement("div");
  Array.from(fragment.childNodes).forEach((node) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.onclick = handleTaskCheckboxClick;
    div.appendChild(checkbox);
    div.appendChild(node.cloneNode(true));
    div.appendChild(document.createElement("br")); // Optional: Add a line break after each checkbox
  });

  range.deleteContents();
  range.insertNode(div);
}

function handleTaskCheckboxClick() {
  const li = this.parentNode;
  const textNode = li.childNodes[1];

  if (this.checked) {
    li.classList.add("task-done");
    textNode.style.textDecoration = "line-through";
    textNode.style.color = "#555";
    textNode.style.opacity = 0.7;
  } else {
    li.classList.remove("task-done");
    textNode.style.textDecoration = "none";
    textNode.style.color = "inherit";
    textNode.style.opacity = 1;
  }
}
