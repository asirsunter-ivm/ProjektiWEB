console.log('MAIN.JS LOADED!');

jQuery(function($) {
    console.log('JQUERY READY!');

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
            if (res.loggedIn) {
                $('#accountDropdown').toggle();
            } else {
                $('#loginModal').fadeIn();
            }
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
            if (res.success) {
                window.location.href = res.redirect;
            } else {
                $('#loginError').text(res.message).show();
            }
        }, 'json');
    });

    $('#registerForm').on('submit', function (e) {
        e.preventDefault();
        $.post('api/auth/register.php', $(this).serialize(), function (res) {
            if (res.success) {
                window.location.href = res.redirect;
            } else {
                $('#registerError').text(res.message).show();
            }
        }, 'json');
    });

    $('#sendPackageBtn').on('click', function () {
        $.getJSON('api/auth/check-session.php', function (res) {
            if (res.loggedIn) {
                window.location.href = 'send-package.php';
            } else {
                $('#loginModal').fadeIn();
            }
        });
    });

});
