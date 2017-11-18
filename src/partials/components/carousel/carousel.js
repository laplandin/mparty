$(document).ready(function() {
    var carouselEl = $("#carousel");
    var options = {
        separation: 300
    };

    if ($(carouselEl).length) {
        var carousel = carouselEl.waterwheelCarousel(options);
        $(window).on("resize", function() {
            carousel.reload(options);
        });
    }
});
