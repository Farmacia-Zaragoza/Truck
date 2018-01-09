
/* Client Captcha Code Start*/

    ;(function(window, document, $, undefined) {

        var possibleCharacters = "ABCDGHIJKLMNPQRSTUVWXYZabcdefghkmnpqrstuvwxyz123456789";

        //removed following characters: i j E F O l o 0

        var defaults = {

            selector: "#captcha",
            text: null,
            randomText: true,
            randomColours: true,
            width: 244,
            height: 163,
            colour1: null,
            colour2: null,
            font: 'normal 40px "Comic Sans MS", cursive, sans-serif',
            onSuccess: function() {
                alert('Correct!');
            },
            onFailure: function() {
                alert('wrong!');
            }
        };

        var CAPTCHA = function(config) {

            var that = this;

            this._settings = $.extend({}, defaults, config || {});

            this._container = $(this._settings.selector);

            var canvasWrapper = $('<div>').prependTo(this._container);

            this._canvas = $('<canvas>').appendTo(canvasWrapper).attr("width", this._settings.width).attr("height", this._settings.height);

            this._input = this._container.find('.user-text').on('keypress.captcha', function(e) {
                    if (e.which == 13) {
                        that.validate(that._input.val());
                    }
                });                

            this._button = this._container.find('.validate')
                .on('click.captcha', function() {
                    that.validate(that._input.val());
                });

            this._buttonRefresh = this._container.find('.refresh')
                .on('click.captcha', function() {
                    that.generate();
                });

            this._context = this._canvas.get(0).getContext("2d");

        };

        CAPTCHA.prototype = {

            generate: function() {

                var context = this._context;

                //if there's no text, set the flag to randomly generate some
                if (this._settings.text == null || this._settings.text == '') {
                    this._settings.randomText = true;
                }

                if (this._settings.randomText) {
                    this._generateRandomText();
                }

                if (this._settings.randomColours) {
                    this._settings.colour1 = this._generateRandomColour();
                    this._settings.colour2 = this._generateRandomColour();
                }                

                var gradient1 = context.createLinearGradient(0, 0, this._settings.width, 0);
                gradient1.addColorStop(0, this._settings.colour1);
                gradient1.addColorStop(1, this._settings.colour2);

                context.fillStyle = gradient1;
                context.fillRect(0, 0, this._settings.width, this._settings.height);

                context.fillStyle = "rgba(255,255,255,0.65)";
                context.fillRect(0, 0, this._settings.width, this._settings.height);

                var gradient2 = context.createLinearGradient(0, 0, this._settings.width, 0);
                gradient2.addColorStop(0, this._settings.colour2);
                gradient2.addColorStop(1, this._settings.colour1);

                context.font = this._settings.font;
                context.fillStyle = gradient2;

                context.setTransform((Math.random() / 10) + 0.9, //scalex
                    0.1 - (Math.random() / 5), //skewx
                    0.1 - (Math.random() / 5), //skewy
                    (Math.random() / 10) + 0.9, //scaley
                    (Math.random() * 20) + 10, //transx
                    100); //transy

                context.fillText(this._settings.text, 0, 0);

                context.setTransform(1, 0, 0, 1, 0, 0);

                var numRandomCurves = Math.floor((Math.random() * 3) + 5);

                for (var i = 0; i < numRandomCurves; i++) {
                    this._drawRandomCurve();
                }
            },

            validate: function(userText) {
                if (userText.toUpperCase() === this._settings.text.toUpperCase()) {
                    this._settings.onSuccess();
                } else {
                    this._settings.onFailure();
                }
            },

            _drawRandomCurve: function() {

                var ctx = this._context;

                var gradient1 = ctx.createLinearGradient(0, 0, this._settings.width, 0);
                gradient1.addColorStop(0, Math.random() < 0.5 ? this._settings.colour1 : this._settings.colour2);
                gradient1.addColorStop(1, Math.random() < 0.5 ? this._settings.colour1 : this._settings.colour2);

                ctx.lineWidth = Math.floor((Math.random() * 4) + 2);
                ctx.strokeStyle = gradient1;
                ctx.beginPath();
                ctx.moveTo(Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)));
                ctx.bezierCurveTo(Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)),
                    Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)),
                    Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)));
                ctx.stroke();
            },

            _generateRandomText: function() {
                this._settings.text = '';
                var length = 5; //Math.floor((Math.random() * 3) + 6);
                for (var i = 0; i < length; i++) {
                    this._settings.text += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
                }
            },

            _generateRandomColour: function() {
                return "rgb(" + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ")";
            }
        };

        $.Captcha = CAPTCHA || {};

    }(window, document, jQuery));

/* Client Captcha Code End*/



/* Main_live Start from here */

(function($) {
    $(document).ready(function() {
        'use strict';

        // Replace no-js and adjust touch classes
        ! function() {
            document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'js');
            var yesIfTouchDevice = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
            if (yesIfTouchDevice) {
                document.documentElement.className += " touch";
            } else {
                document.documentElement.className += " no-touch";
            }
        }();
        //replacing no-js and touch finishes

        // Global Module starts: For user agent device details
        var userAgent = function() {
            var yesIfTouchDevice = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
            var yesIfRatina = (window.devicePixelRatio > 1);

            function isTouchDevice() {
                return yesIfTouchDevice;
            }

            function isRatina() {
                return yesIfRatina;
            }

            function width() {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            }


            return {
                isTouchDevice: isTouchDevice,
                isRatina: isRatina,
                width: width
            }
        }();

        //for some instatnt viewport change issue fix
        var viewPortWidth = userAgent.width();
        $(window).on('resize orientationChange', function(event) {
            viewPortWidth = userAgent.width();
        });

        //Relode On Resize / ZoomIn/Out
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        $(window).resize(function() {
            if(windowWidth != $(window).width() || windowHeight != $(window).height()) {
                location.reload();
                return;
            }
        });
        // Global Module finishes: User Agent


        // Custom cookie global object to store all cookie related stuff
        var cookie = function() {
            function setCookie(name, value, expires, path, domain) {
                //value MUST NOT BE encoded and expires must me of UTC/GMT format
                var cookie = name + "=" + encodeURIComponent(value) + ";";
                if (!!expires) {
                    cookie += "expires=" + expires + ";";
                }
                if (!!path) {
                    cookie += "path=" + path + ";";
                }
                if (domain) {
                    cookie += "domain=" + domain + ";";
                }
                document.cookie = cookie;
            };

            function getCookie(cname) {
                var name = cname + "=";
                //cookie value must alwasy be encoded with uriEncodeComponent
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }

            return {
                setCookie: setCookie,
                getCookie: getCookie
            }

        }();






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



        /* Flag or Language Section Start */

            ! function() {
                 if ($("body").hasClass("page-id-homepage")) {

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
                             $(".lang-grand .arrow-right > svg.arrow").on("mouseenter", function() {

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
                             $(".lang-grand .arrow-left > svg.arrow").on("mouseenter", function() {

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
                             $(".lang-grand svg.arrow").mouseleave(function() {
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
             if ($("body").hasClass("page-id-homepage")) {
                //chnaging both sidebar width dynamically
                  var container_width = $('.container').width();
                  // console.log("container_width",container_width);
                  
                  var calculated_width = Math.floor(($(window).width()/2)-(container_width/2));
                  $('.left-sidebar, .right-sidebar').css('width', (calculated_width-.5)+'px');
                  // console.log("calculated_width",calculated_width);

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
                  var truck_folder_name = $("#truck_folder_name").html();
                  console.log('mini truck Image folder: '+truck_folder_name);
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
                  var baseURL = location.protocol+'//'+location.hostname+'/';
                  // var baseURL = location.href;
                  //var baseURL = prot+'//'+hst+'/';
                  console.log(baseURL);

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
                      $(".left-sidebar").append("<a href='"+linksArray[img_index]+"'><img index='"+img_index+"' src='"+baseURL+truck_folder_name+"/trucks_light/" + imageName + ".png'></a>");
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
                        $(this).attr('src', baseURL+truck_folder_name+'/trucks/' + imgsArray[img_index] + '.png')
                    });

                    $('.left-sidebar a img, .right-sidebar a img').mouseleave(function(){
                        var img_index = ($(this).attr('index'));
                        $(this).attr('src', baseURL+truck_folder_name+'/trucks_light/' + imgsArray[img_index] + '.png')
                    });
             }
         }();
        /* Sidebar End */

        // Responsive Flag Combo
        if(viewPortWidth <= 767 ){

            $('.lang-container a.pop-container-L.active').mouseenter(function(){
                $('.lang-container .flags').css('overflow', 'visible');
            });

            $('.lang-container .flags').mouseleave(function(){
                $('.lang-container .flags').css('overflow', 'hidden');
            });
        }


    /* Policy controls Start */

        var scrollDiv = $(".policy_text_container");
        var policy_auto_scroll_enabled = true;
        var policy_keyboard_control_enabled = true;

        $('.zoom_control_button').click(function() {
            var incress = $(this).hasClass('zoom_in_policy'); //check which button it is. zoom in or out
            var fontSize = parseFloat(scrollDiv.css('font-size'));
            if(incress)
                scrollDiv.css('font-size', `${fontSize * 1.2}px`);
            else
                scrollDiv.css('font-size', `${fontSize * 0.8}px`);
        });
        
        $('.auto_scroll_button').click(function() {
            policy_auto_scroll_enabled = !policy_auto_scroll_enabled;
            $(this).toggleClass('auto_scroll_enabled');
        });
        
        $('.keyboard_control_button').click(function() {
            policy_keyboard_control_enabled = !policy_keyboard_control_enabled;
            $(this).toggleClass('keyboard_control_enabled');
        });

        function auto_scroll_down(){
            scrollDiv.stop();
            var remHeight = scrollDiv[0].scrollHeight - scrollDiv.height();
            var pos = scrollDiv.scrollTop();
            var scrollableHeight = remHeight - pos;
            var scrollSpeed = scrollableHeight * 20;
            scrollDiv.animate({
                scrollTop: remHeight
            },{
                duration: scrollSpeed,
                easing: "linear"
            });
        };

        function auto_scroll_up(){
            scrollDiv.stop();
            var pos = scrollDiv.scrollTop();
            var scrollSpeed = pos * 20;
            scrollDiv.animate({
                scrollTop: 0
            },{
                duration: scrollSpeed,
                easing: "linear"
            });
        };


        $(document).keydown(function (e) {

            if (policy_keyboard_control_enabled)
            {
                if (e.keyCode == 38) //ArrowUp Key
                    auto_scroll_up();

                else if (e.keyCode == 40)  //ArrowDown key
                   auto_scroll_down();
                
                else if (e.keyCode == 13) //Return/Enter
                    scrollDiv.stop();
            }

        });

        var autoScrollTrigger = $(".auto_scroll_trigger");
        autoScrollTrigger.hover(function() {
            if(policy_auto_scroll_enabled){
                if($(this).hasClass('trigger_up')) //check which trigger it is. up or down
                    auto_scroll_up();
                else
                    auto_scroll_down();
            }
        }, function() {
            if(policy_auto_scroll_enabled)
                scrollDiv.stop();
        });


    /* Policy controls End */

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

        //cookie banner to show for first time visitor
        //must be at last of every thing
        ! function() {

            if ($("body").hasClass("page-id-homepage")) {
                if ( !cookie.getCookie("ever_visited_flat") ) {

                    var expires = new Date();
                    expires.setFullYear(expires.getFullYear() + 1);
                    expires = expires.toUTCString();

                    cookie.setCookie("ever_visited_flat", "YES", expires);
                    //alert("set cookie for first visit");

                    $("footer .cookies").show();

                    $("footer .cookies").addClass("fadein");

                    var hasrun = false;

                    function cookieHider() {
                        $(document).off(allEvents, cookieHider);
                        if (!hasrun) {
                            hasrun = true;
                            $("footer .cookies").delay(2000).queue(function() {
                                console.log("2 sec passed");
                                $(this).addClass("fadeout").dequeue();
                            }).delay(3000).queue(function() {
                                console.log("5 sec passed");
                                $(this).hide().dequeue();
                            });
                        }
                    }

                    //all events exept onload ready etc
                    var allEvents = 'blur change click contextmenu dblclick error focus focusin focusout hover keydown keyup keypress mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup scroll select submit touchstart wheel';
                    $(document).one(allEvents, cookieHider);
                }

            }
        }();

    });
})(jQuery);

/* Drift Async Module Start */

! function() {
    var t;
    if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void(window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0,
        t.methods = ["identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on"],
        t.factory = function(e) {
            return function() {
                var n;
                return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
            };
        }, t.methods.forEach(function(e) {
            t[e] = t.factory(e);
        }), t.load = function(t) {
            var e, n, o, i;
            e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"),
                o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js",
                n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
        });
}();
drift.SNIPPET_VERSION = '0.3.1';
// old    drift.load('r8ez9x624k5p');
var driftCode =  $('#driftCode').html();
drift.load(driftCode);

/* Drift Async Module End */