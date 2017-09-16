(function () {
    $(window).on('load resize', function() {
       calcItem();
    });

    function calcItem () {
        var parentWidth = $('.repertoire-item').width()/2;
        var h = Math.sin(0.087) * parentWidth;
        $('.repertoire-item:first-child').css('marginTop', -h/4);
        $('.repertoire-item__info').css({paddingTop: h, top: -h/1.8, bottom: -h/1.8});
    }

    $('.repertoire-item__slider-toggle').on('click', function() {
        $(this).siblings().removeClass('repertoire-item__slider-toggle--active');
        $(this).addClass('repertoire-item__slider-toggle--active');

        var currentImg = $(this).closest('.repertoire-item__slider').find('img');
        var currentSrc = currentImg.attr('src');
        var index = + $(this).closest('.repertoire-item__slider-toggles-list').find('li').index(this) + 1;
        console.log(currentImg);

        var srcArr = currentSrc.split('.');
        srcArr[0] = srcArr[0].slice(0, -1) + index;

        newSrc = srcArr.join('.');
        currentImg.attr('src', newSrc);
    });
}());

