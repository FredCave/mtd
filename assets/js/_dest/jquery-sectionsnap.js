(function($) {
	$.fn.sectionsnap = function( options ) {
		
		var settings = $.extend({
			'delay'				: 50 // time dilay (ms)
			, 'selector'		: "section" // selector
			, 'reference'		: .9 // % of window height from which we start
			, 'animationTime'	: 500 // animation time (snap scrolling)
			, 'offsetTop'		: 0 // offset top (no snap before scroll reaches this position)
			, 'offsetBottom'	: 0 // offset bottom (no snap after bottom - offsetBottom)
		}, options);		
		
		var $wrapper = this
		, direction = 'down'
		, currentScrollTop = $(window).scrollTop()
		, scrollTimer
		, animating = false;

		// check the direction
		var updateDirection = function() {
			if ($(window).scrollTop() >= currentScrollTop)
				direction = 'down';
			else
				direction = 'up';
			currentScrollTop = $(window).scrollTop();
		}

		// return the closest element (depending on direction)
		var getClosestElement = function() {	

			var $list = $wrapper.find(settings.selector)
			, wt = $(window).scrollTop()
			, wh = $(window).height()
			, refY = wh * settings.reference
			, wtd = wt + refY - 1
			, $target;

			if (direction == 'down') {
				$list.each(function() {
					var st = $(this).position().top;					
					if ((st > wt) && (st <= wtd)) {
						// console.log( 42, $(this).attr("id") );
						// IF NOT TARGETING VIDEO SECTION
						if ( $(this).attr("id") !== "video_section" ) {
							$target = $(this);
							return false; // just to break the each loop							
						} 

					}
				});
			} else {
				wtd = wt - refY + 1;
				// WINDOWTOP - OFFSET
				$list.each(function() {
					// var st = $(this).position().top;		
					var st = $(this).find(".scroll_target").offset().top;			
					if ((st < wt) && (st >= wtd)) {
						// console.log( 58, $(this).attr("id") );
						// IF NOT TARGETING VIDEO SECTION
						if ( $(this).attr("id") !== "video_section" ) {
							$target = $(this).find(".scroll_target");
							return false; // just to break the each loop
						}
					}
				});
			}
			return $target;
		}

		// snap
		var snap = function() {
			
			if ( HomeNav.introHidden ) {
				return;
			}

			var $target = getClosestElement();
			if ($target) {
				animating = true;
				HomeNav.scrollBlocked = true;
				$('html, body').animate({
					scrollTop: ($target.offset().top)
				}, settings.animationTime, function() {
					window.clearTimeout(scrollTimer);

					// CUSTOM – AFTER ANIMATION COMPLETE

					// UPDATE URL HASH
					var newHash = $target.attr("data-anchor");
					Backbone.history.navigate( newHash, {trigger: false} );
					HomeNav.colourManager( newHash );

					if ( !Home.videoHidden ) {
						_.defer( function(){
							Home.hideVideo();
						});
					}

					HomeNav.scrollBlocked = false;
					animating = false;
				});
			}
		}
		// on window scroll
		var windowScroll = function() {
		
			if ( animating ) 
				return;
			var st = $(window).scrollTop();
			// if (st < settings.offsetTop)
			// 	console.log( 77 );
			// 	return;
			// if (st > ($("html").height() - $(window).height() - settings.offsetBottom))
			// 	console.log( 80 );
			// 	return;
			updateDirection();
			window.clearTimeout(scrollTimer);
			scrollTimer = window.setTimeout(snap, settings.delay);
		}
		$(window).scroll(windowScroll);
		return this;
	};
})(jQuery);