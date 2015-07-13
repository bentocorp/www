/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.5
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.5'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

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

    // fix controls if placeholder (original controls location) is not in viewport
    fixControls = function(){
      if(!placeholder || !controls) return;
      var st = window.pageYOffset || document.documentElement.scrollTop;

      if(isInViewport(logo)){
        // navbarHeader.offsetWidth has unexpected behavior for small screens
        navbarHeader.parentElement.style.transform = "translate(-181px, 0px)";
        navbarRight.style.transform = "translate(" + navbarHeader.offsetWidth + "px, 0px)";
        //navbarHeader.parentElement.style.width = (navbarHeader.parentElement.offsetWidth + navbarHeader.offsetWidth) + "px";
        navbarBrand.style.opacity = "0";
        setTimeout(function(){
          navbarBrand.style.visibility = "hidden";
        },1000);
      } else {
        //navbarHeader.parentElement.style.width = "";
        navbarHeader.parentElement.style.transform = "translate(0px, 0px)";
        navbarRight.style.transform = "translate(0px, 0px)";
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
        // magic number to keep the page from "jumping"
        // when transitioning between static and fixed
        placeholder.style.height = "170px";
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

