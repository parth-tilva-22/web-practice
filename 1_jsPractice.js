class Task {
    constructor(title, taskText) {
        this.title = title;
        this.taskText = taskText;
    }
}

function onLoadAction() {
    showList();
}


function add(isEdit,i=-1) {

    if (typeof (Storage) !== "undefined") {
        let tList = [];
        if (localStorage.getItem("taskList") == null) {
            alert("this is first");
        } else {
            jsonStr = localStorage.getItem("taskList");  // array of tasks
            tList = JSON.parse(jsonStr)
        }

        let title = document.getElementById("task-title").value;
        let taskText = document.getElementById("task-text-area").value;

        let currentTask = new Task(title, taskText);

        if(i!=-1){
            tList.splice(i,1,currentTask);
        }else{
            tList.push(currentTask);
        }


        const json = JSON.stringify(tList);
        localStorage.setItem("taskList", json);

        closeDialog();

        showList();

    }
    else {
        alert("Sorry, your browser does not support Web Storage")
    }

}


function showList() {

    let title = "";
    let taskTxt = "";

    let jsonStr = localStorage.getItem("taskList");  // array of tasks
    console.log(jsonStr);

    let tList = JSON.parse(jsonStr);

    console.log(tList.length);

    document.getElementById("todo-list").innerHTML = "";


    let len = tList.length;

    for (let i = len - 1; i >= 0; i--) {

        title = tList[i].title;
        taskTxt = tList[i].taskText;

        let literal = `<div class="todo-items">
        <p id="todo-title">${title}</p>
        <p id="todo-text">
            ${taskTxt}
        </p>
        <div id="todo-action-container">
    
            <div id="todo-date">
                <i class="fa-solid fa-calendar-days"></i>
                <span>17-8-2022</span>
            </div>
    
            <div id="action">
    
                <div id="edit-task" onclick="editTask(this,${i})">
                    <i class="fa-solid fa-pen"></i>
                    <span>
                        Edit
                    </span>
    
                </div>
                <div id="delete-task" onclick="deleteTask(this,${i})">
                    <i class="fa-solid fa-xmark"></i>
                    <span>
                        Remove
                    </span>
    
                </div>
                <div id="complete-task" onclick="completeTask(this,${i})">
                    <i class="fa-solid fa-check"></i>
                    <span>
                        Complete
                    </span>
                </div>
            </div>
        </div>
    </div>`

        document.getElementById("todo-list").innerHTML += literal;

    }
}

function editTask(par,i){
    show(true,i);
    let jsonStr = localStorage.getItem("taskList");  // array of tasks
    let tList = JSON.parse(jsonStr);
    let title = document.getElementById("task-title").value=tList[i].title;
    let taskText = document.getElementById("task-text-area").value=tList[i].taskText;
}




function deleteTask(par,i) {

    let jsonStr = localStorage.getItem("taskList");  // array of tasks
    // console.log(jsonStr);

    let tList = JSON.parse(jsonStr);

    tList.splice(i,1);

    const json = JSON.stringify(tList);
    localStorage.setItem("taskList", json);
    showList();
    // alert("delete called");
    
}

function clear1() {
    document.getElementById("task-text-area").value = "";
    document.getElementById("task-title").value = "";



    
}

function closeDialog() {
    document.getElementById("dialog-box").style.display = "none";

}

function show(isEdit,i) {
    document.getElementById("dialog-box").style.display = "block";
    if(isEdit){
        document.getElementById("add-task-btn").innerHTML = "Save";
        document.getElementById("add-task-btn").setAttribute("onclick",`add(true,${i})`);
    }else{
        document.getElementById("add-task-btn").innerHTML = "Add";
        document.getElementById("add-task-btn").setAttribute("onclick",`add(true,${i})`);
    }
}


