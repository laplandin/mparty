$(document).ready(function() {
    $('img').ready(equalNav);
});

$(window).on('resize', function() {
    console.log('resize');
    equalNav();
});

$(document).on('render', function() {
    $('img').on('load', equalNav);
});


function equalNav() {
    var h = $('.content-wrapper')[0].scrollHeight;
    $('.index-nav-wrapper').outerHeight(h);
    console.log('42');
}