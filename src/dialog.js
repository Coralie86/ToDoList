import {Project} from "./project.js"
import {Task} from "./task.js"
export {Dialog, DialogProject, DialogTask};

class Dialog {
    constructor(dialogSelector, formSelector, dialogButton, submitButton) {
        this.dialog = document.querySelector(dialogSelector);
        this.form = document.querySelector(formSelector);
        this.button_open = document.querySelector(dialogButton);
        this.submit = document.querySelector(submitButton);

        this.submit.addEventListener('click', (event) => this.submission(event));
        this.button_open.addEventListener("click", () => this.show());
        this.dialog.addEventListener('close', () => this.resetForm());
    }

    resetForm() {
        this.form.reset();
    }

    show() {
        this.dialog.showModal();
    }
    
    submission(event) {
        event.preventDefault();
        let form_data = new FormData(this.form);
        this.output = Object.fromEntries(form_data.entries());
        console.log(this.output);
        this.resetForm();
        setTimeout(() => {
            this.dialog.close(this.output); // Delay to let dialog load completely
        }, 200);
    }    
}

class DialogProject extends Dialog {
    constructor(dialogSelector, formSelector, dialogButton, submitButton) {
        super(dialogSelector, formSelector, dialogButton, submitButton);

        this.submit.addEventListener('click', (event) => this.createProject(event));
    }

    createProject(event) {
        event.preventDefault();
        new Project(this.output["project-name"]);
    }
}


class DialogTask extends Dialog {
    constructor(dialogSelector, formSelector, dialogButton, submitButton) {
        super(dialogSelector, formSelector, dialogButton, submitButton);
        this.mode = "create";
        this.editTaskId = null;

        this.submit.addEventListener('click', (event) => this.handleSubmit(event));
        
        if (this.button_open){
            this.button_open.addEventListener("click", () => {
                this.mode = "create";
                this.collectProject()
            });   
        }
    }

    appendTask(event) {
        event.preventDefault();
        new Task(this.output["task-title"], this.output["task-description"], this.output["task-dueDate"], this.output["task-priority"], this.output["task-status"], this.output["task-project"]);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.mode === "create") {
            this.appendTask(event);
        } else if (this.mode === "edit"){
            this.updateTask(event);
        }
    }

    updateTask(event) {
        event.preventDefault(event);
        const task = Task.instances_list.find(t => t.id === this.editTaskId);
        console.log(task);
        task.title = this.output["task-title"];
        task.description = this.output["task-description"];
        task.dueDate = this.output["task-dueDate"];
        task.priority = this.output["task-priority"];
        task.status = this.output["task-status"];
        task.project_name = this.output["task-project"];

        replaceTask(task);
        localStorage.setItem("instances_list", JSON.stringify(Task.instances_list));
    }
}

// Defining function to inject list of project in the dropdown of the dialog
const collectProject = {
    collectProject() {
        const task_project = document.querySelector("#task-project");
        let project_list = Array.from(document.querySelectorAll(".project-item"));
        for (let x of project_list) {
            if (!task_project.contains(document.getElementById("option-" + x.id))) {
                let option = document.createElement("option");
                option.id = "option-" + x.id;
                option.value = x.id;
                option.textContent = x.id;
                task_project.append(option);
            }
        }
    }
}

// Defining function to replace the task
function replaceTask(task) {
    const section = document.querySelector('#list');
    if (section.contains(document.getElementById("task_"+task.id))){
        const task_div = document.getElementById("task_"+task.id);
        let title = task_div.querySelector(".title");
        let due_date = task_div.querySelector(".due_date");
        let priority = task_div.querySelector(".priority");
        let status = task_div.querySelector(".status");
        let description = task_div.querySelector(".description");
        let project_name = task_div.querySelector(".project_name");

        title.textContent = task.title;
        due_date.textContent = task.dueDate;
        priority.textContent = task.priority;
        status.value = task.status;
        description.textContent = task.description;
        project_name.textContent = task.project_name;
    }
}

// add CollectProject to DialogTask class
Object.assign(DialogTask.prototype, collectProject);

