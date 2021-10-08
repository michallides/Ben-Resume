/* MENU */

/*************************
 **** Global Variables ****
 ************************/
var win = $(window),
  navbar = $('.navbar'),
  navigation = $('.navigation'),
  menuLink = $('.menu a'),
  hamburger = $('.hamburger-menu-icon'),
  backToTop = $('.back-to-top');
/***************************************/

// Navbar visibility
win.scroll(function () {
  var winTop = win.scrollTop();

  if (winTop >= 100) {
    navbar.fadeIn();
  } else {
    navbar.fadeOut();
  }

  // Highlight menu items on scroll
  menuLink.each(function () {
    var id = $(this).attr('href'),
      secPos = $(id).offset().top - navbar.height() - 2,
      menuActive = $('.menu .active');

    if (winTop >= secPos || winTop + win.height() === $(document).height()) {
      menuActive.removeClass('active');
      $(this).addClass('active');
    }
  });

  // Back-to-top button visibility
  if (winTop >= 700) {
    backToTop.fadeIn();
  } else {
    backToTop.fadeOut();
  }
});

// Back-to-top functionality
backToTop.click(function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, 1000);
});

// Scroll to section on click
menuLink.click(function (e) {
  e.preventDefault();
  var id = this.hash;

  $('html, body')
    .stop()

    // 73px is 'navbar' height. Can't use 'navbar.height()', because 'navbar' has different height when it is open on smaller screens
    .animate({ scrollTop: $(id).offset().top - 73 }, 1000);
});

// Toggle navigation, hamburger icon
showNavigation = false;

hamburger.click(function (e) {
  e.preventDefault();

  if (!showNavigation) {
    showNav();
    hamburgerClose();

    showNavigation = true;
  } else {
    hideNav();
    hamburgerOpen();

    showNavigation = false;
  }
});

// Hide navigation after click on menu link (on smaller screens), without hiding animation on bigger screens (just remove class 'show')
menuLink.click(function (e) {
  e.preventDefault();

  if (showNavigation && window.innerWidth <= 1115) {
    hideNav();
    hamburgerOpen();

    showNavigation = false;
  } else if (showNavigation && window.innerWidth > 1115) {
    navigation.removeClass('show');
    hamburgerOpen();

    showNavigation = false;
  }
});

/*******************
 **** Functions ****
 ******************/
function showNav() {
  navigation.addClass('show');
}

function hideNav() {
  navigation.removeClass('show').addClass('hiding');

  // Remove class 'hiding' after 'slideUp' animation from CSS is done (0.3s), 290ms to avoid showing of 'navigation' for a few miliseconds after 'slideUp'
  setTimeout(function () {
    navigation.removeClass('hiding');
  }, 290);
}

function hamburgerClose() {
  hamburger.addClass('closing');

  setTimeout(function () {
    hamburger.removeClass('closing').addClass('close');
  }, 300);
}

function hamburgerOpen() {
  // 'hamburger.removeClass('close')' twice. 1st time because of different 'transition-duration' in CSS. 2nd time to fix a bug: if 'hamburger' is clicked quickly many times in a row, icon stays in closed position even when 'showNavigation = false'
  hamburger.removeClass('close').addClass('unclosing');
  setTimeout(function () {
    hamburger.removeClass('close').removeClass('unclosing');
  }, 300);
}

/*********************************************************************************/
