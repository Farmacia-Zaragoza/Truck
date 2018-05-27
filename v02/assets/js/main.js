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
                var bLazy = new Blazy();

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

        
        //social_btn start
            $('.dev_future .social_btn').fadeOut(300);
            $('.dev_future .social_btn_cls').on('click', function(){
                $('.dev_future .social_btn').fadeToggle(300);
                //$('.dev_future #all_social_cls').css('transform', 'rotate(45deg)');
                //alert('clicked');
            });
        
            
//             var status = false;
//
//             volume_mute.addEventListener('click', function(){
//
//                    if(status == 'true'){// if status = true
//                         this.style = 'background:#607266';
//                         $('audio').prop('volume', 1.0);
//                         status = false;
//                       }else{
//                         this.style = 'background: #f70f0f';
//                         $('audio').prop('volume', 0.0);
//                         status = true;
//                         }
//             }); 
        
            $('.social_btn a').on('click', function(e){
                e.preventDefault();
            });
            $('#all_social_cls').on( 'mouseenter', function(){
                $('#all_social_cls').trigger('click');
               // alert('CLICKED 2');
            });
        
            var all_social_cls = document.getElementById('all_social_cls');
            var status = false;
            all_social_cls.addEventListener('mouseenter', function(){
                if(status == true){
                    $('#all_social_cls').css({'transform' : 'rotate(180deg)', 'color' : '#150374'});
                    console.log('forward'); 
                    $('.dev_future .hide_all').hide();
                    $('.dev_future .social_close_btn').hide();
                    status = false;
                }else{
                    $('#all_social_cls').css({'transform' : 'rotate(45deg)', 'color' : '#aa0101'});
                    console.log('back'); 
                    $('.dev_future .social_close_btn').show();
                    status = true;
                }
            });
        
             $('.dev_future .social_close_btn').on('click mouseover', function(){
                $('.dev_future .facebook_feed').hide();
                $('.dev_future .twitter_feed').hide();
                $('.dev_future .social_wrapper').hide();
                $('.dev_future .google_feed').hide();
                $('.dev_future .linkedin_feed').hide();
                $('.dev_future .google_map_area').hide();
                //$(this).hide();
            }); 
        
             $('.dev_future .facebook_btn').on('click mouseover', function(){
                $('.dev_future .facebook_feed').show();
                $('.dev_future .twitter_feed').hide();
                $('.dev_future .google_feed').hide();
                $('.dev_future .linkedin_feed').hide();
                $('.dev_future .social_wrapper').show();
                $('.dev_future .google_map_area').hide();
            }); 
             $('.dev_future .twitter_btn').on('click mouseover', function(){
                $('.dev_future .facebook_feed').hide();
                $('.dev_future .google_feed').hide();
                $('.dev_future .linkedin_feed').hide();
                $('.dev_future .twitter_feed').show();
                $('.dev_future .social_wrapper').show();
                $('.dev_future .google_map_area').hide();
            });  
             $('.dev_future .linkedin_btn').on('click mouseover', function(){
                $('.dev_future .facebook_feed').hide();
                $('.dev_future .twitter_feed').hide();
                $('.dev_future .social_wrapper').show();
                $('.dev_future .google_feed').hide();
                $('.dev_future .linkedin_feed').show();
                $('.dev_future .google_map_area').hide();
            });  
             $('.dev_future .google_btn').on('click mouseover', function(){
                $('.dev_future .facebook_feed').hide();
                $('.dev_future .twitter_feed').hide();
                $('.dev_future .social_wrapper').show();
                $('.dev_future .google_feed').show();
                $('.dev_future .linkedin_feed').hide();
                $('.dev_future .google_map_area').hide();
            });    
             $('.dev_future .google_map_btn').on('click mouseover', function(){
                $('.dev_future .facebook_feed').hide();
                $('.dev_future .twitter_feed').hide();
                //$('.dev_future .social_wrapper').show();
                $('.dev_future .google_map_area').show();
                $('.dev_future .google_feed').hide();
                $('.dev_future .linkedin_feed').hide();
            });      
            

    });