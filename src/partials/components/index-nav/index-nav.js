$(document).ready(equalNav);

$(window).resize(equalNav);

function equalNav() {
    var h = $('.content-wrapper').outerHeight();
    $('.index-nav-wrapper').outerHeight(h);
}