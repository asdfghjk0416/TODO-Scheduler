const socket = io.connect("http://localhost:8080", {transports: ['websocket']});

socket.on('all_tasks', displayTasks);
socket.on('message', displayMessage);

function displayMessage(newMessage) {
    document.getElementById("message").innerHTML = newMessage;
}

function displayTasks(tasksJSON) {
    const tasks = JSON.parse(tasksJSON);
    let formattedTasks = "";
    for (const task of tasks) {
        formattedTasks += "<hr/>";
        formattedTasks += "<b>" + task['title'] + "</b> - " + task['description'] + "</b> - " + task['dueDate'] + "<br/>";
        formattedTasks += "<button onclick='completeTask(\"" + task['id'] + "\")'>Task Complete</button>";
    }
    document.getElementById("tasks").innerHTML = formattedTasks;
}


function addTask() {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let dueDate = document.getElementById("dueDate").value;
 //   let now = document.getElementById("timeCreated").values
    socket.emit("add_task", JSON.stringify({"title": title, "description": desc,"dueDate":dueDate}));
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("dueDate").value = "";
 //   document.getElementById("now").value = "";
}

function completeTask(taskId) {
    socket.emit("complete_task", taskId);
}
