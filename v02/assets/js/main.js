    $(document).ready(function() {


    	//Random Image For slider
        function shuffleList() {
            var origCarouselList = $("#flex-carousel-H ul.slides li").detach();
            var origSlideerList = $("#flex-slider-H ul.slides li").detach();
            var newCarouselList = origCarouselList.clone();
            var newSlideerList = origSlideerList.clone();

            for (var i = 0; i < newCarouselList.length; i++) {
                //select a random index; the number range will decrease by 1 on each iteration
                var randomIndex = randomInt(newCarouselList.length - i);

                //place the randomly-chosen element into our copy and remove from the original:
                newCarouselList[i] = origCarouselList.splice(randomIndex, 1);
                newSlideerList[i] = origSlideerList.splice(randomIndex, 1);

                //place the element back into into the HTML
                $("#flex-carousel-H ul.slides").append(newCarouselList[i]);
                $("#flex-slider-H ul.slides").append(newSlideerList[i]);
            }
        }

        function randomInt(maxNum) { //returns a random integer from 0 to maxNum-1
            return Math.floor(Math.random() * maxNum);
        }
        shuffleList();

        // flexslider starts
        ! function() {
            if ($("body").hasClass("page-id-homepage")) {

                var Margin = 10; // Right margin of thumbnail in bottom carousel
                var Size; // Number of thumbnails


                function sizer() {
                    if (userAgent.width() < 768) {
                        Size = 3;
                    } else {

                        Size = 4;
                    }
                }
                sizer();

                // The slider being synced must be initialized first
                $('#flex-carousel-H').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    itemWidth: 320,
                    itemMargin: Margin,
                    touch: true,
                    maxItems: Size,
                    minItems: Size,
                    asNavFor: '#flex-slider-H',
                    after: function(slider) {
                        bLazy.revalidate();
                    },
                    start: function() {
                        //global.bLazy.revalidate();
                    }
                });

                $('#flex-slider-H').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    sync: "#flex-carousel-H",
                    after: function(slider) {
                        if (!!slider.currentSlide) {
                            // This if will avoid touch down bug for first image on touch devices https://github.com/woocommerce/FlexSlider/issues/1638
                            bLazy.revalidate();
                        }
                        var index = $("#flex-slider-H .slides li.flex-active-slide").index();
                        if (!!$("#flex-slider-H .descriptions > .flex-caption.active").length) {
                            $("#flex-slider-H .descriptions > .flex-caption.active").removeClass("active");
                            $("#flex-slider-H .descriptions > .flex-caption").eq(index).addClass("active");
                        }
                    },
                    start: function() {

                    }
                });

                $(".flex-prev").html("<span class='visuallyhidden'>Previous</span>");
                $(".flex-next").html("<span class='visuallyhidden'>Next</span>");

                function flexSizer() {
                    $(window).off("resize", flexSizer);

                    for (var i = 1; i < 5; i++) {
                        setTimeout(function() {
                            sizer();
                            $('#flex-carousel-H').data('flexslider').vars.minItems = Size;
                            $('#flex-carousel-H').data('flexslider').vars.maxItems = Size;
                            $('#flex-carousel-H').data('flexslider').vars.itemMargin = Margin;
                            $('#flex-carousel-H').data('flexslider').resize();
                            $('#flex-slider-H').data('flexslider').resize();
                        }, i * 250);
                    }

                    setTimeout(function() {
                        sizer();
                        $('#flex-carousel-H').data('flexslider').vars.minItems = Size;
                        $('#flex-carousel-H').data('flexslider').vars.maxItems = Size;
                        $('#flex-carousel-H').data('flexslider').vars.itemMargin = Margin;
                        $('#flex-carousel-H').data('flexslider').resize();
                        $('#flex-slider-H').data('flexslider').resize();
                        $(window).on("resize", flexSizer);
                    }, 1300);

                }

                flexSizer(); // unknown buggy hack to set thumbnails propery on domready. plus set wondow.resize

                if (!userAgent.isTouchDevice()) {


                    var clicker;
                    var direction;
                    $("#flex-carousel-H .flex-direction-nav a").mouseenter(function() {
                        if ($(this).hasClass("flex-next")) {
                            direction = "next";
                        } else {
                            direction = "prev";
                        }
                        $('#flex-carousel-H').flexslider(direction);
                        clicker = setInterval(function() {
                            $('#flex-carousel-H').flexslider(direction);
                        }, 1650);
                    });
                    $("#flex-carousel-H .flex-direction-nav a").mouseleave(function() {
                        clearInterval(clicker);
                    });
                    $("#flex-carousel-H .flex-direction-nav a").click(function() {
                        clearInterval(clicker);
                        $(this).trigger("mouseenter");
                    });


                    $("#flex-carousel-H .slides > li").mouseenter(function() {
                        $(this).trigger("click");
                    });

                    $("#flex-slider-H").hover(function() {
                        var index = $("#flex-slider-H .slides li.flex-active-slide").index();
                        $("#flex-slider-H .descriptions > .flex-caption").eq(index).addClass("active");
                    }, function() {
                        $("#flex-slider-H .descriptions > .active").removeClass("active");
                    });
                }

                //email and phone traingular canvas starts
                /*
                $.each($(".skew-triangle"), function() {
                    var canvas = this;
                    if (canvas.getContext) {
                        var ctx = canvas.getContext('2d');
                        ctx.fillStyle = "#f5f5f5";
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(15, 28);
                        ctx.lineTo(0, 56);
                        ctx.fill();
                    }
                });

                 $.each($(".db-triangle"), function() {
                    var canvas = this;
                    if (canvas.getContext) {
                        var ctx = canvas.getContext('2d');
                        ctx.fillStyle = "#f5f5f5";
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(15, 0);
                        ctx.lineTo(15, 56);
                        ctx.lineTo(0, 56);
                        ctx.lineTo(15, 28);
                        ctx.lineTo(0, 0);
                        ctx.fill();
                    }
                });
                */

                //touch devices content on slide functionality

                $(".touch .desc-list .circular-overlay").click(function(e) {
                    e.stopPropagation();
                });

                $(".touch .desc-list").click(function(e) {

                    var index = $("#flex-slider-H .slides li.flex-active-slide").index();
                    if (!$("#flex-slider-H .descriptions > .flex-caption.active").length) {
                        $("#flex-slider-H .descriptions > .flex-caption.active").removeClass("active");
                        $("#flex-slider-H .descriptions > .flex-caption").eq(index).addClass("active");
                    } else {
                        $("#flex-slider-H .descriptions > .flex-caption.active").removeClass("active");
                    }

                    $("#flex-slider-H").toggleClass("open");

                    if ($("#flex-slider-H").hasClass("open")) {
                        $(document).on("click.desc", function(e) {
                            if (!$(e.target).closest("#flex-slider-H").length) {
                                $("#flex-slider-H").removeClass("open");
                                $("#flex-slider-H .descriptions > .flex-caption.active").removeClass("active");
                                $(document).off("click.desc");

                            }
                        });
                    } else {
                        $(document).off("click.desc");
                    }

                });

            }


        }();
        //Flex slider finishes


    });