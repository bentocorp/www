/* jshint ignore:start */

//facebook
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=791688527544905&version=v2.0";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* Facebook Conversion Code for Key Page Views - Bento Ad Account 1 */

(function() {
  var _fbq = window._fbq || (window._fbq = []);
  if (!_fbq.loaded) {
    var fbds = document.createElement('script');
    fbds.async = true;
    fbds.src = '//connect.facebook.net/en_US/fbds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fbds, s);
    _fbq.loaded = true;
  }
})();
window._fbq = window._fbq || [];
window._fbq.push(['track', '6026847103468', {'value':'0.00','currency':'USD'}]);

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-61640336-1', 'auto');
ga('send', 'pageview');

function setupMap(){
	L.mapbox.accessToken = 'pk.eyJ1IjoidmluY2VudC1iZW50b25vdy1jb20iLCJhIjoiV0p2al9qNCJ9.cKufaBUS30xSk7wXxmGuDg';
	var map = L.mapbox.map('delivery-map', 'vincent-bentonow-com.m26hh48o', {
	  zoomControl: true
	}).setView([37.779360, -122.412277], 13);
	// Disable drag and zoom handlers.
	//map.dragging.disable();
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();

	// Disable tap handler, if present.
	//if (map.tap) map.tap.disable();

}

$(document).ready(function() {

	/*
	var emailform = $('#mc-embedded-subscribe-form');
	if(emailform.length && typeof emailform.validateForm == 'function'){
		emailform.validateForm({
		  	errorPlacement: function(error, element) {
		     	error.appendTo('#mce-email-error');
		   	},
		   	submitHandler : function(form) {
			    form.submit();
			}
		});
	}else{
		//console.error('no validate');

	}
	*/
	setupMap();
});

/* jshint ignore:end */

/* jshint devel: true */
var Bento = (function () {
  "use strict";
  var fixControls, isInViewport, stickyControls, lastScrollTop = 0;

  // returns true/false
  // elem: dom element e.g. returned by document.getElementById
  isInViewport = function(elem) {
    if(!elem) throw "isInViewport: elem is undefined";
    var distance = elem.getBoundingClientRect();
    return (
      distance.top >= 0 &&
      distance.left >= 0 &&
      distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // TODO pass in config vars - remove hardcoded: 
  // sticky-controls, sticky-controls-placeholder, .her.hero-home .logo
  // TODO throw error if sticky-controls selector returns anything other than 1 element

  /* enable sticky footer controls - use id="sticky-controls" */
  stickyControls = function(){
    var controls = document.getElementById('sticky-controls');
    if(!controls) return;

    // get computed styles
    var controlsComputedStyle = window.getComputedStyle(controls);
    var controlsTotalMargin = 
          parseInt(controlsComputedStyle.marginTop, 10) + 
          parseInt(controlsComputedStyle.marginBottom, 10);


    // get or create placeholder
    var placeholder = document.getElementById('sticky-controls-placeholder');
    if(!placeholder) {
      placeholder = document.createElement("DIV");
      placeholder.id = "sticky-controls-placeholder";
      controls.parentElement.insertBefore(placeholder, controls.nextSibling);
    }
    placeholder.style.clear = "both";

    /* jshint debug: true */
    //debugger;

    var logo = document.querySelector('.hero.hero-home .logo');
    var navbarHeader = document.querySelector('.navbar-header');
    var navbarBrand = document.querySelector('.navbar-header .navbar-brand');
    var navbarRight = document.querySelector('.navbar-right');
    //navbarHeader.offsetWidth;

    var navCollapse = window.jQuery('#nav-collapse');

    // fix controls if placeholder (original controls location) is not in viewport
    fixControls = function(){
      if(!placeholder || !controls) return;
      var st = window.pageYOffset || document.documentElement.scrollTop;

      if(isInViewport(logo)){
        navbarHeader.parentElement.style.transform = "translateX(-"+ navbarHeader.offsetWidth + "px)";
        navbarRight.style.transform = "translateX(" + navbarHeader.offsetWidth + "px)";
        navbarBrand.style.opacity = "0";
        setTimeout(function(){
          navbarBrand.style.visibility = "hidden";
        },1000);
      } else {
        navbarHeader.parentElement.style.transform = "translateX(0px)";
        navbarRight.style.transform = "translateX(0px)";
        navbarBrand.style.opacity = "1";
        navbarBrand.style.visibility = "visible";
      }

      if(isInViewport(placeholder)) {
        controls.classList.remove('navbar-fixed-top');
        controls.classList.remove('in');
        controls.classList.add('navbar-static');
        placeholder.style.height = "0";
      } else {
        controls.classList.remove('navbar-static');
        // compute height of navbar - offsetHeight (actual height + padding) +
        // top and bottom margins
        placeholder.style.height = (controls.offsetHeight + controlsTotalMargin) + "px";

        controls.classList.add('navbar-fixed-top');
        
        if (st > lastScrollTop) {
          // scroll down code
          controls.classList.remove('in');
          navCollapse.collapse('hide');
        } else {
          // scroll up code
          controls.classList.add('in');
        }

      }
      // update to detect direction
      lastScrollTop = st;
    };

    // run on init
    fixControls();

    // run after scrolling
    window.onscroll = fixControls;

    // run after resizing
    //window.onresize = fixControls;
  };

  var refreshStickyControls = function(){
    if(fixControls && typeof fixControls === "function") fixControls();
  };
  
  var init = function() {
    // sticky navbar
    stickyControls();
  };
  
  // export public properties and methods
  return {
    init: init,
    refreshStickyControls: refreshStickyControls
  }
})();

// init
!function(){
  "use strict";
  Bento.init();
}();

