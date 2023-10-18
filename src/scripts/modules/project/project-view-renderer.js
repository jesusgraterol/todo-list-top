import Database from "../database";
import { ProjectUtilities } from "./project-utilities.js";



const ProjectViewRenderer = (() => {
    /***************
     * CONSTRUCTOR *
     ***************/



    // Initialzie the active project title element
    const _sub_header_title_el = document.getElementById("sub_header_title");


    // Initialize the sidenav projects list elements
    const _sidenav_els = [
        document.getElementById("sidenav_projects"),
        document.getElementById("mobile_sidenav_projects")
    ];


    // Initialize the todos' container element
    const _todos_container_el = document.getElementById("todos_container");





    /*********************************
     * ACTIVE PROJECT NAME RENDERING *
     *********************************/



    /**
     * Sets the name of the active project in the sub header.
     * @param {*} name 
     */
    const _render_project_name_in_sub_header = (name) => { _sub_header_title_el.innerText = name }









    /**************************
     * PROJECT LIST RENDERING *
     **************************/




    /**
     * Builds the HTML Item for a single project.
     * @param {*} project 
     * @returns string
     */
    const _build_project_item_html = (project) => {
        return `
            <li>
                <button${project.active ? " disabled": ""} data-project-id="${project.id}">
                    <span class="truncate" data-project-id="${project.id}">${project.name}</span>
                    <span class="badge" data-project-id="${project.id}">${Object.keys(project.todos).length}</span>
                </button>
            </li>
        `;
    }




    /**
     * Builds the HTML Content for the project lists.
     * @param {*} projects 
     * @returns string
     */
    const _build_project_list_html = (projects) => {
        // Build the project items
        const items = projects.reduce((accum, current) => {
            accum += _build_project_item_html(current);
            return accum;
        }, "");

        // Finally, return the whole list
        return `<ul>${items}</ul>`;
    }





    /**
     * Renders the project list in both sidenav elements.
     * @param {*} projects 
     */
    const _render_project_list = (projects) => {
        // Build the HTML Content
        const list_content = _build_project_list_html(projects);

        // Insert it into the sidenavs
        _sidenav_els.forEach((el) => el.innerHTML = list_content);
    }










    /***********************
     * TODO LIST RENDERING *
     ***********************/





    /**
     * Builds the todo item's classes string.
     * @param {*} todo 
     * @returns string
     */
    const _get_todo_item_classes = (todo) => {
        return `todo-item priority-${todo.priority}${todo.completed ? " completed": ""}`;
    }



    /**
     * Builds the HTML item for a single todo.
     * @param {*} todo 
     * @returns string
     */
    const _build_todo_item_html = (todo) => {
        return `
            <div class="${_get_todo_item_classes(todo)}">
                <p data-todo-action="completed_${todo.id}">${todo.description}</p>
                <button><span class="md-icon" data-todo-action="edit_${todo.id}">edit</span></button>
                <button><span class="md-icon" data-todo-action="delete_${todo.id}">delete</span></button>
            </div>
        `;
    }




    /**
     * Builds the HTML Content for the todo list.
     * @param {*} new_state 
     * @returns string
     */
    const _build_todo_list_html = (new_state) => {
        // Initialize the active project
        const active_project = ProjectUtilities.get_active_project(new_state);

        // Initialize the list of todos within the project
        let todos = Object.values(active_project.todos);

        // Sort them by priority
        todos.sort((a, b) => Number(a.priority) - Number(b.priority));

        // Finally, build the HTML items and return them
        return todos.reduce((accum, current) => {
            accum += _build_todo_item_html(current);
            return accum;
        }, "");
    }



    
    /**
     * Renders the todo list for the active project
     * @param {*} new_state 
     */
    const _render_todo_list = (new_state) => {
        // Build the HTML Content
        const list_content = _build_todo_list_html(new_state);

        // Check if the empty message should be displayed
        if (list_content.length) {
            _todos_container_el.innerHTML = list_content;
        } else {
            _todos_container_el.innerHTML = `<p class="no-todos-found">No records were found</p>`;
        }
    }







    /************
     * RENDERER *
     ************/




    /**
     * Whenever the data changes, it renders the entire app.
     * @param {*} new_state 
     */
    const _render = (new_state) => {
        // Only proceed if the state has been initialized
        if (new_state) {
            // Put together the list of projects
            const projects = Object.values(new_state);

            // Initialize the active project
            const active = ProjectUtilities.get_active_project(new_state);

            // Set the name of the active project in the subheader
            _render_project_name_in_sub_header(active.name);
            
            // Render the project list
            _render_project_list(projects);

            // Render the todo list
            _render_todo_list(new_state);
        }
    }













    /********************
     * POST CONSTRUCTOR *
     ********************/




    // State Subscription
    Database.state.subscribe(_render);









    /***********
     * EXPORTS *
     ***********/
    return {

    }
})();






/******************
 * MODULE EXPORTS *
 ******************/
export { ProjectViewRenderer };