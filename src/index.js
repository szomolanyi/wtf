/*jshint esversion:6*/

require("./styles/style.css");
require("jquery");
//require("jquerymobile-swipeupdown");
require("hammerjs");
require("material-design-lite");
require(__dirname+"/../node_modules/material-design-lite/material.css");
require("./assets/logo.png");

/*(function () {
// initializes touch and scroll events
    var supportTouch = $.support.touch,
        scrollEvent = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

    // handles swipeup and swipedown
    $.event.special.swipeupdown = {
        setup: function () {
            var thisObject = this;
            var $this = $(thisObject);

            $this.bind(touchStartEvent, function (event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                    start = {
                        time: (new Date()).getTime(),
                        coords: [ data.pageX, data.pageY ],
                        origin: $(event.target)
                    },
                    stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }

                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event;
                    stop = {
                        time: (new Date()).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }

                $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function (event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                            }
                        }
                        start = stop = undefined;
                    });
            });
        }
    };

//Adds the events to the jQuery events special collection
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function (event, sourceEvent) {
        $.event.special[event] = {
            setup: function () {
                $(this).bind(sourceEvent, $.noop);
            }
        };
        //Adds new events shortcuts
        $.fn[ event ] = function( fn ) {
            return fn ? this.bind( event, fn ) : this.trigger( event );
        };
        // jQuery < 1.8
        if ( $.attrFn ) {
            $.attrFn[ event ] = true;
        }
    });

})();
*/

let wtfhome = {
  screens_lists : [
    'lookbook', 'shop', 'contact', 'about'
  ],
  current_screen : 0,
  scroll_down : function() {
    console.log(`Idem scrollovat dole ${this.current_screen} ${this.screens_lists.length} ${this._scroll_block}`);
    if (this.current_screen >= this.screens_lists.length-1 ||this._scroll_block) return; //last screen
    console.log('Som tam');
    let cur_screen_id = `#wtfid_${this.screens_lists[this.current_screen]}`;
    let next_screen_id = `#wtfid_${this.screens_lists[this.current_screen+1]}`;
    $(cur_screen_id).removeClass('wtfscreen--show');
    $(cur_screen_id).addClass('wtfscreen--up');
    $(next_screen_id).removeClass('wtfscreen--down');
    $(next_screen_id).addClass('wtfscreen--show');
    this.current_screen++;
    this.block_scroll();
  },
  scroll_up: function() {
    console.log(`Idem scrollovat hore ${this.current_screen} ${this._scroll_block}`);
    if (this.current_screen === 0 ||this._scroll_block) return; //first screen
    let cur_screen_id = `#wtfid_${this.screens_lists[this.current_screen]}`;
    let next_screen_id = `#wtfid_${this.screens_lists[this.current_screen-1]}`;
    $(cur_screen_id).removeClass('wtfscreen--show');
    $(cur_screen_id).addClass('wtfscreen--down');
    $(next_screen_id).removeClass('wtfscreen--up');
    $(next_screen_id).addClass('wtfscreen--show');
    this.current_screen--;
    this.block_scroll();
  },
  _scroll_block: false,
  block_scroll: function() {
    this._scroll_block = true;
    setTimeout(function(){
      wtfhome._scroll_block = false;
    }, 500);
  }
};
// Main app

$(document).ready(function(){
  $('#debug').click(turn_debug);
  var myElement = document.getElementById('wtfid_lookbook');
  var mc = new Hammer(myElement);
  mc.on("panleft panright tap press swipeleft swiperight swipeup swipedown", function(ev) {
    dbg(ev.type +" gesture detected.");
  });
  $(document).keydown(function(e) {
    if (e.keyCode === 40) { // sipka dole
      dbg('keydown');
      wtfhome.scroll_down();
    }
    else if (e.keyCode === 38) {
      dbg('keyup');
      wtfhome.scroll_up();
    }
  });
  $('body').on('mousewheel', function(event) { // $.debounce(function(event) {
    if(event.originalEvent.deltaY > 0) {
      wtfhome.scroll_down();
    } else {
      wtfhome.scroll_up();
    }
  });
  /*
  $(document).on('scroll', function(e) {
    console.log('scroll');
    console.log(e);
    dbg('scroll event');
    e.originalEvent.preventDefault();
  });
  */
  $(document).on("swipeleft",function(){
    console.log('swipeleft');
    dbg('swipeleft');
    wtfhome.scroll_down();
  });
  $(document).on("swiperight",function(){
    console.log('swiperight');
    dbg('swiperight');
    wtfhome.scroll_up();
  });
  $(document).on("swipeup",function(){
    console.log('swipeup');
    dbg('swipeup');
    wtfhome.scroll_up();
  });
  $(document).on("swipedown",function(){
    console.log('swipedown');
    dbg('swipedown');
    wtfhome.scroll_down();
  });
  $(document).on("scrollstart",function(){
    dbg('scrollstart');
    console.log("Started scrolling!");
  });
  $(document).on("scrollstop",function(){
    dbg('scrollstop');
    console.log("Stopped scrolling!");
  });
  $('.wtfscreen').on("swipe",function(){
    console.log('swipe');
    dbg('swipe');
    wtfhome.scroll_down();
  });
  document.ontouchmove = function(event) {
    console.log(event);
    event.preventDefault();
    dbg('ontouchmove');
  };
  window.addEventListener("touchmove", function(event) {
    dbg("touchmnew");
    event.preventDefault();
  }, false);
  window.addEventListener("touchstart", function(event){
    dbg('touchstart1 '+event.target.tagName);
    if (event.target.tagName=="HTML" || event.target.tagName=="BODY") {
      dbg('touchstart2');
      event.preventDefault();
    }
    event.preventDefault();
  }, false);
  window.addEventListener("scroll", function(){
    dbg("scrollnew");
    wtfhome.scroll_down();
    window.scrollTo(0,0);
  }, false);
  dbg('On load successfull');
});

let debugOn = false;

function turn_debug() {
  if (debugOn) {
    $('#debug').removeClass('pop');
    debugOn=false;
  }
  else {
    $('#debug').addClass('pop');
    debugOn=true;
  }
}

function dbg(msg) {
  let p=$('<p>').html(msg);
  $('#debug').append(p);
}
