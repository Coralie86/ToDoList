import "./styles.css";
import {Project, select} from "./project.js"
import {Dialog, DialogProject, DialogTask} from "./dialog.js";
import {Task, addTask} from "./task.js";
export {dialog_task}

const test = new Project("test");
// const task = new Task("title", "description", "dueDate", "priority", "In Progress", "project_name")
const dialog = new DialogProject("#form-dialog", "#project-form", "#project-div","#submit")
const dialog_task = new DialogTask("#form-dialog-task", "#task-form", "#addTask","#submit-task")

if(localStorage.length != 0){
    const section = document.querySelector('#list');
    const instances_list = JSON.parse(localStorage.getItem("instances_list"));
    for (let x of instances_list) {
        let task = new Task(x.title, x.description, x.dueDate, x.priority, x.status, x.project_name, x.id);
    }
}

