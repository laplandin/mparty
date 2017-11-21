(function () {
    var orderButon = $('.order-btn--modal');
  if (orderButon.length) {
      $(orderButon).on('click', function(event) {
          event.preventDefault();
          $('#modal').modal('show');
      });
  }
}());
