(function($) {
  $(document).ready(function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 200) {
        $('#menu').fadeIn(600);
      } else {
        $('#menu').fadeOut(600);
      }
    });
  });
})(jQuery);
