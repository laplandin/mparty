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

if (window.location.pathname === '/') {
    $('.index-nav-wrapper').addClass('index-nav-wrapper--prime-decor');
}

if ( window.location.href.match('repertoire')) {
    $('.index-nav-wrapper').addClass('index-nav-wrapper--prime-decor');
}

if (window.location.href.match(/service/)) {
    $('.index-nav-wrapper').addClass('index-nav-wrapper--alt-decor');
}

if (window.location.href.match(/poster/)) {
    $('.index-nav-wrapper').addClass('index-nav-wrapper--none-decor');
}

function equalNav() {
    var h = $('.content-wrapper').outerHeight();
    $('.index-nav-wrapper').outerHeight(h);
    console.log('42');
}