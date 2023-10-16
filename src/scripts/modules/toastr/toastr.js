import Utilities from "../utilities";


/**
 * Toastr Module
 * ...
 */
const Toastr = (() => {
    /***************
     * CONSTRUCTOR *
     ***************/


    // Initialize the main element
    const _el = document.getElementById("toastr");

    // Initialize the main element
    const _icon_el = document.getElementById("toastr_icon");
    
    // Initialize the main element
    const _text_el = document.getElementById("toastr_text");

    



    /*************
     * DISPLAYER *
     *************/



    /**
     * Handles the display of a toastr for a given duration. Once it completes, it hides the toastr
     * and resets the toastr's class.
     * @param {*} class_name 
     * @param {*} icon_name 
     * @param {*} message 
     * @param {?} duration_seconds 
     */
    const _display = (class_name, icon_name, message, duration_seconds = 6) => {
        _el.classList.add(class_name);
        _icon_el.innerText = icon_name;
        _text_el.innerText = message;
        _el.style.visibility = "visible";
        setTimeout(() => { 
            _el.style.visibility = "hidden";
            _el.className = "toastr";
        }, duration_seconds * 1000);
    }






    

    /*********
     * TYPES *
     *********/



    const success = (message, duration) => { _display("success", "check_circle", message, duration) }

    const info = (message, duration) => { _display("info", "info", message, duration) }

    const warning = (message, duration) => { _display("warning", "warning", message, duration) }

    const error = (message, duration) => {
        _display("error", "error", Utilities.get_error_message(message), duration);
    }








    /********************
     * POST CONSTRUCTOR *
     ********************/










    
    /***********
     * EXPORTS *
     ***********/
    return {
        success,
        info,
        warning,
        error
    }
})();







/******************
 * MODULE EXPORTS *
 ******************/
export default Toastr;