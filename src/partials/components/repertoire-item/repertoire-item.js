(function () {

    $(window).on('load', function() {

        if (window.location.href.match(/repertoire/)) {

            $(window).on('load resize', function() {
                calcItem();
            });

            $('.repertoire-item__image').on('click', function() {
                var slider = $(this).closest('.repertoire-item__slider');
                var preloader = slider.find('.preload-juggle');
                var toggles = '.repertoire-item__slider-toggle';
                var active = '.repertoire-item__slider-toggle--active';

                var slidesNumber = slider.find('.repertoire-item__slider-toggle').length;

                var current = slider.find(toggles).index(slider.find(active));


                slider.find(toggles).removeClass(active.slice(1));

                var currentImg = slider.find('img');
                var currentSrc = currentImg.attr('src');
                var srcArr = currentSrc.split('.');
                var index = (current + 1) % slidesNumber;

                slider.find(toggles).eq(index).addClass(active.slice(1));

                srcArr[0] = srcArr[0].slice(0, -1) + (index + 1);

                newSrc = srcArr.join('.');
                currentImg.attr('src', newSrc);

                //set preloader while loading

                preloader.show();

                // main image loaded ?
                $('img').on('load', function(){
                    // hide/remove the preloader
                    preloader.hide();
                });

            });

            $('.repertoire-item__slider-toggle').on('click', function() {

                var slider = $(this).closest('.repertoire-item__slider');
                var preloader = slider.find('.preload-juggle');

                // set active toggle state

                $(this).siblings().removeClass('repertoire-item__slider-toggle--active');
                $(this).addClass('repertoire-item__slider-toggle--active');

                //set new imgSrc

                var currentImg = slider.find('img');
                var currentSrc = currentImg.attr('src');
                var index = + $(this).closest('.repertoire-item__slider-toggles-list').find('li').index(this) + 1;
                console.log(currentImg);

                var srcArr = currentSrc.split('.');
                srcArr[0] = srcArr[0].slice(0, -1) + index;

                newSrc = srcArr.join('.');
                currentImg.attr('src', newSrc);

                //set preloader while loading

                preloader.show();

                // main image loaded ?
                $('img').on('load', function(){
                    // hide/remove the preloader
                    preloader.hide();
                });
            });

            var data = [
                {
                    "title": "Свистопляска",
                    "text": "Русская плясовая.",
                    "link": "#",
                    "src": "rep11-1.jpg"
                },
                {
                    "title": "Диджейский микс",
                    "text": "Танцевальное настроение дискотеки",
                    "link": "#",
                    "src": "rep12-1.jpg"
                },
                {
                    "title": "Твоя энергия",
                    "text": "Жизнеутверждающая молодежная яркая композиция. Современная хореография",
                    "link": "#",
                    "src": "rep13-1.jpg"
                },
                {
                    "title": "Цыганский  разгуляй",
                    "text": "Зажигательная стилизованная композиция (музыка из репертуара Madonna)",
                    "link": "#",
                    "src": "rep14-1.jpg"
                },
                {
                    "title": "Нас миллионы",
                    "text": "Проникновенный нежный номер",
                    "link": "#",
                    "src": "rep15-1.jpg"
                },
                {
                    "title": "Celebrate",
                    "text": "Jazz-funk Современная пластика, фристайл",
                    "link": "#",
                    "src": "rep16-1.jpg"
                },
                {
                    "title": "Балканский дискоданс Disco-Partizani",
                    "text": "40-минутное вокально-танцевальное представление, не оставляющее равнодушным никого. Под эти ритмы невозможно усидеть на месте! Танцевальная программа при участии  зрителей",
                    "link": "#",
                    "src": "rep17-1.jpg"
                },
                {
                    "title": "Баварский Джаз",
                    "text": "40-минутное вокально-танцевальное представление основанное на пивных историях и безудержных танцах . мы оказываемся в центре баварской деревушки и вовлекаем вас в пивные танцевальные истории",
                    "link": "#",
                    "src": "rep18-1.jpg"
                },
                {
                    "title": "Менуэт",
                    "text": "Историческая стилизация, погружающая в эпоху барокко",
                    "link": "#",
                    "src": "rep19-1.jpg"
                }
            ];

            var isFired = true;

            $(document).on('scroll', function() {

                if (($(window).scrollTop() >= (($(document).height() - $(window).height()) * 0.7)) && isFired) {
                    isFired = false;

                    var currentItem = getItemsNumber();
                    console.log(currentItem);
                    console.log(App.templates.repertoire.item(data));

                    data.forEach(function(item) {
                        $('.repertoire-list').append(App.templates.repertoire.item(item));
                    });

                    $(this).trigger('render');
                    console.log($(this));
                    calcItem();
                }
            });
        }
    });

    function getItemsNumber () {
        var max = 0;
        $('.repertoire-item').each(function(){
            var val = $(this).data('index');
            if(val > max) max = val;
        });
        return max;
    }

    function calcItem () {
        var parentWidth = $('.repertoire-item').width()/2;
        var h = Math.sin(0.087) * parentWidth;
        $('.repertoire-item:first-child').css('marginTop', -h/4);
        $('.repertoire-item__info').css({paddingTop: h, top: -h/1.8, bottom: -h/1.8});
    }

}());

