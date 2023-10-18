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
    ]














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
        _state[id] = { id: id, name: project_name, active: true, todos: [] };

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
        if (active.todos.length > 1) {
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