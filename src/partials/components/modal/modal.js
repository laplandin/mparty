$(window).on('load', function() {

    if ($.validator) {
        $(".modal__input--phone").mask("(999) 999-9999");
        var form = $('#modal-form');
        form.siblings('.primary-btn').click(function(e) {
            e.preventDefault();
            form.submit();
        });

        $.validator.addMethod('username', function(value, element){
            var nameReg = /^[а-яА-ЯёЁa-zA-Z\s]+$/;
            return this.optional(element) || nameReg.test(value);
        }, 'Имя может состоять только из букв');

        $.validator.addMethod('usernameLength', function(value, element){
            var normalizedName = value.trim().replace(/\s{2,}/g, ' '); //удаление лишних пробелов
            var nameNumber = normalizedName.split(' ').length; //число слов в строке

            return this.optional(element) || nameNumber <= 3;
        }, 'Имя не может превышать трёх слов');

        form.validate({
            rules: {
                name: {
                    required: true,
                    username: true,
                    usernameLength: true
                },
                phone: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: 'Пожалуйста заполните это поле'
                },
                phone: {
                    required: 'Пожалуйста заполните это поле'
                }
            },
            focusInvalid: false,
            submitHandler: modalFormSubmit
        });

    }

    function modalFormSubmit () {
        var url = form.attr('action');

        var data = {
            name: form.find('[name="name"]').val(),
            phone: form.find('[name="phone"]').val()
        };
        form.closest('#modal').modal('hide');
        console.log(data);

        $.ajax({
            type: 'post',
            url: url,
            data: data,
            success : function(mes) {
                showMessage('Спасибо за заказ, наш менеджер свяжется с вами');
                form[0].reset();
            },
            error: function(err) {
                showMessage('Ой, что-то пошло не так, попробуйте повторить заказ позже');
            }
        });
    }

});

function showMessage(message) {
    var modal;
    if(!$('#modal--toast').length) {
        modal = $('#modal').clone().attr('id', 'modal--toast');
    } else {
        modal = $('#modal--toast');
    }

    if (message && typeof message === 'string') {
        modal.find('.modal-body').text(message);
    }
    $('body').append(modal);
    modal.modal('show');
}
