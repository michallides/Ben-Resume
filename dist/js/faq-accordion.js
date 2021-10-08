/* FAQ-ACCORDION */

$('.answer').not(':first').hide();

$('.question').click(function () {
  $(this).next().slideToggle().siblings('.answer').slideUp();
});

/*******************************************************************/
