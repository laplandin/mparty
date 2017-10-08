(function () {
    if ($('.order-form').length) {
        var fileInputs = $('.order-form__input');
        var form = $('.order-form');
        var submitBtn = $('.order-form__submit');
        var fileInput = $('.order-form__file');
        var fileLabel = $('.order-form__label-file span');
        var textarea = $('.order-form__textarea');

        form.on('order', function() {
            $(this).slideDown();
            $(this).promise().done(function() {
               $(window).trigger('resize');
           });
        });

        submitBtn.on('click', function(e) {
            e.preventDefault();
            form.trigger('submit');
            form[0].reset();
        });

        //Проверка, если вдруг после возвращения поля оказались заполнены до фокуса в них
        if (fileInputs.val()) {
            fileInputs.siblings('label').addClass('order-form__label--focused');
        }

        fileInputs.on('focus', function (e) {
            $(this).siblings('label').addClass('order-form__label--focused');
        });

        fileInputs.on('blur', function (e) {
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

        $('#callback_form').click(function (){
            // if($('#order-form__name').val() == ""){
            //     swal('Ошибка!','Укажите ваше имя!','error');
            //     return;
            // }
            // if($('#order-form__phone').val() == ""){
            //     swal('Ошибка!','Укажите Ваш номер телефона!','error');
            //     return;
            // }
            $.ajax({
                type: 'post',
                url:'post_callback.php',
                data:{
                    name: $('#order-form__name').val(),
                    phone: $('#order-form__phone').val(),
                    textarea: $('#order-form__textarea').val(),
                },
                success : function(mes){
                    swal('Отлично!','Наш менеджер Вам перезвонит!','success');
                    $('#order-form__name').val("");
                    $('#order-form__phone').val("");
                    $('#order-form__textarea').val("");
                }
            });
        });

        textarea.on('blur', function (e) {
            if (!$(this).val()) {
                $(this).siblings('label').removeClass('order-form__label--focused');
            }
        });
    }
}());