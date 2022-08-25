class Task {
    constructor(title, taskText) {
        this.title = title;
        this.taskText = taskText;
    }
}

function onLoadAction() {
    showList();
}


function add() {
    if (typeof (Storage) !== "undefined") {
        let tList = [];
        if (localStorage.getItem("taskList") == null) {
            alert("this is first");
        } else {
            //alert("this is not first");
            jsonStr = localStorage.getItem("taskList");  // array of tasks
            tList = JSON.parse(jsonStr)
        }

        let title = document.getElementById("task-title").value;
        let taskText = document.getElementById("task-text-area").value;

        let currentTask = new Task(title, taskText);


        // if(tasks.length==null){
        //     tasks
        // }else{
        //     tasks.push(currentTask);
        // }

        tList.push(currentTask);

        const json = JSON.stringify(tList);
        localStorage.setItem("taskList", json);

        closeDialog();

        showList();


        //alert(localStorage.getItem("taskList"));

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

    let tList = JSON.parse(jsonStr)

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
    
                <div id="edit-task" onclick="editTask(this)">
                    <i class="fa-solid fa-pen"></i>
                    <span>
                        Edit
                    </span>
    
                </div>
                <div id="delete-task" onclick="deleteTask(this)">
                    <i class="fa-solid fa-xmark"></i>
                    <span>
                        Remove
                    </span>
    
                </div>
                <div id="complete-task" onclick="completeTask(this)">
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


function deleteTask(par) {
    let todoItem = par.parentNode.parentNode.parentNode;
    let title = todoItem.getElementsByTagName("p")[0].value;
    

    let jsonStr = localStorage.getItem("taskList");  // array of tasks
    console.log(jsonStr);

    let tList = JSON.parse(jsonStr);


}

function clear1() {
    document.getElementById("task-text-area").innerText = "parth tilva";
    alert("clear  testing clicked");
}

function closeDialog() {
    // alert("close called");
    document.getElementById("dialog-box").style.display = "none";

}

function show() {
    document.getElementById("dialog-box").style.display = "block";
}


