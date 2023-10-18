import Utilities from "../utilities";
import { FormGroup } from "../form";




/**
 * ProjectUtilities Singleton
 * ...
 */
const ProjectUtilities = (() => {
    /***************
     * CONSTRUCTOR *
     ***************/






    /**************
     * RETRIEVERS *
     **************/




    /**
     * Retrieves the active project based on the current state.
     * @param {*} state 
     * @returns object
     */
    const get_active_project = (state) => Object.values(state).find((project) => project.active);












    /****************
     * PROJECT FORM *
     ****************/





    /**
     * Builds the project form's HTML content.
     * @param {*} form_id 
     * @param {?} project 
     * @returns 
     */
    const build_project_form_html = (form_id, project = undefined) => {
        const default_value = project ? project.name: "";
        return `
            <div class="form">
                <form id="${form_id}" novalidate>
                    <div class="form-row">
                        <div class="form-control">
                            <label for="name" id="name_label">Name*
                                <input type="text" name="name" id="name" value="${default_value}" autofocus>
                            </label>
                            <p id="name_error" class="error">
                                <span class="md-icon">error</span> Enter a valid name
                            </p>
                        </div>
                    </div>
                    <button type="submit" id="${form_id}_submit_button" disabled>SUBMIT</button>
                </form>
            </div>
        `;
    }





    /**
     * Builds the FormGroup Instance for a Project.
     * @param {*} form_id 
     * @returns FormGroup
     */
    const build_project_form_group = (form_id) => {
        return FormGroup(form_id, [
            {
                id: "name", 
                validate_function: (control_values) => {
                    return  typeof control_values["name"] == "string" && 
                            control_values["name"].length >= 2 && 
                            control_values["name"].length <= 30;
                }
            }
        ]);
    }










    /*************
     * TODO FORM *
     *************/





    /**
     * Builds the todo form's HTML content.
     * @param {*} form_id 
     * @param {?} todo 
     * @returns 
     */
    const build_todo_form_html = (form_id, todo = undefined) => {
        const active_priority = todo ? todo.priority: "1";
        return `
            <div class="form">
                <form id="${form_id}" novalidate>
                    <div class="form-row">
                        <div class="form-control">
                            <label for="description" id="description_label">Description*
                                <textarea name="description" id="description" autofocus>${todo ? todo.description: ""}</textarea>
                            </label>
                            <p id="description_error" class="error">
                                <span class="md-icon">error</span> Enter a valid description
                            </p>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-control">
                            <label for="priority" id="priority_label">Priority*
                                <select name="priority" id="priority">
                                    <option value="1" ${active_priority == '1' ? 'selected': ''}>First Priority</option>
                                    <option value="2" ${active_priority == '2' ? 'selected': ''}>Second Priority</option>
                                    <option value="3" ${active_priority == '3' ? 'selected': ''}>Third Priority</option>
                                </select>
                            </label>
                            <p id="priority_error" class="error">
                                <span class="md-icon">error</span> Enter a valid priority
                            </p>
                        </div>
                    </div>
                    <button type="submit" id="${form_id}_submit_button" disabled>SUBMIT</button>
                </form>
            </div>
        `;
    }







    /**
     * Builds the FormGroup Instance for a TODO.
     * @param {*} form_id 
     * @returns FormGroup
     */
    const build_todo_form_group = (form_id) => {
        return FormGroup(form_id, [
            {
                id: "description", 
                validate_function: (control_values) => {
                    return  typeof control_values["description"] == "string" && 
                            control_values["description"].length >= 3 && 
                            control_values["description"].length <= 200;
                }
            },
            {
                id: "priority", 
                validate_function: (control_values) => {
                    return  typeof control_values["priority"] == "string" && 
                            (
                                control_values["priority"] == "1" ||
                                control_values["priority"] == "2" ||
                                control_values["priority"] == "3"
                            )
                }
            }
        ]);
    }










    /****************
     * MISC HELPERS *
     ****************/






    /**
     * Builds the default state in case it hasn't been initialized
     * @returns object
     */
    const build_default_state = () => {
        // Generate a fresh uuid
        const uuid = Utilities.generate_uuid();

        // Build the default state object
        let default_state = {};
        default_state[uuid] = { 
            id: uuid,
            name: "Default Project",
            active: true,
            todos: {}
        };

        // Finally, return it
        return default_state;
    }




















    /********************
     * POST CONSTRUCTOR *
     ********************/











    /***********
     * EXPORTS *
     ***********/
    return {
        // Retrievers
        get_active_project,

        // Project Form
        build_project_form_html,
        build_project_form_group,

        // TODO Form
        build_todo_form_html,
        build_todo_form_group,

        // Misc Helpers
        build_default_state,
    }
})();





/******************
 * MODULE EXPORTS *
 ******************/
export { ProjectUtilities };