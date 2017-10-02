(function(){
    if (window.location.href.match(/services/)) {
        calcMaskHeight();

        $(window).on('resize', function() {
           calcMaskHeight();
        });

        $('.index-nav-wrapper').addClass('index-nav-wrapper--alt-decor');
    }
    function calcMaskHeight () {
        var mask = $('.services-list__mask');

        var parentWidth = mask.closest('.services-list').width();
        var h = Math.tan(0.09) * parentWidth;
        mask.css('height', h);

        //ставим отсутп родителю (компенсируем skew)
        $('.content-wrapper--services').css('margin-top', -h/2);
    }
}());
