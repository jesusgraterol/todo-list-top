import Utilities from "../utilities";
import Database from "../database";


/**
 * Project Singleton
 * ...
 */
const Project = (() => {
    /***************
     * CONSTRUCTOR *
     ***************/
























    /****************
     * MISC HELPERS *
     ****************/






    /**
     * Builds the default state in case it hasn't been initialized
     * @returns object
     */
    const _build_default_state = () => {
        // Generate a fresh uuid
        const uuid = Utilities.generate_uuid();

        // Build the default state object
        let default_state = {};
        default_state[uuid] = { 
            id: uuid,
            name: "Default Project",
            active: true,
            todos: []
        };

        // Finally, return it
        return default_state;
    }















    /********************
     * POST CONSTRUCTOR *
     ********************/



    // Initialize the state in case it hasn't been
    let _state = Database.get_state();
    if (!_state) {
        _state = _build_default_state();
        Database.save_state(_state);
    }









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