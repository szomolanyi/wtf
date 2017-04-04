/*jshint esversion:6*/

require("jquery");
require("hammerjs");
require("material-design-lite");
require(__dirname+"/../node_modules/material-design-lite/material.css");
require("./assets/logo.png");

let fdbg = require("./fdbg");

require("./styles/style.css");
require("./styles/dbg_style.css");

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
  fdbg.init();
  var myElement = document.body;
  var mc = new Hammer(myElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on("swipeup swipedown", function(ev) {
    fdbg.dbg(ev.type +" gesture detected.");
    if (ev.type === 'swipedown') {
      wtfhome.scroll_up();
    }
    if (ev.type === 'swipeup') {
      wtfhome.scroll_down();
    }
  });
  $(document).keydown(function(e) {
    if (e.keyCode === 40) { // sipka dole
      fdbg.dbg('keydown');
      wtfhome.scroll_down();
    }
    else if (e.keyCode === 38) {
      fdbg.dbg('keyup');
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
  window.addEventListener("touchmove", function(event) {
    console.log('touchmove handler');
    fdbg.dbg("touchmove handler");
    event.preventDefault();
  }, false);
  window.addEventListener("touchstart", function(event){
    console.log('touchstart handler');
    fdbg.dbg('touchstart '+event.target.tagName);
    if (event.target.tagName=="HTML" || event.target.tagName=="BODY") {
      fdbg.dbg('touchstart2');
      //event.preventDefault();
    }
    //event.preventDefault();
  }, false);
  window.addEventListener("scroll", function(){
    console.log('scrool handler');
    fdbg.dbg("scroll");
    window.scrollTo(0,0);
  }, false);
  fdbg.dbg('On load successfull');
});
