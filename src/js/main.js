$(document).ready(function() {

//     var myHeader = document.querySelector("#header");
// // construct an instance of Headroom, passing the element
//     var headroom  = new Headroom(myHeader, {
//         "offset": 205,
//         "tolerance": 5,
//         "classes": {
//             "initial": "animated",
//             "pinned": "slideDown",
//             "unpinned": "slideUp"
//         }
//     });
// // initialise
//     headroom.init();

    // $('.aniview').AniView();
    window.sr = ScrollReveal({ reset: true });

    // Customizing a reveal set
    sr.reveal('.reveal', { duration: 200 });
    sr.reveal('.reveal-item', {duration: 300, viewFactor: 0.3}, 50);

    $('.js-scroll').on('click', function(ev) {
        ev.preventDefault();
        var substr = $(this).attr('href').substr(1);
        $('html, body').animate({
            scrollTop: $('[name='+ substr + ']').offset().top
        }, 500);
    });

    $('.spring').on('click', function() {
        var self = $(this);
        self.toggleClass('animated rubberBand');

       var clear = setTimeout(function() {
           self.toggleClass('animated rubberBand');
       }, 1000);
    });
});
