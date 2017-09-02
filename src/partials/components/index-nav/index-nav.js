$(document).ready(function() {
    equalNav();
});

$(window).resize(function() {
   equalNav();
});

function equalNav() {
    var h = $('.index-content-wrapper').outerHeight();
    $('.index-nav-wrapper').outerHeight(h);
}