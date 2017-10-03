(function () {
    if ($('.scene-prlx').length) {

        var scene = $('.scene-prlx').get(0);
        var parallax = new Parallax(scene, {
            relativeInput: false,
            clipRelativeInput: false,
            hoverOnly: false,
            // inputElement: document.getElementById('myinput'),
            calibrateX: false,
            calibrateY: false,
            invertX: true,
            invertY: true,
            limitX: false,
            limitY: false,
            scalarX: 30,
            scalarY: 10,
            frictionX: 0.1,
            frictionY: 0.1,
            originX: 0.5,
            originY: 0.5,
            precision: 1,
            pointerEvents: false
            // onReady: function() { alert('ready!'); }
        });


        var polygon = $('.js-prlx-mask polygon');
        var svg = polygon.get(0);
        var points = polygon.attr('points')
            .split(' ')
            .map(function(item) {
                return item.split(',')
                    .map(function(item){
                        return +item;
                    });
            });

        $(document).ready(computeDecorOffset);
        $(window).on('resize', computeDecorOffset);
    }

    function computeDecorOffset() {
        var maskOffset = $('.js-prlx-mask').offset().top;
        var decorEl = $('.js-scene-decor');
        var decorHeight = decorEl.height();
        decorEl.css('top', maskOffset - decorHeight / 1.6);
    }
}());
