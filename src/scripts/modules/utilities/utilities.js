import { v4 as uuidv4 } from "uuid";


/**
 * Utilities Module
 * ...
 */
const Utilities = (() => {
    /***************
     * CONSTRUCTOR *
     ***************/



    


    




    /**
     * Extracts the error message based on the received type. If no error is extracted, returns a
     * generic message.
     * @param error 
     * @returns string
     */
    const get_error_message = (error) => {
        // If the error is a string, return it right away
        if (typeof error == "string") { return error }

        // If the error is an object, attempt to extract the message, otherwise stringify the object
        else if (error && typeof error == "object") {
            if      (typeof error.message == "string")  { return error.message }
            else if (typeof error.msg == "string")      { return error.msg }
            else                                        { return JSON.stringify(error) }
        } 
        
        // Return a generic message if the given argument has an invalid format
        else { 
            console.log(error);
            return `Unknown Error: ${typeof error}`;
        }
    }









    /**
     * Generates a universally unique identifier.
     * @returns string
     */
    const generate_uuid = () => { return uuidv4() }










    /********************
     * POST CONSTRUCTOR *
     ********************/









    /***********
     * EXPORTS *
     ***********/
    return {
        get_error_message,
        generate_uuid
    }
})();







/******************
 * MODULE EXPORTS *
 ******************/
export default Utilities;