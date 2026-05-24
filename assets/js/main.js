jQuery(function($) {

    $('a[href*="#"]').on('click', function (e) {
        var hash = this.hash;
        if (hash && $(hash).length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: $(hash).offset().top - 80 }, 600);
        }
    });

    $('#navAccount').on('click', function (e) {
        e.preventDefault();
        $.getJSON('api/auth/check-session.php', function (res) {
            if (res.loggedIn) $('#accountDropdown').toggle();
            else $('#loginModal').fadeIn();
        });
    });

    $('.modal-close').on('click', function () {
        $(this).closest('.modal').fadeOut();
    });
    $('.modal').on('click', function (e) {
        if ($(e.target).hasClass('modal')) $(this).fadeOut();
    });
    $('#showRegister').on('click', function (e) {
        e.preventDefault();
        $('#loginModal').hide();
        $('#registerModal').fadeIn();
    });
    $('#showLogin').on('click', function (e) {
        e.preventDefault();
        $('#registerModal').hide();
        $('#loginModal').fadeIn();
    });

    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        $.post('api/auth/login.php', $(this).serialize(), function (res) {
            if (res.success) window.location.href = res.redirect;
            else $('#loginError').text(res.message).show();
        }, 'json');
    });

    $('#registerForm').on('submit', function (e) {
        e.preventDefault();
        $.post('api/auth/register.php', $(this).serialize(), function (res) {
            if (res.success) window.location.href = res.redirect;
            else $('#registerError').text(res.message).show();
        }, 'json');
    });

    $('#sendPackageBtn').on('click', function () {
        $.getJSON('api/auth/check-session.php', function (res) {
            if (res.loggedIn) window.location.href = 'send-package.php';
            else $('#loginModal').fadeIn();
        });
    });

    $('#trackForm').on('submit', function (e) {
        e.preventDefault();
        var tn = $(this).find('input[name="tracking_code"]').val().trim();
        if (!tn) { alert('Ju lutem fusni nje kod tracking.'); return; }
        $.getJSON('api/packages/track.php?tn=' + encodeURIComponent(tn), function (res) {
            if (!res.success) { alert(res.message); return; }
            $('#trackingProgress').show();
            $('.progress-step .circle').css({'background': '#ddd', 'color': '#666'});
            var statusMap = {'created': 1, 'picked_up': 2, 'in_transit': 3, 'out_for_delivery': 4, 'delivered': 6};
            var stepNum = statusMap[res.package.current_status] || 1;
            $('.progress-step').each(function(i) {
                if (i + 1 <= stepNum) $(this).find('.circle').css({'background': '#1D9E75', 'color': 'white'});
            });
            alert('Kodi: ' + res.package.tracking_code + '\nStatusi: ' + res.package.status_label + '\nDergues: ' + res.package.sender_name + '\nDestinatar: ' + res.package.receiver_name);
        });
    });

    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        $.post('api/contact/send-message.php', $(this).serialize(), function (res) {
            $('#contactMsg').text(res.message)
                .removeClass('error-msg success-msg')
                .addClass(res.success ? 'success-msg' : 'error-msg')
                .show();
            if (res.success) $('#contactForm')[0].reset();
        }, 'json');
    });

    $('.star').on('click', function () {
        var val = $(this).data('value');
        $('#ratingValue').val(val);
        $('.star').css('color', '#ddd');
        $('.star').each(function () {
            if ($(this).data('value') <= val) $(this).css('color', '#f59e0b');
        });
    });

    $('#reviewForm').on('submit', function (e) {
        e.preventDefault();
        if ($('#ratingValue').val() == 0) {
            $('#reviewMsg').text('Ju lutem zgjidhni nje vleresim me yje.').removeClass('success-msg').addClass('error-msg').show();
            return;
        }
        $.post('api/contact/submit-review.php', $(this).serialize(), function (res) {
            $('#reviewMsg').text(res.message)
                .removeClass('error-msg success-msg')
                .addClass(res.success ? 'success-msg' : 'error-msg')
                .show();
            if (res.success) {
                $('#reviewForm')[0].reset();
                $('.star').css('color', '#ddd');
                $('#ratingValue').val(0);
            }
        }, 'json');
    });

});
