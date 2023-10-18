import Utilities from "../utilities";
import Database from "../database";
import Modal from "../modal";
import Toastr from "../toastr";
import { ProjectUtilities } from "./project-utilities.js";



/**
 * Project Singleton
 * ...
 */
const Project = (() => {
    /***************
     * CONSTRUCTOR *
     ***************/


    // The state of the projects
    let _state;



    /* Project Related Elements */

    // Initialize the add project button elements
    const _add_project_button_els = [
        document.getElementById("add_project_button"),
        document.getElementById("mobile_add_project_button")
    ];

    // Initialize the edit project button element
    const _edit_project_button_el = document.getElementById("edit_project_button");

    // Initialize the delete project button element
    const _delete_project_button_el = document.getElementById("delete_project_button"); 

    // Initialize the sidenav project list elements
    const _sidenav_project_els = [
        document.getElementById("sidenav_projects"),
        document.getElementById("mobile_sidenav_projects")
    ];



    /* TODOs Related Elements */

    // Initialize the add todo button element
    const _todo_add_button_el = document.getElementById("todo_add_button");

    // Initialize the todos' container element
    const _todos_container_el = document.getElementById("todos_container");









    /*******************
     * PROJECT ACTIONS *
     *******************/




    /**
     * Deactivates all the existing projects.
     */
    const _deactivate_projects = () => {
        for (let key in _state) { _state[key].active = false }
    }





    /**
     * Activates a given project and updates the state in the db.
     * @param {*} project_id 
     */
    const _activate_project = (project_id) => {
        // Firstly, deactivate all projects
        _deactivate_projects();

        // Activate the given one and update the database
        _state[project_id].active = true;
        Database.save_state(_state);
    }



    



    /**
     * Creates a new project and adds it to the database.
     * @param {*} project_name 
     */
    const _create_project = (project_name) => {
        // Initialize the identifier
        const id = Utilities.generate_uuid();

        // Deactivate all the existing projects
        _deactivate_projects()

        // Add it to the state
        _state[id] = { id: id, name: project_name, active: true, todos: {} };

        // Save it
        Database.save_state(_state);
    }




    /**
     * Updates the project's name in the state and the db.
     * @param {*} id 
     * @param {*} project_name 
     */
    const _edit_project = (id, project_name) => {
        // Update the project properties
        _state[id].name = project_name;

        // Save it
        Database.save_state(_state);
    }





    /**
     * Triggers whenever the project form is submitted. It handles the creation or modification of
     * a project.
     * @param {*} e 
     * @param {*} control_values 
     * @param {*} project 
     */
    const _on_project_form_submission = (e, control_values, project) => {
        // Prevent the form from submitting
        e.preventDefault();

        // Handle the project action
        if (project) {
            _edit_project(project.id, control_values["name"]);
        } else {
            _create_project(control_values["name"]);
        }
    }






    /**
     * Deletes a project from the state and activates a different one.
     */
    const _delete_active_project = () => {
        // Ensure there is more than 1 project
        if (Object.keys(_state).length == 1) {
            Toastr.error("The app requires at least 1 project.");
            return;
        }

        // Retrieve the active project
        const active = ProjectUtilities.get_active_project(_state);

        // Ensure the active project does not have any todos
        if (Object.keys(active.todos).length > 0) {
            Toastr.error("Delete all the todos before removing the project.");
            return;
        }

        // Finally, delete the project and activate a different one
        delete _state[active.id];
        _activate_project(Object.keys(_state)[0]);
    }







    /**
     * Displays the project form which can handle the creation of the modification of a project.
     * @param {?} project 
     */
    const _display_project_form = (project = undefined) => {
        // Initialize the identifier of the form
        const form_id = "project_form";

        // Display the form
        Modal.show("Project", ProjectUtilities.build_project_form_html(form_id, project));

        // Initialize the form group instance
        const form_group = ProjectUtilities.build_project_form_group(form_id);

        // Subscribe to the form submission event and handle it
        form_group.el.addEventListener("submit", (e) => {
            // Trigger the action
            _on_project_form_submission(e, form_group.build_control_values(), project);

            // Finally, close the modal
            Modal.close();
        });
    }


    








    /****************
     * TODO ACTIONS *
     ****************/







    /**
     * Creates a new todo and adds it to the database.
     * @param {*} description 
     * @param {*} priority 
     */
    const _create_todo = (description, priority) => {
        // Initialize the active project
        const active_project = ProjectUtilities.get_active_project(_state);

        // Initialize the todo's identifier
        const todo_id = Utilities.generate_uuid();

        // Add it to the state
        _state[active_project.id].todos[todo_id] = { 
            id: todo_id, 
            description: description, 
            priority: priority,
            completed: false
        };

        // Save it
        Database.save_state(_state);
    }




    /**
     * Updates the todo in the state and the db.
     * @param {*} todo_id 
     * @param {*} description 
     * @param {*} priority 
     */
    const _edit_todo = (todo_id, description, priority) => {
        // Initialize the active project
        const active_project = ProjectUtilities.get_active_project(_state);

        // Update the todo's properties
        _state[active_project.id].todos[todo_id].description = description;
        _state[active_project.id].todos[todo_id].priority = priority;

        // Save it
        Database.save_state(_state);
    }






    /**
     * Triggers whenever the todo form is submitted. It handles the creation or modification of
     * a todo.
     * @param {*} e 
     * @param {*} control_values 
     * @param {*} todo 
     */
    const _on_todo_form_submission = (e, control_values, todo) => {
        // Prevent the form from submitting
        e.preventDefault();

        // Handle the todo action
        if (todo) {
            _edit_todo(todo.id, control_values["description"], control_values["priority"]);
        } else {
            _create_todo(control_values["description"], control_values["priority"]);
        }
    }










    /**
     * Displays the todo form which can handle the creation of the modification of a todo.
     * @param {?} todo 
     */
    const _display_todo_form = (todo = undefined) => {
        // Initialize the identifier of the form
        const form_id = "todo_form";

        // Display the form
        Modal.show("TODO", ProjectUtilities.build_todo_form_html(form_id, todo));

        // Initialize the form group instance
        const form_group = ProjectUtilities.build_todo_form_group(form_id);

        // Subscribe to the form submission event and handle it
        form_group.el.addEventListener("submit", (e) => {
            // Trigger the action
            _on_todo_form_submission(e, form_group.build_control_values(), todo);

            // Finally, close the modal
            Modal.close();
        });
    }




    /**
     * Deletes a todo from the db.
     * @param {*} id 
     */
    const _delete_todo = (id) => {
        // Initialize the active project
        const active_project = ProjectUtilities.get_active_project(_state);

        // Delete the todo from the state and update it
        delete _state[active_project.id].todos[id];
        Database.save_state(_state);
    }




    /**
     * Toggles the completed state for a given todo.
     * @param {*} id 
     */
    const _toggle_todo_state = (id) => {
        // Initialize the active project
        const active_project = ProjectUtilities.get_active_project(_state);

        // Toggle the completed state
        _state[active_project.id].todos[id].completed = !_state[active_project.id].todos[id].completed;
        Database.save_state(_state);
    }















    /********************
     * POST CONSTRUCTOR *
     ********************/



    /* State Initializer */

    // Initialize the state in case it hasn't been
    _state = Database.get_state();
    if (!_state) {
        _state = ProjectUtilities.build_default_state();
        Database.save_state(_state);
    }



    /* Project Event Listeners */

    // Subscribe to the add project buttons
    _add_project_button_els.forEach((el) => el.addEventListener("click", () => _display_project_form()));

    // Subscribe to the edit project buttons
    _edit_project_button_el.addEventListener("click", () => {
        _display_project_form(ProjectUtilities.get_active_project(_state))
    });

    // Subscribe to the delete project button
    _delete_project_button_el.addEventListener("click", _delete_active_project);

    // Subscribe to the sidenav project lists
    _sidenav_project_els.forEach((el) => el.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-project-id");
        if (id && _state[id]) _activate_project(id);
    }));




    /* TODO Event Listeners */


    // Subscribe to the add todo button events
    _todo_add_button_el.addEventListener("click", () => _display_todo_form())


    // Subscribe to the clicks within the todos container
    _todos_container_el.addEventListener("click", (e) => {
        // Extract the raw action from the custom attribute
        const raw_action = e.target.getAttribute("data-todo-action");

        // Only proceed if it is a valid string
        if (typeof raw_action == "string" && raw_action.length > 1) {
            // Init the action as well as the id
            const action = raw_action.split("_");

            // Handle it accordingly
            if (action[0] == "completed") {
                _toggle_todo_state(action[1]);
            } else if (action[0] == "edit") {
                const active_project = ProjectUtilities.get_active_project(_state);
                _display_todo_form(_state[active_project.id].todos[action[1]]);
            } else if (action[0] == "delete") {
                _delete_todo(action[1]);
            }
        }
    });








    /***********
     * EXPORTS *
     ***********/
    return {

    }
})();





/******************
 * MODULE EXPORTS *
 ******************/
export default Project;