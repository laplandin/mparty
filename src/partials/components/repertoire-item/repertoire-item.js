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
}());

