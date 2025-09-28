export {Project, select};
import {Task} from "./task.js"

class Project {
    constructor(name) {
        this.name = name;
        this.displayProject();
        this.div.addEventListener('click', () => this.select(this.div))
    }

    displayProject() {
        const section = document.querySelector('#project-items');
        if (!section.contains(document.getElementById(this.name))){
            this.div = document.createElement("div");
            this.div.id = this.name;
            this.div.textContent = this.name;
            this.div.classList.add("project-item");
            section.appendChild(this.div);
        } 
    }
}

// Definition of select function
const select =  {
    select(division) {
        let selected_div = document.querySelector('[selected="yes"]');
        selected_div.setAttribute("selected", "no");
        division.setAttribute("selected", "yes");

        const title_selection = document.querySelector('#project-selected');
        // console.log(title_selection);
        title_selection.textContent = division.textContent.toUpperCase();

        filterTask(division.id);
}}

// Defintion filter list of task according project selected
function filterTask(project) {    
    let task_list = Task.instances_list;
    for (let x of task_list) {
        let div = document.getElementById("task_" + x.id);
        if (project === "All"){
            div.style.display = "grid";
        } else {
            div.style.display = "grid";
            if (x.project_name != project){
            div.style.display = "none";
            }
        }        
    }
}

// add select to Project class
Object.assign(Project.prototype, select);

// add select to All div
document.querySelector("#All").addEventListener('click', (e) => {
    select.select(e.target);
    }
)
