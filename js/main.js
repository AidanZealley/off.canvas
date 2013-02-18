jQuery(document).ready(function($) {
	$('body, .window, .side, .page').addClass('scrolling');
	$('.overthrow').addClass('scrollable');
	$('.side, .page').addClass('animated');
	
	$('.slide').click(function() {
		$('.side, .page').toggleClass('slid');
		$('.slide').toggleClass('pressed');
		return false;
	});
	
		
	$(document).keydown(function(e) {
		if (e.keyCode === 39) {
			$('.side, .page').addClass('slid');
			$('.slide').addClass('pressed');
			return false;
		}
		
		if (e.keyCode === 37 && $('.side, .page').hasClass('slid')) {
			$('.side, .page').removeClass('slid');
			$('.slide').removeClass('pressed');
			return false;
		}
	});
	
	$('.window').hammer({drag:false, prevent_default:false, css_hacks:false}).on('swipe', function (event) {
		if (event.direction === 'right') {
			$('.side, .page').addClass('slid');
			$('.slide').addClass('pressed');
		} else if (event.direction === 'left') {
			$('.side, .page').removeClass('slid');
			$('.slide').removeClass('pressed');
		}
	});
});