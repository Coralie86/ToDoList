export {Project, select};
import {Task} from "./task.js"
import trashBin from "./icons/trash-can-outline.svg"

class Project {
    static project_list = [];
    constructor(name) {
        this.name = name;
        this.displayProject();
        Project.project_list.push(this);
        localStorage.setItem("project_list", JSON.stringify(Project.project_list));
        this.div.addEventListener('click', () => this.select(this.div))
    }

    displayProject() {
        const section = document.querySelector('#project-items');
        if (!section.contains(document.getElementById(this.name))){
            const container = document.createElement("div");
            container.classList.add("container-prj");

            this.div = document.createElement("div");
            this.div.id = this.name;
            this.div.textContent = this.name;
            this.div.classList.add("project-item");

            const bin = document.createElement("img");
            bin.classList.add("trash-bin");
            bin.src = trashBin;
            bin.addEventListener('click', (e) => this.deleteProject());

            container.appendChild(this.div);
            container.appendChild(bin);

            section.appendChild(container);
        } 
    }

    deleteProject() {
        for (let x of Project.project_list) {
            if (x.name === this.div.id){
                let index = Project.project_list.indexOf(x);
                Project.project_list.splice(index,1);
                localStorage.setItem("project_list", JSON.stringify(Project.project_list));
                this.div.parentElement.remove();
                for (let t of Task.instances_list.slice().reverse()){
                    if(t.project_name === x.name){
                        let index_task = Task.instances_list.indexOf(t);
                        Task.instances_list.splice(index_task,1);
                        localStorage.setItem("instances_list", JSON.stringify(Task.instances_list));
                        document.querySelector("#task_"+t.id).remove();
                    }
                }
            }
            
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
