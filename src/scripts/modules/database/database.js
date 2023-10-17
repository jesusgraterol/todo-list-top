import { BehaviorSubject } from "rxjs";


/**
 * Database Singleton
 * ...
 */
const Database = (() => {
    /***************
     * CONSTRUCTOR *
     ***************/



    // Initialize the state stream
    let _state = new BehaviorSubject(undefined);




    /**
     * Saves the current projects' state into the database.
     * @param {*} state 
     */
    const save_state = (state) => { 
        window.localStorage.setItem("projects", JSON.stringify(state));
        _state.next(state);
    }




    /**
     * Retrieves the current states' projects from the database.
     * @returns object
     */
    const get_state = () => { 
        // Retrieve the state
        const current_state = JSON.parse(window.localStorage.getItem("projects"));

        // If the state currently exists, broadcast it as the Project Module is being initialized
        if (current_state) _state.next(current_state);

        // Finally, return it
        return current_state;
    }





    /**
     * Clears all the data stored in the database.
     */
    const clear = () => { 
        window.localStorage.removeItem("projects");
        _state.next({});
    }








    /********************
     * POST CONSTRUCTOR *
     ********************/








    /***********
     * EXPORTS *
     ***********/
    return {
        get state() { return _state },
        save_state,
        get_state,
        clear
    }
})();






/******************
 * MODULE EXPORTS *
 ******************/
export default Database;