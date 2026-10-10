const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

let draggedElement = null;

const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    draggedElement = task;
  });
});

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

    column.appendChild(draggedElement);
    column.classList.remove("hover-over");
  });
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

//modal logic
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

  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `<h2>${taskTitle}</h2>
            <p>${taskDesc}</p>
            <button>Delete</button>`;

  todo.appendChild(div);
  div.addEventListener("drag",()=>{
    draggedElement=div;
  })
  modal.classList.remove("active");
});
