/*jshint esversion:6*/

require("jquery");

let debugOn = false;

module.exports = {
  turn_debug: function() {
    if (debugOn) {
      $('.fdbg').removeClass('pop');
      debugOn=false;
    }
    else {
      $('.fdbg').addClass('pop');
      debugOn=true;
    }
  },
  dbg: function(msg) {
    let p=$('<p>').html(msg);
    $('.fdbg').append(p);
  },
  init: function() {
    $('.fdbg').click(this.turn_debug);
  }
};
