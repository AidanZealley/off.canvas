jQuery(document).ready(function($) {
	$('html').addClass('scrolling');
	$('.overthrow').addClass('scrollableArea');
	$('.sidebarLeft, .sidebarRight, .page').addClass('animatedSlide');

	$('.slideRight, .closeLeft').click(function() {
		$('.sidebarLeft, .page').toggleClass('slidToRight');
		$('.topBar .slideRight').toggleClass('pressed');
		return false;
	});

	$('.slideLeft, .closeRight').click(function() {
		$('.sidebarRight, .page').toggleClass('slidToLeft');
		$('.topBar .slideLeft').toggleClass('pressed');
		return false;
	});

	$(document).keydown(function(e) {
		if (e.keyCode === 39) {
			if ($('.sidebarRight, .page').hasClass('slidToLeft')) {
				$('.sidebarRight, .page').removeClass('slidToLeft');
				$('.topBar .slideLeft').removeClass('pressed');
				return false;
			} else {
				$('.sidebarLeft, .page').addClass('slidToRight');
				$('.topBar .slideRight').addClass('pressed');
				return false;
			}
		}

		if (e.keyCode === 37) {
			if ($('.sidebarLeft, .page').hasClass('slidToRight')) {
				$('.sidebarLeft, .page').removeClass('slidToRight');
				$('.topBar .slideRight').removeClass('pressed');
				return false;
			} else {
				$('.sidebarRight, .page').addClass('slidToLeft');
				$('.topBar .slideLeft').addClass('pressed');
				return false;
			}
		}
	});

	$('body').hammer({drag:false, prevent_default:false, css_hacks:false}).on('swipe', function (event) {
		if (event.direction === 'right') {
			if ($('.sidebarRight, .page').hasClass('slidToLeft')) {
				$('.sidebarRight, .page').removeClass('slidToLeft');
				$('.topBar .slideLeft').removeClass('pressed');
			} else {
				$('.sidebarLeft, .page').addClass('slidToRight');
				$('.topBar .slideRight').addClass('pressed');
			}
		} else if (event.direction === 'left') {
			if ($('.sidebarLeft, .page').hasClass('slidToRight')) {
				$('.sidebarLeft, .page').removeClass('slidToRight');
				$('.topBar .slideRight').removeClass('pressed');
			} else {
				$('.sidebarRight, .page').addClass('slidToLeft');
				$('.topBar .slideLeft').addClass('pressed');
			}
		}
	});
});