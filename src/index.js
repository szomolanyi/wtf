/*jshint esversion:6*/

require("./styles/style.css");
require("jquery");


let wtf_nav_state={
  nav_elements : [],
  second_pos : 0,
  bulhar: 20
};

function wtf_init_nav(initial_color) {
  wtf_nav_state.second_pos = $(".second").offset().top;
  $(".wtfnav__link").each( (i, e) => {
    $('#'+e.id).addClass('wtfnav__link--'+ initial_color);
    wtf_nav_state.nav_elements.push({
      pos:$('#'+e.id).offset().top,
      color:initial_color,
      id: e.id,
      elem: $('#'+e.id)
    });
    $('#'+e.id).addClass('wtfnav__link--transition');
  });
}

function wtf_update_nav() {
  let curr_pos = $(document).scrollTop();
  wtf_nav_state.nav_elements.forEach((e)=>{
    if (e.color === 'white' && curr_pos + wtf_nav_state.bulhar > wtf_nav_state.second_pos - e.pos) {
      e.elem.addClass('wtfnav__link--black');
      e.elem.removeClass('wtfnav__link--white');
      e.color='black';
    }
    else if (e.color === 'black' && curr_pos + wtf_nav_state.bulhar <= wtf_nav_state.second_pos - e.pos )  {
      e.elem.removeClass('wtfnav__link--black');
      e.elem.addClass('wtfnav__link--white');
      e.color='white';
    }
  });
}

// Main app
$(document).ready(function () {
  $('#wtfid_lookbook_nav').on('click', function() {
    console.log($(".second").offset());
    $('html, body').animate({
        scrollTop: $(".second").offset().top
    }, 1000);
  });
  $('#wtfid_home_nav').on('click', function() {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
  });
  wtf_init_nav('white');
  console.log($(location).attr('href'));
});

$(document).scroll(function(){
  wtf_update_nav();
});
