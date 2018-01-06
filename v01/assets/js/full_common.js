
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


