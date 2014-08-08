$(document).ready(function() {



    $('#fullpage').fullpage({
      scrollingSpeed: 200,
      cc3: true,
      easing: 'easeInOutQuart',

      menu: true,
      menu: '#main_section_nav',
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
      
      // slidesColor: ['#fff', '#eee', '#ddd', '#ccc', '#bbb'],
      slidesNavigation: true,
      navigationTooltips: ['firstSlide', 'secondSlide'],

      // verticalCentered: true,
      // resize : true,
      loopHorizontal: false,

      // afterLoad: function(anchorLink, index){
      //     //using index
      //     if(index == '3'){
      //         alert("Section 3 ended loading");
      //     }

      // }
    });

   // adding the hover interaction for the phone displayes 
  $(".hover_container").hover(
    function () {
      $(this).find('.hover').addClass("active");
    },
    function () {
      $(this).find('.hover').removeClass("active"); 
    }
  );

});



// arrow key guide
if(!readCookie("schmoney_in_my_pocket")) {
  console.log("stay based.")
  $(function() {
    $(".arrow_keys_container").addClass("show").delay(2000).queue(function(next){
        $(this).addClass("hide");
        $(this).delay(200).queue(function(next){
          $(this).remove();
        });
        next();
    });
    createCookie("schmoney_in_my_pocket","cause_im_lit", 1);
  });
}
