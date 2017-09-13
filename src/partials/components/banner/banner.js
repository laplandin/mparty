$(window).on('load', function() {
    console.log('load');
    if (window.location.pathname.match(/repertoire/)) {

        var mask = $('.banner__mask');
        console.log(mask.attr('height'));
        var parentWidth = mask.closest('.banner').width();
        var h = Math.sin(0.087) * parentWidth;

        mask.attr('height', h);
        $('.banner__after-decor').css('bottom', h/2);

        // $('.repertoire-item:first-child').css('marginTop', -h);
    }
});
