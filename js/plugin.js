$(window).on("load", function() {


    $(window).on('scroll', function() {
        var scrollOffset = ($(window).width() <= 999) ? 0 : 400;

        if ($(this).scrollTop() > scrollOffset) {
            $('.header').addClass("sticky");
        } else {
            $('.header').removeClass("sticky");
        }
    });


    /*----------------------------------------
      HEADER STICKY ON SCROLL
    ----------------------------------------*/

    $(function() {
        const navbarMenu = $("#navbar");
        const overlayMenu = $(".overlay");

        $("#burger, .overlay").click(function() {
            navbarMenu.toggleClass("active");
            overlayMenu.toggleClass("active");
        });

        navbarMenu.on("click", "[data-toggle]", function(e) {
            if (window.innerWidth <= 999) {
                e.preventDefault();
                const $menuDropdown = $(this).parent();

                if ($menuDropdown.hasClass("active")) {
                    $menuDropdown.removeClass("active").find(".submenu").removeAttr("style");
                } else {
                    $(".menu-dropdown.active .submenu").removeAttr("style");
                    $(".menu-dropdown.active").removeClass("active");

                    $menuDropdown.addClass("active");
                    $menuDropdown.find(".submenu").css("max-height", $menuDropdown.find(".submenu")[0].scrollHeight + "px");
                }
            }
        });

        $(window).on("resize", function() {
            if (window.innerWidth > 999) {
                navbarMenu.removeClass("active");
                $(".menu-dropdown.active").removeClass("active").find(".submenu").removeAttr("style");
            }
        });
    });

    /*----------------------------------------
      NAVBAR TOGGLE (Burger Menu)
    ----------------------------------------*/

    $('.cancel').click(function() {
        $('.navbar,.overlay').removeClass("active");
    });
    // Close navbar

    $(".menu-item").click(function() {
        $(this).addClass("activelink").siblings().removeClass("activelink");
    });

    // Active menu item highlight


    function setActiveClass(parentSelector, childSelector) {
        $(parentSelector).on("click", childSelector, function() {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings().removeClass("active");
            }
        });
    }
    setActiveClass(".pagination", "li a");

    /*----------------------------------------
      ACTIVE CLASS HANDLER
    ----------------------------------------*/


    function initializeSlider(selector, options) {
        $(selector)
            .on('init', function() {
                $(this).removeClass('slick-loading').addClass('slick-loaded');
                $(".slider-loader").hide();
            })
            .slick(options);
    }

    initializeSlider(".itemslider", {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: '150px',
        responsive: [{
                breakpoint: 999,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '60px'
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '30px'
                }
            }
        ]
    });


    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('.scrollTopBtn').addClass('show');
        } else {
            $('.scrollTopBtn').removeClass('show');
        }
    });

    $('.scrollTopBtn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    /*----------------------------------------
         SCROLL TO TOP BUTTON
       ----------------------------------------*/

    var titleElem = $('#main-title');
    var text = titleElem.text();
    titleElem.empty();
    for (var i = 0; i < text.length; i++) {
        titleElem.append($('<span>', {
            class: 'char',
            text: text[i]
        }));
    }

    var animated = false;

    $(window).on('scroll', function() {
        var aboutSec = $('#about-section');
        if (aboutSec.length === 0) return;

        var sectionTop = aboutSec.offset().top;
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();

        if (scrollTop + windowHeight > sectionTop + 150 && !animated) {
            animated = true;

            $('.img-square').each(function(index) {
                var $sq = $(this);
                setTimeout(function() {
                    $sq.addClass('show');
                }, index * 30);
            });

            $('.char').each(function(index) {
                var $ch = $(this);
                setTimeout(function() {
                    $ch.addClass('reveal');
                }, index * 50);
            });

            $('.bar-wrapper').each(function() {
                var $wrapper = $(this);
                var $fill = $wrapper.find('.bar-fill');
                var $numSpan = $wrapper.find('.num');
                var targetPercent = parseInt($fill.data('percentage'));

                $fill.css('height', targetPercent + '%');

                $({
                    Counter: 0
                }).animate({
                    Counter: targetPercent
                }, {
                    duration: 1500,
                    easing: 'swing',
                    step: function() {
                        $numSpan.text(Math.ceil(this.Counter));
                    }
                });
            });

            $({
                Counter: 0
            }).animate({
                Counter: 99
            }, {
                duration: 1800,
                easing: 'swing',
                step: function() {
                    $('#satisfied-num').text(Math.ceil(this.Counter));
                }
            });

        }
    });
    /*----------------------------------------
        About Section
     ----------------------------------------*/


    function initializeSlider(selector, options) {
        $(selector)
            .on('init', function() {
                $(this).removeClass('slick-loading').addClass('slick-loaded');
                $(".slider-loader").hide();
            })
            .slick(options);
    }




    initializeSlider(".slider-customer", {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });

    /*----------------------------------------
        About Section
     ----------------------------------------*/

    function checkEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkPhone(phone) {
        return /^[0-9+\s-]{8,15}$/.test(phone);
    }

    $('#sessionForm').on('submit', function(e) {
        e.preventDefault();
        let valid = true;

        const name = $('#fullName');
        if ($.trim(name.val()) === '') {
            showErr(name);
            valid = false;
        } else {
            hideErr(name);
        }

        const phone = $('#phone');
        if ($.trim(phone.val()) === '' || !checkPhone(phone.val())) {
            showErr(phone);
            valid = false;
        } else {
            hideErr(phone);
        }

        const email = $('#email');
        if ($.trim(email.val()) === '' || !checkEmail(email.val())) {
            showErr(email);
            valid = false;
        } else {
            hideErr(email);
        }

        const subject = $('#subject');
        if ($.trim(subject.val()) === '') {
            showErr(subject);
            valid = false;
        } else {
            hideErr(subject);
        }


        if (valid) {
            $('#successBox').slideDown();
            $('#sessionForm')[0].reset();
            setTimeout(() => $('#successBox').slideUp(), 4000);
        }
    });

    $('input').on('input', function() {
        if ($.trim($(this).val()) !== '') {
            hideErr($(this));
        }
    });

    function showErr(elem) {
        elem.addClass('input-error');
        elem.siblings('.error-text').fadeIn(150);
    }

    function hideErr(elem) {
        elem.removeClass('input-error');
        elem.siblings('.error-text').fadeOut(150);
    }






    new WOW().init();
}); // END window.load
