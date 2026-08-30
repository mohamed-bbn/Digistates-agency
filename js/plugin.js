$(window).on("load", function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 42) {
            $('.header').addClass("sticky");
        } else {
            if ($(this).scrollTop() < 1) {
                $('.header').removeClass("sticky");
            }
        }
    });

    var colorLi = $(".color li");
    colorLi
        .eq(0).css("backgroundColor", "transparent").end()
        .eq(1).css("backgroundColor", "transparent").end()


    colorLi.click(function() {
        $("link[href*='theme']").attr("href", $(this).attr("data-value"));
        $('.color  li').toggleClass("active");
        $('.logo .night-logo').addClass("active");
    });


    // End color

    $(function() {
        const $languageBox = $(".showboxlanguage");

        function toggleBox($box) {
            $box.stop(true, true).slideToggle("fast");
        }
        $(".language").on("click", function(event) {
            event.stopPropagation();
            toggleBox($languageBox);
        });

        $(".showboxlanguage").on("click", function(event) {
            event.stopPropagation();
        });

        $(document).on("click", function() {
            $languageBox.slideUp("fast");
        });
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


    let counted = false;

    $(window).scroll(function() {

        let counterEl = $('.counter');

        if (counterEl.length === 0) return; // 👈 أهم سطر

        let oTop = counterEl.offset().top - window.innerHeight;

        if (!counted && $(window).scrollTop() > oTop) {

            counterEl.each(function() {
                let $this = $(this),
                    countTo = $this.attr('data-count');

                $({ countNum: $this.text() }).animate({ countNum: countTo }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });

            counted = true;
        }
    });
    /*----------------------------------------
      TOGGLE LIST / MAP VIEW
    ----------------------------------------*/


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

    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        const filterValue = $(this).attr('data-filter');

        if (filterValue === 'all') {
            $('.gallery-item').fadeIn(400);
        } else {
            $('.gallery-item').hide();
            $('.gallery-item[data-category="' + filterValue + '"]').fadeIn(400);
        }
    });


    Fancybox.bind("[data-fancybox]", {
        infinite: true,
        transitionEffect: "fade",
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: [],
                right: ["iterateZoom", "close"],
            },
        },
    });


    new WOW().init();
}); // END window.load

(function($) {
    $.fn.countTo = function(options) {
        options = options || {};

        return $(this).each(function() {
            // set options for current element
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from: $(this).data('from'),
                to: $(this).data('to'),
                speed: $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals: $(this).data('decimals')
            }, options);

            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;

            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};

            $self.data('countTo', data);

            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);

            // initialize the element with the starting value
            render(value);

            function updateTimer() {
                value += increment;
                loopCount++;

                render(value);

                if (typeof(settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }

                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;

                    if (typeof(settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0, // the number the element should start at
        to: 0, // the number the element should end at
        speed: 1000, // how long it should take to count between the target numbers
        refreshInterval: 100, // how often the element should be updated
        decimals: 0, // the number of decimal places to show
        formatter: formatter, // handler for formatting the value before rendering
        onUpdate: null, // callback method for every time the element is updated
        onComplete: null // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    }
}(jQuery));

jQuery(function($) {
    // custom formatting example
    $('.count-number').data('countToOptions', {
        formatter: function(value, options) {
            return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
    });

    // start all the timers
    $('.timer').each(count);

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }


    // Add the following code if you want the name of the file appear on select
    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

});
