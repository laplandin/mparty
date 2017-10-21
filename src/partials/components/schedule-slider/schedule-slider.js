$(window).on('load', function() {
    var scheduleTrainData = [
        {
            "address": "главный корпус НИМИ ДГАУ <br> (ул. Пушкинская, 111) ауд. 218",
            "ages": [
                "начинающие <br> 3-5 лет",
                "младшая <br> 6-9 лет",
                "средняя и старшая <br> 9-18 лет",
            ],
            "src": "img/schools/1.jpg"
        },
        {
            "address": "пос. Хотунок, ср. школа № 24 <br> (ул. Макаренко, 14)",
            "ages": [
                "начинающие <br> 3-6 лет",
                "младшая <br> 7-10 лет",
                "средняя и старшая <br> 11-18 лет",
            ],
            "src": "img/schools/2.jpg"
        },
        {
            "address": "пос. Персиановский, Дом Культуры ДонГАУ <br> (ул. Школьная)",
            "ages": [
                "начинающие <br> 3-6 лет",
                "младшая <br> 7-10 лет",
                "средняя и старшая <br> 11-18 лет",
            ],
            "src": "img/schools/3.jpg"
        }
    ];

    var list = $('.schedule-slider');
    var address = $('.schedule-slider__address');
    var table = list.find('.schedule__table');
    var current = 0;
    render(0);

    $('.schedule-slider__before').on('click', function() {
        --current;
        render(current);
    });

    $('.schedule-slider__after').on('click', function() {
        ++current;
        render(current);
    });

    function render (index) {
        list.attr('data-active', current);
        address.html(scheduleTrainData[current].address);
        table.find('.td--white').each(function(index) {
            $(this).html(scheduleTrainData[current].ages[index]);
        });
    }
});
