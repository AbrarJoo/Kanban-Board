
let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];

let draggedElement = null;

function addTask(title, desc, column) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
    `;

  column.appendChild(div);

  div.addEventListener("dragstart", () => {
    draggedElement = div;
  });

  // Delete button
  div.querySelector("button").addEventListener("click", () => {
    div.remove();
    updateTaskCount();
    localStorage.setItem("tasks", JSON.stringify(tasksData));
  });
}

function updateTaskCount() {
  columns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    tasksData[col.id] = Array.from(tasks).map((t) => {
      return {
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText,
      };
    });

    count.innerText = tasks.length;
  });
}

// Restore tasks
if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));

  for (const col in data) {
    const column = document.querySelector(`#${col}`);

    data[col].forEach((task) => {
      addTask(task.title, task.desc, column);
    });
  }
}

updateTaskCount();

function addDragEventsOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();

    if (!draggedElement) return;

    column.appendChild(draggedElement);
    column.classList.remove("hover-over");

    updateTaskCount();
    localStorage.setItem("tasks", JSON.stringify(tasksData));
  });
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

// Modal logic
const toggleModalBtn = document.querySelector("#toggle-modal");
const modalbg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskBtn = document.querySelector("#add-new-task");

toggleModalBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalbg.addEventListener("click", () => {
  modal.classList.remove("active");
});

addTaskBtn.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title-input").value;
  const taskDesc = document.querySelector("#task-description-input").value;

  addTask(taskTitle, taskDesc, todo);

  updateTaskCount();
  localStorage.setItem("tasks", JSON.stringify(tasksData));

  modal.classList.remove("active");
});