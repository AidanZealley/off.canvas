(function( $ ) {

	$.fn.offcanvas = function( options ) {

		// Default settings
        var settings = $.extend({
            hasSidebarLeft  : true,
            hasSidebarRight : false,
            animated       	: true,
            oldPhones	   	: true,
            enableTouch		: true,
            enableKeys		: true
        }, options);

        // Default element names
        var sections = $.extend({
            sidebarLeft    	: '#sidebarLeft',
            sidebarRight   	: '#sidebarRight',
            mainPage  		: '#page',
            leftBurger		: '#leftBurger',
            rightBurger		: '#rightBurger'
        }, options);

        return this.each( function() {

	        // Add offcanvas class for setting layout specific css
	        $(this).addClass('offcanvas');

	        $.each(sections, function(index, element) {        	
	        	// Add animation class if option is enabled
        		if ( settings.animated ) {
        			$(element).addClass('animatedSlide');
				}
	        });
        	
      	    // Add overthrow polyfill if option is enabled
      	    if ( settings.oldPhones ) {
      	        $('.scrollableArea').addClass('overthrow');
      	    }
      	    
      	    var slidRight = 0;
      	    var slidLeft = 0;
      	    
      	    var timeout = setTimeout(function(sidebar) {
      	    	$(sidebar).removeClass('show');
      	    }, 400);

      	    // Function that performs the sliding by adding classes to the relavent elements
      	    function slide( direction, settings ) {
      	    	switch (direction) {
      	    		case'right':
      	    			$(sections.sidebarRight).removeClass('show');
      	    			$(sections.mainPage).addClass('slidRight');
      	    			$(sections.sidebarLeft).addClass('slidRight show');
      	    			$(sections.leftBurger).addClass('pressed');

      	    			slidRight = 1;
      	    		break;

      	    		case 'left':
      	    			$(sections.sidebarLeft).removeClass('show');
      	    			$(sections.mainPage).addClass('slidLeft');
      	    			$(sections.sidebarRight).addClass('slidLeft show');
      	    			$(sections.rightBurger).addClass('pressed');

      	    			slidLeft = 1;
      	    		break;

      	    		case 'shutLeft':
      	    			$(sections.leftBurger).removeClass('pressed');
      	    			$(sections.mainPage).removeClass('slidRight');
      	    			$(sections.sidebarLeft).removeClass('slidRight');
      	    			
      	    			var timeout = setTimeout(function() {
      	    				$(sections.sidebarLeft).removeClass('show');
      	    			}, 300);
      	    			clearTimeout(timeout);
      	    
      	    			slidRight = 0;
      	    		break;
      	    		
      	    		case 'shutRight':
      	    			$(sections.rightBurger).removeClass('pressed');
      	    			$(sections.mainPage).removeClass('slidLeft');
      	    			$(sections.sidebarRight).removeClass('slidLeft');
    					
    					var timeout = setTimeout(function() {
    						$(sections.sidebarRight).removeClass('show');
    					}, 300);
    					clearTimeout(timeout);

    					slidLeft = 0;
    				break;
      	    	}
      	    }
			
			if (settings.hasSidebarLeft) {
	      	    $('.slideRight').on('click', function(event) {
	      	    	if (!slidRight) {
	      	    		slide('right');
	      	    	} else {
	      	    		slide('shutLeft');
	      	    	}
	
	      	    	return false;
	      	    });
      	    }
			if (settings.hasSidebarRight) {
	      	    $('.slideLeft').on('click', function(event) {
	      	    	if (!slidLeft) {
	      	    		slide('left');
	      	    	} else {
	      	    		slide('shutRight');
	      	    	}
	
	      	    	return false;
	      	    });
      	    }
			if (settings.hasSidebarLeft) {
	      	    $('.shutLeft').on('click', function(event) {
	      	    	slide('shutLeft');
	
	      	    	return false;
	      	    });
      	    }
      	    if (settings.hasSidebarRight) {
	      	    $('.shutRight').on('click', function(event) {
	      	    	slide('shutRight');
	
	      	    	return false;
	      	    });
      	    }
			
			if (settings.enableKeys) {
	      	    $(this).keydown(function(e) {
	      	    	if (e.keyCode === 39) {
	      	    		if (!slidRight && !slidLeft && settings.hasSidebarLeft) {
	      	    			slide('right');
	      	    		} else {
	      	    			slide('shutRight');
	      	    		}
	
	      	    		return false;
	      	    	}
	
	      	    	if (e.keyCode === 37) {
	      	    		if (!slidRight && !slidLeft && settings.hasSidebarRight) {
	      	    			slide('left');
	      	    		} else {
	      	    			slide('shutLeft');
	      	    		}
	
	      	    		return false;
	      	    	}
	      	    });
      	    }
			
			if (settings.enableTouch) {
	      	    $(this).hammer({drag:false, prevent_default:false, css_hacks:false}).on('swipe', function (event) {
	      	    	if (event.direction === 'right') {
	      	    		if (!slidRight && !slidLeft && settings.hasSidebarLeft) {
	      	    			slide('right');
	      	    		} else {
	      	    			slide('shutRight');
	      	    		}
	
	      	    		return false;
	      	    	} else if (event.direction === 'left') {
	      	    		if (!slidRight && !slidLeft && settings.hasSidebarRight) {
	      	    			slide('left');
	      	    		} else {
	      	    			slide('shutLeft');
	      	    		}
	
	      	    		return false;
	      	    	}
	      	    });
      	    }

        });

	};

})( jQuery );