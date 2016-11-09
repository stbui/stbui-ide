define(function (require, exports, module) {
    $('button.toggle').on('click', function(event) {
        event.preventDefault();
        if ( $(this).data('check') == '1' ){
            $(this).data('check', '0');
            // $('.select_check').val('0');
            $('#custom-form input[type="checkbox"]').prop('checked',false);
        } else {
            $(this).data('check', '1');
            // $('.select_check').val('1');
            $('#custom-form input[type="checkbox"]').prop('checked',true);
        }
    });

    // $('#custom-form input[type="checkbox"]').on('click', function () {
    //     $('.select_check').val('0');
    // });
});