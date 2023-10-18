import Database from "../database";




const ViewManager = (() => {
    /***************
     * CONSTRUCTOR *
     ***************/



    // Active Project title
    const _sub_header_title_el = document.getElementById("sub_header_title");


    // Sidenav Projects List
    const _sidenav_els = [
        document.getElementById("sidenav_projects"),
        document.getElementById("mobile_sidenav_projects")
    ];







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
                    <span class="badge" data-project-id="${project.id}">${project.todos.length}</span>
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
            const active = projects.find((project) => project.active);

            // Set the name of the active project in the subheader
            _render_project_name_in_sub_header(active.name);
            
            // Render the project list
            _render_project_list(projects);
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
export default ViewManager;