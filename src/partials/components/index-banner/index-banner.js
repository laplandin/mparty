'use strict';
(function() {
    if (window.location.pathname === '/') {
        var scene = $('.index-banner__scene').get(0);
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

        var polygon = $('.index-banner__mask polygon');
        var svg = polygon.get(0);
        var points = polygon.attr('points')
            .split(' ')
            .map(function(item) {
                return item.split(',')
                    .map(function(item){
                        return +item;
                    });
            });

        var animation = document.createElementNS(svg.namespaceURI, 'animate');
// animation.setAttribute('fill', 'freeze');
        animation.setAttribute('attributeName', 'points');
        animation.setAttribute('dur', '5000ms');
        animation.setAttribute('calcMode', 'linear');
        animation.setAttribute('to', '0,100 100,100 100,100');
// animation.setAttribute('from', '100,0');
// svg.appendChild(animation);

        $(document).ready(computeDecorOffset);
        $(window).on('resize', computeDecorOffset);

        function computeDecorOffset() {
            var maskOffset = $('.index-banner__mask').offset().top;
            var decorEl = $('.index-banner__bottom-decor');
            var decorHeight = decorEl.height();
            decorEl.css('top', maskOffset - decorHeight / 1.6);
        }
    }
}());
