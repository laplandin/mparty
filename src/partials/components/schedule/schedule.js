(function () {
    if ($('.schedule__table').length) {
        calcMask();
    }

    $(window).on('resize', calcMask);

    function calcMask() {
        var mask = $('.schedule__table .mask');
        var parent = mask.closest('.cross-out');
        var width = parent.width();
        mask.css('border-width', '0 ' + width + 'px 90px 0');
    }
}());
