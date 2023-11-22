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

  const ul = document.createElement("ul");
  Array.from(fragment.childNodes).forEach((node) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.onclick = handleTaskCheckboxClick;
    li.appendChild(checkbox);
    li.appendChild(node.cloneNode(true));
    ul.appendChild(li);
  });

  range.deleteContents();
  range.insertNode(ul);
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
