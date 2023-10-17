


/**
 * Form Control Factory
 * Handles a single Form Control as well as its validity. It also exposes the control's element
 * for the FormGroup to be able to manipulate and access information.
 * @param {*} control_id 
 * @param {*} validate_function 
 */
const FormControl = (control_id, validate_function) => {
    /***************
     * CONSTRUCTOR *
     ***************/


    // Initialize the main element
    const _el = document.getElementById(control_id);

    // Initialize the label element
    const _label_el = document.getElementById(`${control_id}_label`);

    // Initialize the error element
    const _error_el = document.getElementById(`${control_id}_error`);

    // Initialize the state of the input
    let _pristine = true;
    let _valid = true;

    // Store the validation function
    const _validate = validate_function;





    


    /**
     * Marks the control as invalid if it fails the validation.
     */
    const _mark_control_as_invalid = () => {
        _el.classList.add("errored");
        _label_el.classList.add("error-color");
        _error_el.style.visibility = "visible";
    }

    


    /**
     * Marks the control as valid if it passes the validation.
     */
    const _mark_control_as_valid = () => {
        _el.classList.remove("errored");
        _label_el.classList.remove("error-color");
        _error_el.style.visibility = "hidden";
    }





    /**
     * Triggers whenever an input changes. It validates the control and updates its state.
     * @param changed_input_id
     * @param control_values
     */
    const on_input_changes = (changed_input_id, control_values) => {
        // Check the pristine state of the control
        if (_pristine && changed_input_id == _el.id) _pristine = false;

        // Validate the value
        _valid = _validate(control_values);

        // Handle the input validity
        if (_valid) {
            _mark_control_as_valid();
        } else {
            _mark_control_as_invalid();
        }
    }






    /**
     * Resets the value and the state of the form.
     */
    const reset = () => { 
        _el.value = "";
        _el.blur();
        _pristine = true;
        _valid = false;
    }













    /********************
     * POST CONSTRUCTOR *
     ********************/










    /***********
     * EXPORTS *
     ***********/
    return {
        get el() { return _el },
        get pristine() { return _pristine },
        get valid() { return _valid },
        on_input_changes,
        reset
    }
}




/******************
 * MODULE EXPORTS *
 ******************/
export { FormControl };