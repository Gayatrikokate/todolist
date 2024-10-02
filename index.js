let todoRootEl = document.getElementById("todoRoot");
let userinputEl = document.getElementById("userinput");

function getTodooflocalstorage() {
  let myTodolist = localStorage.getItem("myTodolist");

  if (myTodolist === null) {
    return [];
  }
  else {
    return JSON.parse(myTodolist);
  }
}

let todoList = getTodooflocalstorage();

function onStutesUpdate(titleId, checkBoxId) {
  let mylitle = document.getElementById(titleId);
  let myCheckBox = document.getElementById(checkBoxId);
  let findout = checkBoxId[checkBoxId.length - 1];

  for (let each of todoList) {
    if (each.id == findout) {
      each.ischecked = !each.ischecked; // Toggle ischecked
    }
  }

  if (myCheckBox.checked === true) {
    mylitle.classList.add("checked");
  } else {
    mylitle.classList.remove("checked");
  }
}

function ondeleteTodo(todoId) {
  // Find the index of the todo item to delete
  todoList = todoList.filter(todo => "todo" + todo.id !== todoId); // Remove from todoList

  // Update localStorage
  // Update localStorage
  // localStorage.setItem("myTodolist", JSON.stringify(todoList));

  // Remove from DOM
  let mytodo = document.getElementById(todoId);
  todoRootEl.removeChild(mytodo);
}

function createandAppendTodo(todo) {
  let checkBoxId = "checkbox" + todo.id;
  let titleId = "title" + todo.id;
  let todoId = "todo" + todo.id;

  let todoListEl = document.createElement("li");
  todoListEl.classList.add("todo-list-item");
  todoListEl.id = todoId;
  todoRootEl.appendChild(todoListEl);

  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.id = checkBoxId;
  checkboxEl.onclick = function () {
    onStutesUpdate(titleId, checkBoxId);
  };

  if (todo.ischecked) {
    checkboxEl.checked = true; // Correctly reference checkbox
  }
  todoListEl.appendChild(checkboxEl);

  let lebalEl = document.createElement("label");
  lebalEl.classList.add("labal-cont");
  lebalEl.htmlFor = checkBoxId;
  todoListEl.appendChild(lebalEl);

  let titleEl = document.createElement("h5");
  titleEl.textContent = todo.title;
  titleEl.id = titleId;
  if (todo.ischecked) {
    titleEl.classList.add("checked");
  }
  lebalEl.appendChild(titleEl);

  let deleteBtnEl = document.createElement("button");
  deleteBtnEl.classList.add("delete-btn");
  lebalEl.appendChild(deleteBtnEl);
  deleteBtnEl.onclick = function () {
    ondeleteTodo(todoId); // Reference the todoId
  };

  let deleteIconEl = document.createElement("i");
  deleteIconEl.classList.add("fa-solid", "fa-trash");
  deleteBtnEl.appendChild(deleteIconEl);
}

for (let each of todoList) {
  createandAppendTodo(each);
}

function onaddnewtodo() {
  const newTodo = {
    title: userinputEl.value,
    id: todoList.length + 1,
    ischecked: false,
  };
  createandAppendTodo(newTodo);
  todoList.push(newTodo);
  userinputEl.value = ""; // Clear input
  // onsavatodo(); // Save the new todo
}

function onsavatodo() {
  localStorage.setItem("myTodolist", JSON.stringify(todoList));
}
