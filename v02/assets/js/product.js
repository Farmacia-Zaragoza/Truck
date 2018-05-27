jQuery(document).ready(function($) {
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