import Database from "../database";


/**
 * MobileSidenav Singleton
 * ...
 */
const MobileSidenav = (() => {
    /***************
     * CONSTRUCTOR *
     ***************/


    // Initialize the main element
    const _el = document.getElementById("mobile_sidenav_container");

    // Initialize the opener element
    const _opener_el = document.getElementById("sidenav_opener");

    // Initialize the close button element
    const _close_button_el = document.getElementById("mobile_sidenav_close_button");

    // Current state of the sidenav
    let _is_opened = false;







    /**
     * Opens the sidenav if it is currently closed.
     */
    const _open = () => { 
        if (!_is_opened) {
            _el.style.display = "block";
            _is_opened = true;
        }
    }



    
    

    /**
     * Closes the sidenav if it is currently opened.
     */
    const _close = () => {
        if (_is_opened) {
            _el.style.display = "none";
            _is_opened = false;
        }
    }








    /********************
     * POST CONSTRUCTOR *
     ********************/




    // Subscribe to the opener
    _opener_el.addEventListener("click", _open);

    // Subscribe to the close button
    _close_button_el.addEventListener("click", _close);

    // State Subscription
    Database.state.subscribe(_close);





    /***********
     * EXPORTS *
     ***********/
    return {

    }
})();




/******************
 * MODULE EXPORTS *
 ******************/
export default MobileSidenav;