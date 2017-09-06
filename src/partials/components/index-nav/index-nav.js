$(document).ready(equalNav);

$(window).resize(equalNav);

function equalNav() {
    var h = $('.index-content-wrapper').outerHeight();
    $('.index-nav-wrapper').outerHeight(h);
}