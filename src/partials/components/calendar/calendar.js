// (function() {
    $(window).on('load', function () {
        if ($('#calendar').length) {
            var calendar = (function () {
                var events = [
                    {
                        date: new Date(2017, 9, 10),
                        info: {
                            name: 'Фестиваль1',
                            price: 300,
                            place: 'ДК Ростсельмаш'
                        }
                    },
                    {
                        date: new Date(2017, 9, 12),
                        info: {
                            name: 'Фестиваль2',
                            price: 400,
                            place: 'ДК Ростсельмаш'
                        }
                    },
                    {
                        date: new Date(2017, 10, 9),
                        info: {
                            name: 'Фестиваль',
                            price: 300,
                            place: 'ДК Ростсельмаш'
                        }
                    }
                ];
                var calendar;
                var bookedEvents = {};
                var bookedDay = {};
                var activeClass = '.calendar__active-month';

                function init(selector) {
                    calendar = selector;
                    Calendar(selector, new Date().getFullYear(), new Date().getMonth());
                    setToggleHandlers(selector);
                }

                function setToggleHandlers(selector) {
                    var calendarToggle = '.calendar__month-toggle';

                    // переключатель минус месяц
                    $(selector + ' ' + calendarToggle + '--prev').click(function() {
                        console.log('fire');
                        Calendar(selector, $(activeClass).data('year'), $(activeClass).data('month')-1);
                    });
                    // переключатель плюс месяц
                    $(selector + ' ' + calendarToggle + '--next').click(function() {
                        console.log('fire');
                        Calendar(selector, $(activeClass).data('year'), $(activeClass).data('month')+1);
                    });
                }

                function Calendar(id, year, month) {
                    var Dlast = new Date(year, month+1, 0).getDate(),
                        D = new Date(year, month, Dlast),
                        DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
                        DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
                        calendar = '<div class="tr">';
                    monthes = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
                    if (DNfirst !== 0) {
                        for(var  i = 1; i < DNfirst; i++) calendar += '<div class="td"></div>';
                    } else {
                        for(i = 0; i < 6; i++) calendar += '<div class="td"></div>';
                    }
                    for(i = 1; i <= Dlast; i++) {
                        if (i === new Date().getDate() && D.getFullYear() === new Date().getFullYear() && D.getMonth() === new Date().getMonth()) {
                            calendar += '<div class="td td--today td--available">' + i + '</div>';
                            if (new Date(D.getFullYear(),D.getMonth(),i).getDay() === 0) {
                                calendar += '</div><div class="tr">';
                            }
                        } else {
                            calendar += '<div class="td td--available">' + i + '</div>';
                            if (new Date(D.getFullYear(),D.getMonth(),i).getDay() === 0) {
                                calendar += '</div><div class="tr">';
                            }
                        }
                    }
                    for(var  i = DNlast; i < 7; i++) calendar += '<div class="td">&nbsp;</div>';
                    var activeEl = $(activeClass)[0];
                    $(id + ' .tbody').html(calendar);
                    $(id + ' ' + activeClass).html(monthes[D.getMonth()] +' '+ D.getFullYear());
                    $.data(activeEl, 'month', D.getMonth());
                    $.data(activeEl, 'year', D.getFullYear());
                    if ($(id+' .tbody .tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
                        $(id+' .tbody').append('<div class="tr tr--transparent"><div class="td">&nbsp;</div><div class="td">&nbsp;</div><div class="td">&nbsp;</div><div class="td">&nbsp;</div><div class="td">&nbsp;</div><div class="td">&nbsp;</div><div class="td">&nbsp;</div></div>');
                    }
                    $(window).trigger('resize');
                    setBookHandlers();
                }

                function setEvents() {
                    //Бронирование мероприятий полученных с API
                    var currentMonth = $(calendar + ' ' + activeClass).data('month');
                    var currentYear = $(calendar + ' ' + activeClass).data('year');

                    events.forEach(function(item, index, array) {
                       if (item.date.getFullYear() === currentYear && item.date.getMonth() === currentMonth) {
                           console.log('found');
                           var eventCell = $(calendar + ' .tbody .td:contains(' + item.date.getDate() + ')');
                           eventCell.data("info", item.info)
                               .addClass('calendar__event')
                               .append(addTooltip(item.info))
                               .on('click', chooseEvent);
                       }
                    });
                }

                function addTooltip (info) {
                    var template = '<div class="calendar__tooltip">' +
                        '<p class="calendar__tooltip-name">%name</p>' +
                        '<p class="calendar__tooltip-place">%place</p>' +
                        '<p class="calendar__tooltip-price">цена: %price</p>' +
                        '</div>';
                    template = template.replace('%name', info.name)
                        .replace('%place', info.place)
                        .replace('%price', info.price);
                    return template;
                }

                function chooseEvent () {
                    $(this).toggleClass('td--choosen');
                    if ($(this).hasClass('calendar__event--choosen')) {
                        bookedEvents = $(this).data('info');
                    }
                    console.log(bookedEvents);
                }

                function setBookHandlers () {
                    $(calendar + ' .tbody .td--available:not(.calendar__event)').on('click', bookDate);
                }

                function bookDate () {
                    if (!$(this).hasClass('td--choosen')) {
                        if (Object.keys(bookedDay).length > 0) {
                            showLimitMessage();
                            return;
                        }
                        var day = $(this).children('span').text();
                        bookedDay =  {
                            year: $(calendar + ' ' + activeClass).data('year'),
                            month: $(calendar + ' ' + activeClass).data('month') + 1,
                            day: day
                        };
                        $(this).toggleClass('td--choosen');
                    } else {
                        bookedDay = {};
                        $(this).toggleClass('td--choosen');
                    }
                }

                function showLimitMessage() {
                    var modal = $('#modal');
                    modal.find('.modal-body').text('Невозможно выбрать больше одной даты');
                    modal.modal('show');
                }

                function getBookedDay () {
                    return bookedDay;
                }

                return {
                    init: init,
                    bookedDay: getBookedDay
                };
            }());

            calendar.init('#calendar');

            var orderBtn = $('.order-btn');

            orderBtn.on('click', function(e) {
                e.preventDefault();
                if (Object.keys(calendar.bookedDay()).length === 0) {
                    var modal = $('#modal');
                    modal.find('.modal-body').text('Для бронирования необходимо выбрать дату');
                    modal.modal('show');
                    return;
                }
                $('.order-form').trigger('order');
            });
        }

    });
// }());