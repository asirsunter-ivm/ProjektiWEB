$(document).ready(function () {

    $('a[href*="#"]').on('click', function (e) {

        const hash = this.hash;

        if (hash && $(hash).length) {

            e.preventDefault();

            $('html, body').animate({

                scrollTop: $(hash).offset().top - 80

            }, 600);

        }

    });

    $('#trackForm').on('submit', function (e) {

        e.preventDefault();

        const tn = $('input[name="tracking_code"]').val().trim();

        if (!tn) return;

        $('#trackingProgress').hide();

        $.getJSON(

            'api/packages/track.php?tn=' + encodeURIComponent(tn),

            function (res) {

                if (!res.success) {
                    alert(res.message);
                    return;
                }

                $('#trackingProgress').fadeIn();

                let step = 1;

                switch (res.package.status_label) {

                    case 'Paketa u krijua': step = 1; break;
                    case 'Ne Aeroport': step = 2; break;
                    case 'Ne Dogane': step = 3; break;
                    case 'Ne Poste': step = 4; break;
                    case 'Korrieri po vjen': step = 5; break;
                    case 'Dorezuar': step = 6; break;

                    default: step = 1;
                }

                updateTrackingProgress(step);

            }

        );

    });

    function updateTrackingProgress(step) {

        $('.progress-step').removeClass('active');

        $('.progress-step').each(function (index) {

            if (index < step) {
                $(this).addClass('active');
            }

        });

        $('#trackingProgress').fadeIn();
    }

    $('#sendPackageBtn').on('click', function () {

        $.getJSON('api/auth/check-session.php', function (res) {

            if (res.loggedIn) {

                window.location.href = 'send-package.php';

            } else {

                $('html, body').animate({

                    scrollTop: $('#authSection').offset().top - 80

                }, 700);

            }

        });

    });

    $('#navAccount').on('click', function (e) {

        e.preventDefault();

        $.getJSON('api/auth/check-session.php', function (res) {

            if (res.loggedIn) {

                $('#accountDropdown').toggle();

            } else {

                $('html, body').animate({

                    scrollTop: $('#authSection').offset().top - 80

                }, 700);

            }

        });

    });

    $('#showRegisterForm').on('click', function (e) {

        e.preventDefault();

        $('#loginCard').hide();

        $('#registerCard').fadeIn(300);

    });

    $('#showLoginForm').on('click', function (e) {

        e.preventDefault();

        $('#registerCard').hide();

        $('#loginCard').fadeIn(300);

    });

    $('#loginFormNew').on('submit', function (e) {

        e.preventDefault();

        $.post(

            'api/auth/login.php',

            $(this).serialize(),

            function (res) {

                if (res.success) {

                    alert('Login u krye me sukses!');

                    window.location.href = res.redirect;

                } else {

                    alert(res.message);

                }

            },

            'json'

        );

    });

    $('#registerFormNew').on('submit', function (e) {

        e.preventDefault();

        $.post(

            'api/auth/register.php',

            $(this).serialize(),

            function (res) {

                if (res.success) {

                    alert('Llogaria u krijua me sukses!');

                    $('#registerCard').hide();

                    $('#loginCard').fadeIn(300);

                } else {

                    alert(res.message);

                }

            },

            'json'

        );

    });

    $('.stars span').on('click', function () {

        let rating = $(this).data('value');

        $('#ratingValue').val(rating);

        $('.stars span').removeClass('active');

        $('.stars span').each(function () {

            if ($(this).data('value') <= rating) {
                $(this).addClass('active');
            }

        });

    });

    $('#contactForm').on('submit', function (e) {

        e.preventDefault();

        $.post(

            'api/contact/send-message.php',

            $(this).serialize(),

            function (res) {

                $('#contactMsg')
                    .text(res.message)
                    .removeClass('error-msg success-msg')
                    .addClass(res.success ? 'success-msg' : 'error-msg')
                    .show();

                if (res.success) {

                    alert('Mesazhi juaj u dergua!');

                    $('#contactForm')[0].reset();

                }

            },

            'json'

        );
   });

    $('#reviewForm').on('submit', function (e) {

        e.preventDefault();

        if ($('#ratingValue').val() == 0) {

            $('#reviewMsg')
                .text('Ju lutem zgjidhni nje vleresim me yje.')
                .removeClass('success-msg')
                .addClass('error-msg')
                .show();

            return;

        }

        $.post(

            'api/contact/submit-review.php',

            $(this).serialize(),

            function (res) {

                $('#reviewMsg')
                    .text(res.message)
                    .removeClass('error-msg success-msg')
                    .addClass(res.success ? 'success-msg' : 'error-msg')
                    .show();

                if (res.success) {

                    alert('Vleresimi juaj u dergua!');

                    $('#reviewForm')[0].reset();

                    $('.stars span').removeClass('active');

                    $('#ratingValue').val(0);

                }

            },

            'json'

        );

    });


    $(document).on('click', function (e) {

        if (!$(e.target).closest('.account-wrapper').length) {

            $('#accountDropdown').hide();

        }

    });

});