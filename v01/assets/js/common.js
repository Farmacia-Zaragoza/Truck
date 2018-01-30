$(document).ready(function() {
    'use strict';

	//Relode On Resize / ZoomIn/Out
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        $(window).resize(function() {
            if(windowWidth != $(window).width()) {
                location.reload();
                return;
            }
        });

    // Global BaseURL and Image Folder
      var baseURL = location.protocol+'//'+location.hostname+'/';
      // console.log(baseURL);

      var truck_img_folder_name = $("#truck_folder_name").html();
      // console.log('mini truck Image folder: '+truck_img_folder_name);


        if ($("body").hasClass("page-id-homepage")) {


            //Global blazy module starts
            var bLazy = new Blazy({

                breakpoints: [{
                    width: 767, //max-width
                    src: 'data-src-small'
                }],

                success: function(ele) {
                    $(ele).closest('.image-wrapper').addClass('image-loaded');
                },
                error: function(ele, msg) {

                    var image = $(ele)[0];
                    if (msg === 'missing') {
                        console.warn("Custom ERROR: ", image, " data-src is missing\n");
                    } else if (msg === 'invalid') {
                        console.warn("Custom ERROR: ", image, " data-src is invalid\n");
                    }
                }
            });
            //Global blazy module finishes

        }

        

        //MODULE starts: working of recuerdo-rose like pop up on all links
        ! function() {

            $(".pop-container .link-description").each(function() {
                var str = $(this).text().trim().length;
                if (str < 25) {
                    $(this).addClass("max-25");
                } else if (str < 50) {
                    $(this).addClass("max-50");
                } else if (str < 100) {
                    $(this).addClass("max-100");
                }
            });

            $(".no-touch .pop-link").hover(function() {
                $(this).siblings(".link-description").addClass("active");
            }, function() {
                $(this).siblings(".link-description").removeClass("active");
            });

            $(".touch .plus").click(function(e) {
                $(this).closest(".pop-container").toggleClass("active");
                $(this).parent("h1").toggleClass("active");
                e.preventDefault();
            });

            $(".touch .pop-container-social .icon").on("click", function() {
                $(this).parent(".pop-container-social").toggleClass("active");

            });

            $(document).on("click.popups", function(e) {

                var popContainer = $(e.target).closest(".pop-container");

                $(".pop-container").not(popContainer).children("h1").removeClass("active");
                $(".pop-container").not(popContainer).removeClass("active");

            });



        }();
        //MODULE finishes: working of recuerdo-rose like pop up on all links



        //Namespace starts: marquee both V and H
        ! function() {
            if ($("body").hasClass("page-id-homepage")) {


                $(".marquee").on("revalidate", function() {
                    if ($(this).find(".marquee-content").eq(1).length) {
                        $(this).siblings(".backward, .forward").removeClass("invisible");
                    } else {
                        $(this).siblings(".backward, .forward").addClass("invisible");
                    }
                });

                //marquee common rules for V and H
                $(".marquee").marquee(); //initialization


                $(".no-touch .marquee").siblings(".backward").hover(function() {
                    $(this).siblings(".marquee").trigger("backward");
                }, function() {
                    $(this).siblings(".marquee").trigger("pause");
                });

                $(".no-touch .marquee").siblings(".forward").hover(function() {
                    $(this).siblings(".marquee").trigger("forward");

                }, function() {
                    $(this).siblings(".marquee").trigger("pause");
                });

                $(".no-touch .marquee").on("mouseleave", function() {
                    $(this).trigger("pause");
                });

                $(".no-touch .marquee").on("mouseenter", function() {
                    var hoverMethod = $(this).data("hoverMethod");
                    if (!!hoverMethod) {
                        $(this).trigger(hoverMethod);
                    }
                });


                $(".touch .marquee").siblings(".backward").on("click", function() {
                    $(this).siblings(".marquee").trigger("backward");
                });

                $(".touch .marquee").siblings(".forward").on("click", function() {
                    $(this).siblings(".marquee").trigger("forward");
                });

                $(".touch .marquee").on("click", function() {
                    $(this).trigger("pause");
                });





                /*
         //Module starts: mousemove scrolling of marquee-veritcal
         ! function() {


             //Replaced mousemove with mouseleave and added arrow signs

             var $backward = false; //is running backward?
             var $forward = false; //is running forward?

             function autoscroller(e) {
                 $(this).off("mousemove", autoscroller);
                 var that = this; //so that `this` could be used inside timeout
                 setTimeout(function() {

                     var y = e.pageY - $(that).offset().top;

                     if ((y <= 50) && ($backward == false)) {
                         $backward = true;
                         $(that).find(".marquee").trigger("backward");
                     } else if ((y >= ($(that).outerHeight() - 50)) && ($forward == false)) {
                         $forward = true;
                         $(that).find(".marquee").trigger("forward");
                     } else if ((y > 50) && (y < $(that).outerHeight() - 50)) {
                         $backward = $forward = false;
                         $(that).find(".marquee").trigger("pause");
                     }

                     $(that).on("mousemove", autoscroller);
                 }, 50);
             }

             $(".no-touch .flex-caption").on("mousemove", autoscroller);



             $(".no-touch .flex-caption").on("mouseleave", function() {
                 var that = this;
                 setTimeout(function() {
                     $backward = $forward = false;
                     $(that).find(".marquee").trigger("pause");
                 }, 70);
             });




         }();
         //Module starts: mousemove scrolling of marquee


         //Module starts: mousemove scrolling of marquee-horizontal
         ! function() {
             var $backward = false; //is running backward?
             var $forward = false; //is running forward?

             function autoscroller(e) {

                 $(this).off("mousemove", autoscroller);
                 var that = this; //so that `this` could be used inside timeout
                 setTimeout(function() {

                     var x = e.pageX - $(that).offset().left;

                     if ((x <= 30) && ($backward == false)) {
                         $backward = true;
                         $(that).find(".marquee").trigger("backward");

                     } else if ((x >= ($(that).outerWidth() - 30)) && ($forward == false)) {

                         $forward = true;
                         $(that).find(".marquee").trigger("forward");
                     } else if ((x > 50) && (x < $(that).outerWidth() - 50)) {

                         $backward = $forward = false;
                         $(that).find(".marquee").trigger("pause");
                     }

                     $(that).on("mousemove", autoscroller);
                 }, 50);
             }

             $(".no-touch .address").on("mousemove", autoscroller);

             $(".no-touch .address").on("mouseleave", function() {
                 var that = this;
                 setTimeout(function() {
                     console.log("out");
                     $backward = $forward = false;
                     $(that).find(".marquee").trigger("pause");
                 }, 70);
             });


         }();
         //Module starts: mousemove scrolling of marquee-horizontal
        */

            }
        }();
        //Namespace marquee both V and H ends



        // yaml content ajax loading module starts (this feauture has been removed and this portion can be removed)
        ! function() {
            if ($("body").hasClass("page-id-policy3") && $("html").hasClass("no-touch")) {

                /*
                    //commented out because we need simpler json/yaml format
                 var jsonData = window.globalJsonData.policy;

                 $("header h1").prepend($("<div/>").text(jsonData.header.title));
                 $("header .inverse-skew").prepend($("<div/>").text(jsonData.header.description));

                 function recursiveHtmlAppender(data, ele) {
                     if ($.type(data) == "array") {
                         for (var i = 0; i < data.length; ++i) {

                             var key = Object.keys(data[i])[0];
                             ele.append("<" + key + ">");
                             var new_ele = ele.children().last();

                             recursiveHtmlAppender(data[i][key], new_ele);
                         }
                     } else {
                         ele.append(data);
                     }
                 }

                 recursiveHtmlAppender(jsonData.content, $("body > .container"));

                 */

                YAML.load('policy3.yaml', function(data) {

                    for (var prop in data.content) {
                        $('[data-yaml = "' + prop + '"]').prepend(data.content[prop]);
                    }

                    for (var prop in data.links) {
                        $('[data-link = "' + prop + '"]').attr("href", data.links[prop]);
                    }
                });

            }
        }();
        // yaml module finishes

        //Captcha chat module starts
        ! function() {
            if ($("body").hasClass("page-id-homepage")) {

                var protocol = location.protocol;
                var domain = location.hostname + location.pathname;

                if (!cookie.getCookie("chat_captcha_solved") || protocol == "http:") {

                    var timeout; // Id of setInterval -- glabal so that never overriden on redeclaration

                    $(".captcha-chat").show();
                    var captcha = new $.Captcha({
                        onFailure: function() {

                            $(".captcha-chat .wrong").show({
                                duration: 30,
                                done: function() {
                                    var that = this;
                                    clearTimeout(timeout);
                                    $(this).removeClass("shake");
                                    $(this).css("animation");
                                    //Browser Reflow(repaint?): hacky way to ensure removal of css properties after removeclass
                                    $(this).addClass("shake");
                                    var time = parseFloat($(this).css("animation-duration")) * 1000;
                                    timeout = setTimeout(function() {
                                        $(that).removeClass("shake");
                                    }, time);
                                }
                            });

                        },

                        onSuccess: function() {
                            cookie.setCookie("chat_captcha_solved", "YES");
                            if (protocol == "http:") {
                                location.replace("https://" + domain);
                                $("#captcha .refresh, #captcha .validate").off("click.captcha");
                                $("#captcha .user-text").off("keypress.captcha");
                                $(".captcha-chat .wrong").hide();
                                $(".captcha-chat .redirecting").show();
                            } else if (protocol == "https:") {
                                $(document).trigger("captchaSolved");
                                $(".captcha-chat .wrong").hide();
                                $(".captcha-chat .captcha_loading").show();
                                $("#captcha .refresh, #captcha .validate").off("click.captcha");
                                $("#captcha .user-text").off("keypress.captcha");
                                //fire drift show event and catch that in drift ready
                                //now start showing loading in canvas
                            }
                        }
                    });

                    captcha.generate();

                    if (!userAgent.isTouchDevice()) {
                        $(".chat-icon").mouseenter(function() {
                            $(".captcha-container").toggleClass("shown");
                        });
                    } else {
                        $(".chat-icon").click(function() {
                            $(".captcha-container").toggleClass("shown");
                        });
                    }

                }

                drift.on('ready', function(api, payload) {

                    if (!cookie.getCookie("chat_captcha_solved") || protocol == "http:") {
                        api.widget.hide();
                    }

                    else {
                        $(".captcha-chat").hide();
                        api.sidebar.open();
                    }

                    $(document).on("captchaSolved", function(){
                        $(".captcha-chat").hide();
                        api.widget.show();
                        api.sidebar.open();
                    });

                });


            }
        }();
        //captcha chat module finishes

    //Custom marquee for whole policy page
        // I didn't use marqueedirection plugin because it creates a copy of whole marquee content.
        ! function() {
            if ($("body").hasClass("page-id-policy") && $("html").hasClass("no-touch")) {

                var movingUp = false;
                var movingDown = false;

                var speed = $("body").data("speed");

                function throttleScroller(e) {
                    $(window).off("mousemove.marquee");
                    var throttle = setTimeout(function() {

                        var y = e.clientY;
                        var scrollPos = $("body").scrollTop();
                        var scrollHeight = $("body").prop('scrollHeight');
                        var bottomZone = $(window).height() - 100;

                        if ((y < 100) && (movingUp == false) && (scrollPos != 0)) {

                            movingUp = true;
                            movingDown = false;
                            var remainingTime = (scrollPos * 100) / speed;

                            $("body").stop("marqueeQueue");

                            $("body").animate({
                                scrollTop: 0
                            }, {
                                duration: remainingTime,
                                easing: "linear",
                                queue: "marqueeQueue"
                            }).dequeue("marqueeQueue");
                        } else if ((y > bottomZone) && (movingDown == false) && (scrollPos != scrollHeight)) {

                            movingDown = true;
                            movingUp = false;

                            var remainingTime = (scrollHeight - scrollPos) * 100 / speed;

                            $("body").stop("marqueeQueue");

                            $("body").animate({
                                scrollTop: scrollHeight
                            }, {
                                duration: remainingTime,
                                easing: "linear",
                                queue: "marqueeQueue"
                            }).dequeue("marqueeQueue");
                        } else if ((y <= bottomZone) && (y >= 100)) {
                            movingDown = false;
                            movingUp = false;
                            $("body").stop("marqueeQueue");
                        }

                        $(window).on("mousemove.marquee", throttleScroller);
                    }, 100);
                }
                $(window).on("mousemove.marquee", throttleScroller);

            }
        }();

    /* Flag or Language Section Start */

            ! function() {
                 if ($("body").hasClass("page-id-homepage")) {
                     //$(".lang-container a:first-child").addClass('active');
                     var active_top = $(".lang-container a.active").position().top;
                     var active_left = $(".lang-container a.active").position().left;
                     var scrollSpeed = 10;
                     $(document).ready(function() {

                         $(".lang-container .ellipse").css("transform", "translateX(" + active_left + "px" + ")");

                         if (!userAgent.isTouchDevice()) {
                            //mouseenter on a flag
                             $(".lang-container .pop-container-L").mouseenter(function() {

                                 var left = $(this).position().left + $(".lang-container .flags").scrollLeft();
                                 $(".lang-container .ellipse").css("transform", "translateX(" + left + "px" + ")");

                             });

                             //mouseleave from flags
                             $(".lang-container .flags").mouseleave(function() {

                                active_left = $(".lang-container a.active").position().left + $(".lang-container .flags").scrollLeft();

                                $(".lang-container .ellipse").css("transform", "translateX(" + active_left + "px" + ")");

                             });

                             //mouseenter on right-arrow
                             $(".lang-grand .arrow-right > .arrow").on("mouseenter", function() {

                                 var remLength = $(".lang-container .flags")[0].scrollWidth - $(".lang-container .flags").width();
                                 var scrollableLength = remLength - $(".lang-container .flags").scrollLeft();

                                 $(".lang-container .flags").animate({
                                     scrollLeft: remLength
                                 }, scrollSpeed * scrollableLength);

                                 $(".lang-container .ellipse").animate({
                                     left: parseFloat($(".lang-container .ellipse").css("left")) - scrollableLength + "px"
                                 }, scrollSpeed * scrollableLength);

                             });

                             //mouseenter on left-arrow
                             $(".lang-grand .arrow-left > .arrow").on("mouseenter", function() {

                                 var remLength = $(".lang-container .flags")[0].scrollWidth - $(".lang-container .flags").width();
                                 var scrollableLength = remLength - $(".lang-container .flags").scrollLeft();

                                 $(".lang-container .flags").animate({
                                     scrollLeft: 0
                                 }, scrollSpeed * $(".lang-container .flags").scrollLeft());

                                 $(".lang-container .ellipse").animate({
                                     left: parseFloat($(".lang-container .ellipse").css("left")) + $(".lang-container .flags").scrollLeft() + "px"
                                 }, scrollSpeed * $(".lang-container .flags").scrollLeft());

                             });

                             //mouseleave from any arrow
                             $(".lang-grand svg.arrow, .lang-grand img.arrow").mouseleave(function() {
                                 $(".lang-container .flags").stop();
                                 $(".lang-container .ellipse").stop();
                             });

                         } else {

                             var running = false;
                             function stopAnimation() {
                                $(".lang-container .flags").stop();
                                 $(".lang-container .ellipse").stop();
                                 running = false;
                             }

                             $(".lang-grand .arrow-down > svg.arrow").on("click", function() {

                                 if (running == false) {
                                     var remHeight = $(".lang-container .flags")[0].scrollHeight - $(".lang-container .flags").height();
                                     var scrollableHeight = remHeight - $(".lang-container .flags").scrollTop();

                                     $(".lang-container .flags").animate({
                                         scrollTop: remHeight
                                     }, (scrollSpeed * scrollableHeight), stopAnimation);

                                     $(".lang-container .ellipse").animate({
                                         top: parseFloat($(".lang-container .ellipse").css("top")) - scrollableHeight + "px"
                                     }, scrollSpeed * scrollableHeight);

                                     running = true;
                                 } else {
                                     stopAnimation();
                                 }
                             });

                             $(".lang-grand .arrow-up > svg.arrow").on("click", function() {

                                 if (running == false) {
                                     var remHeight = $(".lang-container .flags")[0].scrollHeight - $(".lang-container .flags").height();
                                     var scrollableHeight = remHeight - $(".lang-container .flags").scrollTop();

                                     $(".lang-container .flags").animate({
                                         scrollTop: 0
                                     }, scrollSpeed * $(".lang-container .flags").scrollTop(), stopAnimation);

                                     $(".lang-container .ellipse").animate({
                                         top: parseFloat($(".lang-container .ellipse").css("top")) + $(".lang-container .flags").scrollTop() + "px"
                                     }, scrollSpeed * $(".lang-container .flags").scrollTop());
                                     running = true;
                                 } else {
                                    stopAnimation();
                                 }
                             });

                             $(".lang-grand .arrow-right > svg.arrow").on("click", function() {

                                 if (running == false) {

                                     var remLength = $(".lang-container .flags")[0].scrollWidth - $(".lang-container .flags").width();
                                     var scrollableLength = remLength - $(".lang-container .flags").scrollLeft();

                                     $(".lang-container .flags").animate({
                                         scrollLeft: remLength
                                     }, scrollSpeed * scrollableLength, stopAnimation);

                                     $(".lang-container .ellipse").animate({
                                         left: parseFloat($(".lang-container .ellipse").css("left")) - scrollableLength + "px"
                                     }, scrollSpeed * scrollableLength);
                                     running = true;

                                 } else {
                                     stopAnimation();
                                 }

                             });

                             $(".lang-grand .arrow-left > svg.arrow").on("click", function() {

                                 if (running == false) {

                                     var remLength = $(".lang-container .flags")[0].scrollWidth - $(".lang-container .flags").width();
                                     var scrollableLength = remLength - $(".lang-container .flags").scrollLeft();

                                     $(".lang-container .flags").animate({
                                         scrollLeft: 0
                                     }, scrollSpeed * $(".lang-container .flags").scrollLeft(), stopAnimation);

                                     $(".lang-container .ellipse").animate({
                                         left: parseFloat($(".lang-container .ellipse").css("left")) + $(".lang-container .flags").scrollLeft() + "px"
                                     }, scrollSpeed * $(".lang-container .flags").scrollLeft());
                                     running = true;

                                 } else {
                                     stopAnimation();
                                 }

                             });

                         }


                     });

                     //-----------------

                     //for caption
                     $(".lang-container .pop-container-L").each(function() {
                         var $caption = $(this).data("caption");
                         if(viewPortWidth >= 768){
                            $("body").append(
                                 '<span class="link-description lang">' +
                                 '<span class="inverse-skew">' +
                                 $caption +
                                 '</span>' +
                                 '</span>'
                             );
                         }
                     });

                     //caption on hover
                     $(".lang-container .pop-container-L").hover(function() {
                         var left = $(this).offset().left;
                         var top = $(this).offset().top;
                         var pos = $(this).index();
                         var ele = $("body > .lang.link-description").eq(pos);
                         top = top - 35;
                         ele.css({
                                 top: top + "px",
                                 left: left + "px"
                             })
                             .addClass("active");
                     }, function() {
                         var pos = $(this).index();
                         $("body > .lang.link-description").eq(pos).removeClass("active");
                     });



                 }
             }();


        /* Flag or Language Section End */


     /* Sidebar Starts */
        ! function() {
                //chnaging both sidebar width dynamically
                  var container_width = $('.container').width();
                  var calculated_width = Math.floor(($(window).width()/2)-(container_width/2));
                  $('.left-sidebar, .right-sidebar').css('width', (calculated_width-.5)+'px');

                  var imgsArray = [
                                   "truck_model_001_blue_left",
                                   "truck_model_001_blue_right",
                                   "truck_model_001_green_left",
                                   "truck_model_001_green_right",
                                   "truck_model_001_orange_left",
                                   "truck_model_001_orange_right",
                                   "truck_model_001_red_left",
                                   "truck_model_001_red_right",
                                   "truck_model_002_blue_left",
                                   "truck_model_002_blue_right",
                                   "truck_model_002_darkblue_left",
                                   "truck_model_002_darkblue_right",
                                   "truck_model_002_orange_left",
                                   "truck_model_002_orange_right",
                                   "truck_model_002_pink_left",
                                   "truck_model_002_pink_right",
                                   "truck_model_003_green_left",
                                   "truck_model_003_green_right",
                                   "truck_model_003_white_left",
                                   "truck_model_003_white_right",
                                   "truck_model_004_blue_left",
                                   "truck_model_004_blue_right",
                                   "truck_model_004_green_left",
                                   "truck_model_004_green_right",
                                   "truck_model_004_orange_left",
                                   "truck_model_004_orange_right",
                                   "truck_model_004_red_left",
                                   "truck_model_004_red_right",
                                   "truck_model_005_orange_left",
                                   "truck_model_005_orange_right",
                                   "truck_model_005_red_left",
                                   "truck_model_005_red_right",
                                   "truck_model_005_violet_left",
                                   "truck_model_005_violet_right",
                                   ];
                  var linksMainString = $('#truck_links').data('links');
                  var linksArray = linksMainString.split(",");
                  //console.log(linksArray);
                  if(linksArray === undefined){
                      console.log("Error: There is no link for the trucks");
                      linksArray = [];
                      for(let i=0; i<=imgsArray.length; i++ ){
                          linksArray[i]="#";
                      }
                  }

                  function generateRandomForArray() {
                      var num = Math.floor(Math.random() * imgsArray.length);
                      return num;
                  }

                  function getRandom(min, max) {
                      return Math.floor(Math.random() * (max - min)) + min;
                  }

                  var leftWidth = $('.left-sidebar').width();
                  var leftHeight = $('.left-sidebar').height();
                  //alert(leftWidth);

                  function setLeftImage(left, top, img_index){
                      var imageName = imgsArray[img_index];
                      $(".left-sidebar").append("<a href='"+linksArray[img_index]+"'><img index='"+img_index+"' src='"+baseURL+truck_folder_name+"/trucks_light/" + imageName + ".svg'></a>");
                      $(".left-sidebar a").last().css({"top": top + "px", "left": left + "px"});
                  }

                  function setRightImage(right, top, img_index){
                      var imageName = imgsArray[img_index];
                      $(".right-sidebar").append("<a href='"+linksArray[img_index]+"'><img index='"+img_index+"' src='"+baseURL+truck_folder_name+"/trucks_light/" + imageName + ".png'></a>");
                      $(".right-sidebar a").last().css({"top": top + "px", "right": right + "px"});
                  }

                  //Setting image on both sidebar
                  var top=0, pos = 0;
                  var quarterWidth = Math.floor(leftWidth/4);
                  while( top<leftHeight){
                      pos = getRandom(pos, quarterWidth);

                      var img_index = generateRandomForArray();
                      setLeftImage(pos, top, img_index);

                      img_index = generateRandomForArray();
                      setRightImage(pos, top, img_index);
                      pos+=$('.right-sidebar a').width()+10;

                      quarterWidth = $('.right-sidebar a').width() + pos;

                      if((quarterWidth > leftWidth) && pos!=0){
                          quarterWidth = Math.floor(leftWidth/4);
                          pos = 0;
                          if(userAgent.width() >= 1601){
                              top+=160;
                          } else if (userAgent.width() >=1441) {
                              top+=130;
                          }else if (userAgent.width() >=1367) {
                              top+=120;
                          }else {
                              top+=100;
                          }
                      }

                  }

                    //Change image on hover
                    $('.left-sidebar a img, .right-sidebar a img').mouseenter(function(){
                        var img_index = ($(this).attr('index'));
                        $(this).attr('src', baseURL+truck_folder_name+'/trucks/' + imgsArray[img_index] + '.svg');
                    });

                    $('.left-sidebar a img, .right-sidebar a img').mouseleave(function(){
                        var img_index = ($(this).attr('index'));
                        $(this).attr('src', baseURL+truck_folder_name+'/trucks_light/' + imgsArray[img_index] + '.svg');
                    });
         }();
        /* Sidebar End */

    /* Responsive Flag Combo Start */
        if(viewPortWidth <= 767 ){
            var flagsContainer = $('.lang-container');

            //Moving the active Flag out of the Container
            var activeFlag = $(flagsContainer).find("a.active").detach();
            var activeFlagContainer = document.createElement("div");
            $(activeFlagContainer).addClass('activeFlagContainer');
            $(activeFlagContainer).append(activeFlag);
            $(flagsContainer).append(activeFlagContainer);

            //Adding buttons
            var flagSlideUp = document.createElement("img");
            var flagSlideDown = document.createElement("img");
            flagSlideUp.src = `${baseURL}${truck_img_folder_name}/arrows/brqx_arrow_gray_up_060_2018.svg`;
            flagSlideDown.src = `${baseURL}${truck_img_folder_name}/arrows/brqx_arrow_gray_down_060_2018.svg`;
            $(flagSlideDown).addClass('flagSlideDown').addClass('flagSlideButtons');
            $(flagSlideUp).addClass('flagSlideUp').addClass('flagSlideButtons');
            $(flagsContainer).prepend(flagSlideUp).append(flagSlideDown);
                        
            $('.lang-container .activeFlagContainer>a.active').click(function(event){
                event.preventDefault();
                flagsContainer.toggleClass('mVisible');

                if($(flagsContainer).hasClass('mVisible')){
                    $("body").on("mousewheel", function(e){
                        e.preventDefault(); //preventing mouseWhele Scroll
                    });

                    $(flagsContainer).on("touchmove", function(e){
                        e.preventDefault(); //preventing touch Scroll
                    })
                } else 
                    $("body").unbind(); // reseting mouseWhele Scroll in normal view
            })

            var flagScrollDiv = $(flagsContainer).find('.flags');
            function flag_scroll_down(){
                flagScrollDiv.stop();
                var remHeight = flagScrollDiv[0].scrollHeight - flagScrollDiv.height();
                var pos = flagScrollDiv.scrollTop();
                var scrollableHeight = remHeight - pos;
                var scrollSpeed = scrollableHeight * 20;
                flagScrollDiv.animate({
                    scrollTop: remHeight
                },{
                    duration: scrollSpeed,
                    easing: "linear"
                });
            };

            function flag_scroll_up(){
                flagScrollDiv.stop();
                var pos = flagScrollDiv.scrollTop();
                var scrollSpeed = pos * 20;
                flagScrollDiv.animate({
                    scrollTop: 0
                },{
                    duration: scrollSpeed,
                    easing: "linear"
                });
            };

            $(".flagSlideButtons").hover(function() {
                if($(this).hasClass('flagSlideUp'))
                    flag_scroll_up();
                else
                    flag_scroll_down();
            }, function() {
                $(flagScrollDiv).stop();
            });
        }
        /* Responsive Flag Combo End */

    // loading gif whole page starts
        //must be at second last beofre cookie banner of js file
        //so that loader hides at last
        ! function() {

            $(".loading").fadeOut(500);
            $(".container").delay(500).css("visibility", "visible").fadeTo(500, 1, function() {
                if ($("body").hasClass("page-id-homepage")) {
                    bLazy.revalidate();
                }
            });
        }();

});