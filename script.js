const TaskInput = document.getElementById('task-input');
const EventDate = document.getElementById('event-date');
const Button = document.querySelector('.primaryBtn');
const upcomingEvent = document.getElementById('UpcomingList');
const Events = document.getElementById('EventsList');
const CompletedEvent = document.getElementById('Completed');

//saving  into the localstorage
function saveTasks() {
    localStorage.setItem("UpcomingTasks", upcomingEvent.innerHTML);
    localStorage.setItem("Eventsongoing", Events.innerHTML);
    localStorage.setItem("completedTasks", CompletedEvent.innerHTML);
}
//Loading into localstorage
function loadTask() {
    upcomingEvent.innerHTML = localStorage.getItem("UpcomingTasks") || "";
    Events.innerHTML = localStorage.getItem("Eventsongoing") || "";
    CompletedEvent.innerHTML = localStorage.getItem("completedTasks") || "";

    //reattach to local storage when reloaded
    reattachListeners(upcomingEvent);
    reattachListeners(Events);
    reattachListeners(CompletedEvent);

}

function reattachListeners(list) {

    list.querySelectorAll(".move-to-events").forEach(btn => {
        btn.addEventListener("click", () => {
            Events.appendChild(btn.closest("li"));
            saveTasks();
        });
    });
    list.querySelectorAll(".mark-complete").forEach(btn => {
        btn.addEventListener("click", () => {
            CompletedEvent.appendChild(btn.closest("li"));
            saveTasks();
        });
    });
    list.querySelectorAll(".delete").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest("li").remove();
            saveTasks();
        });

    });
}


Button.addEventListener("click", () => {
    const taskText = TaskInput.value.trim();
    const taskDate = EventDate.value;

    if (taskText === "" || taskDate === "") {
        alert("Please enter both task and date.");
        return;

    }
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    // Example inside your Add Task logic
    li.innerHTML = `
  <span>${taskText} <br><small>${taskDate}</small></span>
  <div>
    <button class="btn btn-sm btn-info move-to-events">📅</button>
    <button class="btn btn-sm btn-success mark-complete">✅</button>
    <button class="btn btn-sm btn-danger delete">🗑️</button>
  </div>
`;

    upcomingEvent.appendChild(li);
    TaskInput.value = "";
    EventDate.value = "";



    // Move to Events
    li.querySelector(".move-to-events").addEventListener("click", () => {
        Events.appendChild(li);
        saveTasks();
    });

    //Completed
    li.querySelector(".mark-complete").addEventListener("click", () => {
        CompletedEvent.appendChild(li);
        saveTasks();
    })
    // removing
    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        saveTasks();
    })
    saveTasks();
});

window.onload = loadTask;
