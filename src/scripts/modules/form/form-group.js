import { FormControl } from "./form-control.js";


/**
 * Form Group
 * The FormGroup instance manages all of the controls and it keeps track of the whole state of 
 * the form.
 * @param {*} form_id 
 * @param {*} partial_controls 
 */
const FormGroup = (form_id, partial_controls) => {
    /***************
     * CONSTRUCTOR *
     ***************/


    // Initialize the main element
    const _el = document.getElementById(form_id);

    // Initialize the submit button element
    const _submit_button_el = document.getElementById(`${form_id}_submit_button`);

    // Initialize the list of FormControl Instances
    const _controls = partial_controls.map((control) => FormControl(
        control.id, 
        control.validate_function
    ));

    // Initialize the validity state of the form
    let _valid = false;








    /**
     * Builds the control values object for all the registered controls.
     * @returns object {[control_name]: string|number|boolean}
     */
    const build_control_values = () => {
        return _controls.reduce((accum, current) => {
            accum[current.el.id] = current.el.value;
            return accum;
        }, {});
    }








    /**
     * Checks if all the controls are valid.
     * @returns boolean
     */
    const _is_valid = () => { return _controls.every((control) => control.valid) }







    /**
     * Triggers whenever an input value changes. It validates each control as well as the whole 
     * group and toggles the state of the submit button.
     * @param {*} e 
     */
    const on_input_changes = (e) => {
        // Build the control values
        const control_values = build_control_values();

        // Trigger the change event on all controls
        _controls.forEach((control) => control.on_input_changes(e.target.id, control_values));

        // Update the validity of the form group
        _valid = _is_valid();

        // If the form is valid, enable the submit button. Otherwise, disable it
        if (_valid) {
            _submit_button_el.removeAttribute("disabled", "true");
        } else {
            _submit_button_el.setAttribute("disabled", "true");
        }
    }








    /**
     * Handles the submission state of the form.
     */
    const submission_started = () => {
        _controls.forEach((control) => control.el.setAttribute("disabled", "true"));
        _submit_button_el.setAttribute("disabled", "true");
    }
    const submission_ended = () => {
        _controls.forEach((control) => control.el.removeAttribute("disabled", "true"));
        _submit_button_el.removeAttribute("disabled", "true");
    }







    /**
     * Resets the value of all the controls as well as their states.
     */
    const reset = () => { 
        _controls.forEach((control) => control.reset());
        _submit_button_el.setAttribute("disabled", "true");
        _valid = false;
    }












    /********************
     * POST CONSTRUCTOR *
     ********************/




    // Subscribe to the input changes
    _el.addEventListener("input", on_input_changes);








    /***********
     * EXPORTS *
     ***********/
    return {
        get el() { return _el },
        get valid() { return _valid },
        build_control_values,
        on_input_changes,
        submission_started,
        submission_ended,
        reset
    }
}




/******************
 * MODULE EXPORTS *
 ******************/
export { FormGroup };