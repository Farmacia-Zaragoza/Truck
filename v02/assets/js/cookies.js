    $(document).ready(function() {   

        //cookie banner to show for first time visitor
        //must be at last of every thing
        ! function() {

            if ($("body").hasClass("page-id-homepage")) {
                //if ( !cookie.getCookie("ever_visited_flat") ) {
                if ( true ) {

                    var expires = new Date();
                    expires.setFullYear(expires.getFullYear() + 1);
                    expires = expires.toUTCString();

                    //cookie.setCookie("ever_visited_flat", "YES", expires);
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
                    
                    //hide by click button
                    $('.close_symbol').on('click', function(){
                        $("footer .cookies").hide();
                    });
                    
                    
                    
                }

            }
        }();
        
    });