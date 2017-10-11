(function () {
    $(window).on('load', function() {

        if ($('svg.banner__mask').length) {
            setMaskHeight();

            $(window).on('resize', function () {
               setMaskHeight();
            });
        }

        function setMaskHeight () {
            var mask = $('.banner__mask');
            var parentWidth = mask.closest('.banner').width();
            var h = Math.sin(0.087) * parentWidth;

            mask.attr('height', h);
            $('.banner__after-decor').css('bottom', h/2);
        }
    });
}());

