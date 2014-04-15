function crf_dashboard_annotation_row_click(o) {

    var event = jQuery.Event( "update_controller_partials" );

    // since open and resolved datatables are selectable, unselect rows in the other table
    var dt_self = YAHOO.util.Dom.getAncestorByClassName(o.target, 'yui-dt');
    $(".yui-dt").not(dt_self).each(function() {
        $(this).data("cdatatable").unselectAllRows();
    });

    // get the record_id and question_id related to this row
    var annotation_record_id = $(o.target).find(".annotation_data_row").data("record_id");
    var annotation_question_id = $(o.target).find(".annotation_data_row").data("question_id");

    var question_element = $("#question_anchor_"+annotation_record_id+"_"+annotation_question_id);
    if (question_element != undefined && question_element != "") {

        // determine if this question is in a collapsed EL
        var collapsed_el_row = $(question_element).closest("div[id='log_expansion_content_'+annotation_record_id]:hidden");

        if (collapsed_el_row.length > 0) {
            // trigger the onclick event to expand the row
            $('#log_expansion_link_'+annotation_record_id).trigger('click');
        }

        // determine if this question is on a non-visible page
        var hidden_form_page = $(question_element).closest("div[id^=mednet-form]:hidden");
        if (hidden_form_page.length > 0) {

            // get the FormBuilder object
            formIdx = $("input[name='__internal_form_index__']").val();
            var myForm = window.imednetForms[formIdx];

            // the last character is the page number
            hidden_form_page_id = hidden_form_page.attr("id")
            var new_page_number = hidden_form_page_id.charAt(hidden_form_page_id.length-1);

            // call function to change the page
            myForm._changePage(new_page_number);
        }

        // set focus on the question appropriately
        window.location.hash = "question_anchor_"+annotation_record_id+"_"+annotation_question_id;

        // remove selected class from all other elements
        $(".selected_question").removeClass("selected_question");

        // select the question
        $(question_element).closest(".selectable_question").addClass("selected_question");

        event.uri_params = {
            'question_id': annotation_question_id,
            'record_id': annotation_record_id
        };

        // trigger refresh of just Data Value Audit
        $("div[id^='partial_record_recordQuestionActivity']").trigger(event);
    }

    event.uri_params = {
        'annotation_id': $(o.target).find(".annotation_data_row").data("annotation_id")
    };

    // update the query history table
    $("div[id^='partial_annotation_commentsByEntity']").trigger(event);

}
