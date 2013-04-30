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
            sidebarLeft    	: '.sidebarLeft',
            sidebarRight   	: '.sidebarRight',
            mainPage  		: '.page'
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

      	    // Function that performs the sliding by adding classes to the relavent elements
      	    function slide( direction, settings ) {
      	    	switch (direction) {
      	    		case'right':
      	    			$(sections.sidebarLeft).addClass('slidRight');
      	    			$(sections.mainPage).addClass('slidRight');
      	    			$('.topBar .slideRight').addClass('pressed');

      	    			slidRight = 1;
      	    		break;

      	    		case 'left':
      	    			$(sections.sidebarRight).addClass('slidLeft');
      	    			$(sections.mainPage).addClass('slidLeft');
      	    			$('.topBar .slideLeft').addClass('pressed');

      	    			slidLeft = 1;
      	    		break;

      	    		case 'shutLeft':
      	    			$(sections.sidebarLeft).removeClass('slidRight');
      	    			$(sections.mainPage).removeClass('slidRight');
      	    			$('.topBar .slideRight').removeClass('pressed');
      	    
      	    			slidRight = 0;
      	    		break;
      	    		case 'shutRight':
    					$(sections.sidebarRight).removeClass('slidLeft');
    					$(sections.mainPage).removeClass('slidLeft');
    					$('.topBar .slideLeft').removeClass('pressed');
    		
    					slidLeft = 0;
    				break;
      	    	}
      	    }
			
			if (settings.hasSidebarLeft) {
	      	    $('.slideRight').click(function() {
	      	    	if (!slidRight) {
	      	    		slide('right');
	      	    	} else {
	      	    		slide('shutLeft');
	      	    	}
	
	      	    	return false;
	      	    });
      	    }
			if (settings.hasSidebarRight) {
	      	    $('.slideLeft').click(function() {
	      	    	if (!slidLeft) {
	      	    		slide('left');
	      	    	} else {
	      	    		slide('shutRight');
	      	    	}
	
	      	    	return false;
	      	    });
      	    }
			if (settings.hasSidebarLeft) {
	      	    $('.shutLeft').click(function() {
	      	    	slide('shutLeft');
	
	      	    	return false;
	      	    });
      	    }
      	    if (settings.hasSidebarRight) {
	      	    $('.shutRight').click(function() {
	      	    	slide('shutRight');
	
	      	    	return false;
	      	    });
      	    }
			
			if (settings.enableKeys) {
	      	    $(document).keydown(function(e) {
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