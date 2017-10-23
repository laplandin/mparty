$(window).on('load', function() {
    var scheduleTrainData = [
        {
            "address": "главный корпус НИМИ ДГАУ <br> (ул. Пушкинская, 111) ауд. 218",
            "ages": [
                "начинающие <br> 3-5 лет",
                "младшая <br> 6-9 лет",
                "средняя и старшая <br> 10-15 лет"
            ],
            "days": [
                ["18:00", "", "", "", "18:00"],
                ["19:00", "", "18:00", "", "19:00"],
                ["", "", "19:00", "18:00", "19:00"]
            ],
            "src": "img/schools/1.jpg"
        },
        {
            "address": "пос. Хотунок, ср. школа № 24 <br> (ул. Макаренко, 14)",
            "ages": [
                "начинающие <br> 3-5 лет",
                "младшая <br> 6-9 лет",
                "средняя и старшая <br> 10-15 лет"
            ],
            "days": [
                ["17:00", "", "17:00", "", ""],
                ["18:00", "", "18:00", "", ""],
                ["19:00", "", "19:00", "", ""]
            ],
            "src": "img/schools/2.jpg"
        },
        {
            "address": "пос. Персиановский, Дом Культуры ДонГАУ <br> (ул. Школьная)",
            "ages": [
                "начинающие <br> 3-5 лет",
                "младшая <br> 6-9 лет",
                "средняя и старшая <br> 10-15 лет"
            ],
            "days": [
                ["18:00", "", "", "", "18:00"],
                ["19:00", "", "18:00", "", "19:00"],
                ["", "", "19:00", "18:00", "19:00"]
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
        groups = table.find('.td--white');
        groups.each(function(groupIndex) {
            $(this).html(scheduleTrainData[current].ages[groupIndex]);
            $(this).siblings('.td').each(function(dayIndex) {
                $(this).text(scheduleTrainData[current].days[groupIndex][dayIndex]);
            });
        });
    }
});
