// (function() {
    $(window).on('load', function () {
        if ($('#calendar').length) {
            var calendar = (function () {
                var events = [
                    {
                        date: new Date(2017, 11, 22),
                        info: {
                            name: 'Фестиваль1',
                            price: 300,
                            place: 'ДК Ростсельмаш'
                        }
                    },
                    {
                        date: new Date(2017, 11, 24),
                        info: {
                            name: 'Фестиваль2',
                            price: 400,
                            place: 'ДК Ростсельмаш'
                        }
                    },
                    {
                        date: new Date(2017, 10, 30),
                        info: {
                            name: 'Фестиваль',
                            price: 300,
                            place: 'ДК Ростсельмаш'
                        }
                    }
                ];
                events = [];
                var calendar;
                var bookedDay = {};
                var activeClass = '.calendar__active-month';
                var calendarMode = /poster/.test(window.location.href) ? "poster" : "booking";

                function init(selector) {
                    calendar = selector;
                    Calendar(selector, new Date().getFullYear(), new Date().getMonth());
                    setToggleHandlers(selector);
                }

                function setToggleHandlers(selector) {
                    var calendarToggle = '.calendar__month-toggle';

                    // переключатель минус месяц
                    $(selector + ' ' + calendarToggle + '--prev').click(function() {
                        Calendar(selector, $(activeClass).data('year'), $(activeClass).data('month')-1);
                    });
                    // переключатель плюс месяц
                    $(selector + ' ' + calendarToggle + '--next').click(function() {
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
                            if (i < new Date().getDate() && D.getMonth() <= new Date().getMonth() && D.getFullYear() === new Date().getFullYear()) {
                                calendar += '<div class="td td--unavailable">' + i + '</div>';
                            } else {
                                calendar += '<div class="td td--available">' + i + '</div>';
                            }
                            if (new Date(D.getFullYear(),D.getMonth(),i).getDay() === 0) {
                                calendar += '</div><div class="tr">';
                            }
                        }
                    }

                    if (new Date().getMonth() >= D.getMonth() && new Date().getFullYear() === D.getFullYear()) {
                        $('.calendar__month-toggle--prev').hide();
                    } else {
                        $('.calendar__month-toggle--prev').show();
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
                    switch (calendarMode) {
                        case "poster" :
                            fetchEvents(setEvents);
                            // setEvents();
                            break;
                        case "booking" :
                            setBookHandlers();
                            break;
                    }
                    checkSelected(D);
                }

                function checkSelected (selectedDate) {
                    if (Object.keys(bookedDay).length > 0) {
                        var bookedDate = new Date(bookedDay.year, bookedDay.month - 1, bookedDay.day);
                        if (bookedDate.getFullYear() === selectedDate.getFullYear() && bookedDate.getMonth() === selectedDate.getMonth()) {
                            var eventCell = $(calendar + ' .tbody .td:contains(' + bookedDay.day + ')');
                            eventCell.toggleClass('td--selected');
                        }
                    }
                }

                function setEvents() {
                    //Бронирование мероприятий полученных с API
                    var currentMonth = $(calendar + ' ' + activeClass).data('month');
                    var currentYear = $(calendar + ' ' + activeClass).data('year');

                    events.forEach(function(item, index, array) {
                       if (item.date.getFullYear() === currentYear && item.date.getMonth() === currentMonth) {
                           var eventCell = $(calendar + ' .tbody .td:contains(' + item.date.getDate() + ')');
                           eventCell.data({"info": item.info, "date": item.date})
                               .addClass('calendar__event')
                               .append(addTooltip(item.info))
                               .on('click', bookDate);
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

                function setBookHandlers () {
                    $(calendar + ' .tbody .td--available:not(.calendar__event)').on('click', bookDate);
                }

                function bookDate () {
                    if (!$(this).hasClass('td--selected')) {
                        $('.td--selected').removeClass('td--selected');
                        var day = $(this).text();
                        if (isNaN(day)) {
                            var bookedDate = $(this).data("date");
                            var info = $(this).data("info");
                            bookedDay = {
                                year: bookedDate.getFullYear(),
                                month: bookedDate.getMonth() + 1,
                                day: bookedDate.getDate(),
                                event: info
                            };
                        } else {
                            bookedDay =  {
                                year: $(calendar + ' ' + activeClass).data('year'),
                                month: $(calendar + ' ' + activeClass).data('month') + 1,
                                day: Number(day)
                            };
                        }
                        console.log(bookedDay);
                        $(this).toggleClass('td--selected');
                        eventBus('data-update', '.order-form', bookedDay);
                    } else {
                        bookedDay = {};
                        eventBus('data-update', '.order-form', bookedDay);
                        $(this).toggleClass('td--selected');
                    }
                }

                function getBookedDay () {
                    return bookedDay;
                }

                function fetchEvents (cb) {
                    var url = "get_events.php";
                    $.ajax({
                        type: "GET",
                        url: "test.json",
                        success : function(data){
                            console.log(data);
                            data.forEach(function (item) {
                               var event = {
                                   date: new Date(item.date[0], item.date[1], item.date[2]),
                                   info: item.info
                               };
                               events.push(event);
                            });
                            console.log(events);
                            cb(events);
                        },
                        error: function(err) {
                            console.error("Events not fetched, try later");
                        }
                    });
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
                    showMessage();
                    return;
                }
                eventBus('order', '.order-form', calendar.bookedDay());
                $(this).fadeOut();
            });
        }

    });
// }());

function eventBus(event, target, data) {
    $(target).trigger(event, data);
}