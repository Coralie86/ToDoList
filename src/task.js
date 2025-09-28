export {Task, addTask, addTask_assign}
import {DialogTask} from "./dialog.js"
import {dialog_task} from "./index.js"


class Task {
    static instances_list  = [];
    constructor(title, description, dueDate, priority, status, project_name, id = null){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.project_name = project_name;
        this.id = id == null ? crypto.randomUUID(): id;

        this.createTask();
        Task.instances_list.push(this);
        localStorage.setItem("instances_list", JSON.stringify(Task.instances_list));
    }
    createTask() {
        // populateStorage(this);
        const section = document.querySelector('#list');
        section.appendChild(addTask(this));
        }
}


function addTask(task) {
    const section = document.querySelector('#list');
    if (!section.contains(document.getElementById("task_"+task.id))){
        const div = document.createElement("div");
        div.classList.add('list_items');
        div.setAttribute("task_id", task.id);
        div.id = "task_" + task.id;
        
        let title_text = document.createElement("h3");
        title_text.classList.add('title');
        title_text.textContent = task.title;

        let due_date = document.createElement("h4");
        due_date.classList.add('due_date');
        due_date.textContent = task.dueDate;

        let priority = document.createElement("h4");
        priority.classList.add('priority');
        priority.textContent = task.priority;

        let description = document.createElement("p");
        description.classList.add('description');
        description.textContent = task.description;

        let div_interaction = document.createElement("div");
        div_interaction.classList.add('interaction');

        let status_dropdown = document.createElement("select");
        status_dropdown.classList.add('status');
        let option_new = document.createElement("option");
        option_new.value = "New";
        option_new.textContent = "New";
        status_dropdown.appendChild(option_new);
        let option_inProgress = document.createElement("option");
        option_inProgress.value = "In Progress";
        option_inProgress.textContent = "In Progress";
        status_dropdown.appendChild(option_inProgress);
        let option_closed = document.createElement("option");
        option_closed.value = "Closed";
        option_closed.textContent = "Closed";
        status_dropdown.appendChild(option_closed);
        status_dropdown.value = task.status;
        status_dropdown.addEventListener('change', function() {
            task.status = this.value;
            localStorage.setItem("instances_list", JSON.stringify(Task.instances_list));
        })

        div_interaction.appendChild(status_dropdown);

        let project_name = document.createElement("p");
        project_name.classList.add('project_name');
        project_name.textContent = task.project_name;

        let div_btn = document.createElement("div");
        div_btn.id = "EditDelete";

        let edit_btn = document.createElement("button");
        edit_btn.textContent = "Edit";
        edit_btn.id = "edit_" + task.id;
        edit_btn.setAttribute("task_id", task.id);
        edit_btn.addEventListener('click', function(e){
            let taskId = e.target.getAttribute("task_id");
            dialog_task.mode = "edit";
            dialog_task.collectProject();
            dialog_task.editTaskId = taskId;
            fillTask(e);
            dialog_task.show();
        })
        div_btn.appendChild(edit_btn);

        let delete_btn = document.createElement("button");
        delete_btn.textContent = "Delete";
        delete_btn.setAttribute("task_id", task.id);
        delete_btn.addEventListener('click', function(e){
            deleteTask(e);
        })
        div_btn.appendChild(delete_btn);
        div_interaction.appendChild(div_btn);

        div.appendChild(title_text);
        div.appendChild(due_date);
        div.appendChild(priority);
        div.appendChild(description);
        div.appendChild(div_interaction);
        div.appendChild(project_name);     

        return div;
    }
}

const addTask_assign = {addTask_assign(task) {
    addTask(task);
}}

function deleteTask(btn) {
    let div_to_be_deleted = document.getElementById('task_'+ btn.target.getAttribute("task_id"));
    div_to_be_deleted.remove();
    for (let x of Task.instances_list) {
        if (x.id === btn.target.getAttribute("task_id")){
            let index = Task.instances_list.indexOf(x);
            localStorage.removeItem("task_"+x.id);
            Task.instances_list.splice(index,1);
            localStorage.setItem("instances_list", JSON.stringify(Task.instances_list));
        }
    }
}

function fillTask(btn) {
    let id_target = btn.target.getAttribute("task_id");
    let task = {};
    for (let x of Task.instances_list){
        if(x.id === id_target){
            task = x;
        }
    }
    document.querySelector("#task-project").value = task.project_name;
    document.querySelector("#task-title").value = task.title;
    document.querySelector("#task-description").value = task.description;
    document.querySelector("#task-dueDate").value = task.dueDate;
    document.querySelector("#task-priority").value = task.priority;
    document.querySelector("#task-status").value = task.status;

}

function populateStorage(task){
    task.createTask = task.createTask.toString();
    localStorage.setItem("task_"+task.id, JSON.stringify(task));
}