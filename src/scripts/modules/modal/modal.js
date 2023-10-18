


/**
 * Modal Module
 * ...
 */
const Modal = (() => {
    /***************
     * CONSTRUCTOR *
     ***************/

    // Initialize the main element
    const _el = document.getElementById("modal");

    // Initialize the title element
    const _title_el = document.getElementById("modal_title");

    // Initialize the close button element
    const _close_button_el = document.getElementById("modal_close_button");

    // Initialize the content element
    const _content_el = document.getElementById("modal_content");

    




    /**
     * Displays the modal on top the app.
     * @param {*} title 
     * @param {*} html_content 
     */
    const show = (title, html_content) => {
        // Set the title and the content
        _content_el.innerHTML = html_content;
        _title_el.innerText = title;

        // Display the modal
        _el.showModal();
    }






    /**
     * Removes the modal from the DOM.
     */
    const close = () => { 
        // Close the dialog element
        _el.close();

        // Set the title and the content
        _content_el.innerHTML = "";
        _title_el.innerText = "";
    }











    /********************
     * POST CONSTRUCTOR *
     ********************/
    



    // Subscribe to the click event of the modal's close button 
    _close_button_el.addEventListener("click", close);







    /***********
     * EXPORTS *
     ***********/
    return {
        show,
        close
    }
})();







/******************
 * MODULE EXPORTS *
 ******************/
export default Modal;