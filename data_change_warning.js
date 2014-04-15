/**
 * a few things are necessary to apply this to functionality to other <form>'s
 * 1. add the class data_change_warning to the relevant form
 * 2. (optional) if non-input data changes would indicate a change then set .data(data_changed) manually
 * 3. on the CStandardResponse object (PHP side) set clear_data_changed_flag=true once data is saved
 */
    if ($("form").hasClass("data_change_warning") == true) {

        $(window).bind("beforeunload",function() {
	
            /**
             * per jQuery "Returning false from a handler is equivalent to calling both
             * .preventDefault() and .stopPropagation() on the event object."
             * Firefox likes false, but accepts a string and has their own verbiage
             * IE and Chrome will spit out whatever is returned within their own container
             */
            if ($("form").data("data_changed") == true) {
                return "Data changes have not been saved.";
            }
        });

        /* define the data changed flag to be true if any inputs change */
        $("form").delegate(":input","change", function() {
            /* use parents() as it'll traverse up more than one level */
            $(this).parents("form").data("data_changed",true);
        });
    }
