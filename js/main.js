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
	L.mapbox.accessToken = 'pk.eyJ1IjoiZWF0YmVudG8iLCJhIjoiY2lleHc1YTZ6MDU4bnM2bTAyaWRlZmprOCJ9.pH8VKCIO27iYE5JnyTcNfw';
	var map = L.mapbox.map('delivery-map', 'eatbento.nhb7l277', {
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

var Bento = (function () {
  "use strict";
  var cfg, isInViewport, errorIfNotExists, stickyControls,
      init, fixControls, lastScrollTop = 0, linkTexting;

    // !!! HEADS UP
    // This code is not written to support more than one element that 
    // matches a query selector. Only the first element matched is used.

  // init default config
  cfg = {
    stickyControls: '#sticky-controls',
    stickyControlsPlaceholder: '#sticky-controls-placeholder',
    logo: '.hero.hero-home .logo',
    navbarHeader: '.navbar-header',
    navbarBrand: '.navbar-header .navbar-brand',
    navbarRight: '.navbar-right',
    navCollapse: '#nav-collapse',
    slideLeftClass: 'slide-left',
    slideRightClass: 'slide-right',
    slideZeroClass: 'slide-zero',
    navbarFixedClass: 'navbar-fixed-top',
    navbarStaticClass: 'navbar-static',
    navbarInClass: 'in'
  };


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

  // throw an error if an element does not exist
  errorIfNotExists = function(elem, param) {
    if(!elem) throw(param + ' DOES NOT EXIST!');
  }

  // TODO pass in config vars - remove hardcoded: 
  // .her.hero-home .logo


  // enable sticky footer controls - default id="sticky-controls"
  stickyControls = function(){
    var controls, controlsComputedStyle, controlsTotalMargin, placeholder,
        logo, navbarHeader, navbarBrand, navbarRight, jqNavCollapse;

    controls = document.querySelector(cfg.stickyControls);
    errorIfNotExists(controls, cfg.stickyControlsId);

    // get computed styles (margins)
    controlsComputedStyle = window.getComputedStyle(controls);
    controlsTotalMargin = 
          parseInt(controlsComputedStyle.marginTop, 10) +
          parseInt(controlsComputedStyle.marginBottom, 10);

    // get or create placeholder
    placeholder = document.querySelector(cfg.stickyControlsPlaceholder);
    if(!placeholder) {
      placeholder = document.createElement("DIV");
      placeholder.id = "sticky-controls-placeholder";
      controls.parentElement.insertBefore(placeholder, controls.nextSibling);
    }
    // placeholder must clear floats
    placeholder.style.clear = "both";

    logo = document.querySelector(cfg.logo);
    errorIfNotExists(logo, cfg.logo);

    navbarHeader = document.querySelector(cfg.navbarHeader);
    errorIfNotExists(navbarHeader, cfg.navbarHeader);

    navbarBrand = document.querySelector(cfg.navbarBrand);
    errorIfNotExists(navbarBrand, cfg.navbarBrand);

    navbarRight = document.querySelector(cfg.navbarRight);
    errorIfNotExists(navbarRight, cfg.navbarRight);

    // mobile nav uses Bootstrap's jQuery powered Collapse
    if(window.jQuery) {
      jqNavCollapse = window.jQuery(cfg.navCollapse);
      errorIfNotExists(jqNavCollapse, cfg.navCollapse);

      // check for collapse plugin
      if(typeof jqNavCollapse.collapse !== "function") {
        // dummy fn to keep the code from breaking if jQuery isn't available
        jqNavCollapse = { collapse: function(){return;} };
      }
    } else {
      // dummy fn to keep the code from breaking if jQuery isn't available
      jqNavCollapse = { collapse: function(){return;} };
    }

    // fix controls if placeholder (original controls location)
    // is not in viewport
    fixControls = function(){
      if(!placeholder || !controls) return;

      // get scroll position
      var st = window.pageYOffset || document.documentElement.scrollTop;

      // main logo is visible, hide navbar logo
      if(isInViewport(logo)){
        // reset
        navbarHeader.parentElement.classList.remove(cfg.slideZeroClass);
        navbarRight.classList.remove(cfg.slideZeroClass);

        // slide navbar left
        navbarHeader.parentElement.classList.add(cfg.slideLeftClass);

        // slide right nav right - gives the appearance that this doesn't move
        navbarRight.classList.add(cfg.slideRightClass);

        // fade out logo
        navbarBrand.style.opacity = "0";

        // hide logo shortly after opacity has reached zero
        // this prevents the user from clicking on an invisible logo
        setTimeout(function(){
          navbarBrand.style.visibility = "hidden";
        },600);

      // main logo is not visible, show navbar logo
      } else {
        // reset
        navbarHeader.parentElement.classList.remove(cfg.slideLeftClass);
        navbarRight.classList.remove(cfg.slideRightClass);

        // slide navbars back into place
        navbarHeader.parentElement.classList.add(cfg.slideZeroClass);
        navbarRight.classList.add(cfg.slideZeroClass);

        // made logo visible and fade logo in
        navbarBrand.style.visibility = "visible";
        navbarBrand.style.opacity = "1";
      }

      // original nav location is visible, swap fixed nav for static nav
      if(isInViewport(placeholder)) {
        // reset
        controls.classList.remove(cfg.navbarFixedClass);
        controls.classList.remove(cfg.navbarInClass);

        // reset placeholder
        placeholder.style.height = "0";

        // make controls static
        controls.classList.add(cfg.navbarStaticClass);

      // original nav is not visible, swap static for fixed
      } else {

        // reset
        controls.classList.remove(cfg.navbarStaticClass);

        // keep the page from jumping - set placeholder height to original
        // nav height (including margin)
        placeholder.style.height = (controls.offsetHeight + controlsTotalMargin) + "px";

        // make controls fixed
        controls.classList.add(cfg.navbarFixedClass);

        if (st > lastScrollTop) {
          // scroll down: show nav
          controls.classList.remove(cfg.navbarInClass);
        } else {
          // scroll up: hide nav
          controls.classList.add(cfg.navbarInClass);
        }

      }
      // update to detect direction
      lastScrollTop = st;

      // hide collapse menu if the page was scrolled either direction
      jqNavCollapse.collapse('hide');
    };

    // run immediately
    fixControls();

    // run after scrolling
    window.onscroll = fixControls;

    // run after resizing
    //window.onresize = fixControls;
  };

  // submit linktexting form
  linkTexting = function(e){
    /* globals sendLink_linkTexting_oq3j39q0 */
    e.preventDefault();
    if(typeof sendLink_linkTexting_oq3j39q0 === 'function'){
      sendLink_linkTexting_oq3j39q0('5e87fc24-49d5-4321-8dd7-b239e516b843');
    }
  };

  init = function(config) {

    // overwrite default cfg with passed in config
    if(config !== undefined){
      for(var prop in config){
        if(config[prop] !== undefined){ cfg[prop] = config[prop]; }
      }
    }

    // sticky navbar
    stickyControls();

    // attach linktexting submit handler
    document.forms.linkTexting.onsubmit = linkTexting;
  };

  // export public properties and methods
  return {
    init: init
  }
})();

// self-exec init method
!function(){
  "use strict";

  // call init method
  // you may pass in a config object to override defaults
  // e.g. Bento.init({stickyControls: '#my-sticky-controls'});
  // see default config above for available parameters
  Bento.init();
}();

