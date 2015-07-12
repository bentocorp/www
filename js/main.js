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
    var distance = elem.getBoundingClientRect();
    return (
      distance.top >= 0 &&
      distance.left >= 0 &&
      distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  /* enable sticky footer controls - use id="sticky-controls" */
  stickyControls = function(){
    var controls = document.getElementById('sticky-controls');
    if(!controls) return;

    // get or create placeholder
    var placeholder = document.getElementById('sticky-controls-placeholder');
    if(!placeholder) {
      placeholder = document.createElement("DIV");
      placeholder.id = "sticky-controls-placeholder";
      controls.parentElement.insertBefore(placeholder, controls.nextSibling);
      //  controls.parentElement.insertBefore(placeholder, controls);
    }
    placeholder.style.clear = "both";

    /* jshint debug: true */
    //debugger;
    console.log(isInViewport(placeholder));

    // fix controls if placeholder (original controls location) is not in viewport
    fixControls = function(){
      if(!placeholder || !controls) return;
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if(isInViewport(placeholder)) {
        controls.classList.remove('navbar-fixed-top');
        controls.classList.remove('in');
        controls.classList.add('navbar-static');
        placeholder.style.height = "0";
      } else {
        controls.classList.remove('navbar-static');
        // offsetHeight = 50
        // 115?
        placeholder.style.height = (controls.offsetHeight + 115) + "px";
        //placeholder.style.height = controls.offsetHeight + "px";
        controls.classList.add('navbar-fixed-top');
        
        if (st > lastScrollTop) {
          // downscroll code
          controls.classList.remove('in');
        } else {
          // upscroll code
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

