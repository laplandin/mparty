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
                            if (i < new Date().getDate() && D.getMonth() <= new Date().getMonth()) {
                                calendar += '<div class="td td--unavailable">' + i + '</div>';
                            } else {
                                calendar += '<div class="td td--available">' + i + '</div>';
                            }
                            if (new Date(D.getFullYear(),D.getMonth(),i).getDay() === 0) {
                                calendar += '</div><div class="tr">';
                            }
                        }
                    }

                    if (new Date().getMonth() >= D.getMonth() && new Date().getFullYear() <= D.getFullYear()) {
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
                    checkSelected(D);
                    setBookHandlers();
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
                    $(this).toggleClass('td--selected');
                    if ($(this).hasClass('calendar__event--selected')) {
                        bookedEvents = $(this).data('info');
                    }
                }

                function setBookHandlers () {
                    $(calendar + ' .tbody .td--available:not(.calendar__event)').on('click', bookDate);
                }

                function bookDate () {
                    if (!$(this).hasClass('td--selected')) {
                        $('.td--selected').removeClass('td--selected');
                        var day = $(this).text();
                        bookedDay =  {
                            year: $(calendar + ' ' + activeClass).data('year'),
                            month: $(calendar + ' ' + activeClass).data('month') + 1,
                            day: Number(day)
                        };
                        $(this).toggleClass('td--selected');
                        inform('data-update', '.order-form', bookedDay);
                    } else {
                        bookedDay = {};
                        inform('data-update', '.order-form', bookedDay);
                        $(this).toggleClass('td--selected');
                    }
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
                    showMessage();
                    return;
                }
                inform('order', '.order-form', calendar.bookedDay());
                $(this).fadeOut();
            });
        }

    });
// }());

function inform(event, target, data) {
    $(target).trigger(event, data);
}

function showMessage(message) {
    var modal = $('#modal');
    if (message && typeof message === 'string') {
        modal.find('.modal-body').text(message);
    }
    modal.modal('show');
}