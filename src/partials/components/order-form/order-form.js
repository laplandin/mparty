(function () {
    function formSubmit (){
        var validateResult = checkIsValid(name, phone);

        if (!validateResult.success) {
            showMessage(validateResult.message);
            return false;
        }
        $.ajax({
            type: 'post',
            url:'post_callback.php',
            data: validateResult.data,
            success : function(mes){
                showMessage('Спасибо за заказ, наш менеджер свяжется с вами');
                form[0].reset();
            },
            error: function(err) {
                showMessage('Ой, что-то пошло не так, попробуйте повторить заказ позже');
            }
        });
    }

    function checkIsValid (name, phone) {
        var nameReg = /^[а-яА-ЯёЁa-zA-Z\s]+$/;
        var normalizedName = name.val().trim().replace(/\s{2,}/g, ' '); //удаление лишних пробелов
        var nameNumber = normalizedName.split(' ').length; //число слов в строке
        var phoneReg = /^\+?\d{1}-?\d{3,4}-\d{3}-\d{2}-\d{2}$|^\+?\d{11}$/;
        var phoneNumber = phone.val();
        var textComment = $('#order-form__textarea').val() || '';

        if (Object.keys(bookedInfo).length === 0) return {success:false, message: 'Пожалуйста выберите дату'};
        if (normalizedName === '') return {success: false, message: 'Пожалуйста заполните поле "Имя"'};
        if (!nameReg.test(normalizedName)) return {success: false, message: 'Неправильный формат имени, допускаются только буквы'};
        if (nameNumber > 3) return {success: false, message: 'Поле "Имя" не может содержать более трёх слов (ФИО)'};
        if (!phoneNumber) return {success: false, message: 'Пожалуйста заполните поле "Телефон"'};
        return {success: true, data: {
            "name": normalizedName,
            "phone": phoneNumber,
            "comment": textComment,
            "date": bookedInfo
        }};
    }

    if ($('.order-form').length) {
        var inputs = $('.order-form input');
        var name = $('#order-form__name');
        var phone = $('#order-form__phone');
        var form = $('.order-form');
        var submitBtn = $('.order-form__submit');
        var textarea = $('.order-form__textarea');
        $("#order-form__phone").mask("(999) 999-9999");
        var bookedInfo = {};

        submitBtn.children('a').on('click', function(e) {
           e.preventDefault();
        });

        submitBtn[0].addEventListener('click', formSubmit, true);

        form.on('order', function(event, bookedDay) {
            bookedInfo = bookedDay;
            $(this).slideDown();
            $(this).promise().done(function() {
               $(window).trigger('resize');
           });
        })
            .on('data-update', function(event, data) {
                bookedInfo = data;
            });

        //Проверка, если вдруг после возвращения поля оказались заполнены до фокуса в них
        if (inputs.val()) {
            fileInputs.siblings('label').addClass('order-form__label--focused');
        }

        inputs.on('focus', function (e) {
            $(this).siblings('label').addClass('order-form__label--focused');
        });

        inputs.on('blur', function (e) {
            if (!$(this).val()) {
                $(this).siblings('label').removeClass('order-form__label--focused');
            }
        });

        if (textarea.val()) {
            fileInputs.siblings('label').addClass('order-form__label--focused');
        }

        textarea.on('focus', function (e) {
            $(this).siblings('label').addClass('order-form__label--focused');
        });

        textarea.on('blur', function (e) {
            if (!$(this).val()) {
                $(this).siblings('label').removeClass('order-form__label--focused');
            }
        });
    }
}());