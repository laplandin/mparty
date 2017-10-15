(function () {
  if ($('.order-btn--modal').length) {
      $('.order-btn--modal').on('click', function(event) {
          event.preventDefault();
          $('#modal').modal('show');
      });
  }
}());
