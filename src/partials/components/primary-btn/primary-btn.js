(function () {
    if ($('.primary-btn--modal').length) {
        $('.primary-btn--modal').on('click', function(event) {
            event.preventDefault();
            $('#modal').modal('show');
        });
    }
}());
