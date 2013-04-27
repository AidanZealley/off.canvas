jQuery(document).ready(function($) {
	$('html').addClass('scrolling');
	$('.overthrow').addClass('scrollableArea');
	$('.sidebarLeft, .sidebarRight, .page').addClass('animatedSlide');

	var slidRight = 0;
	var slidLeft = 0;

	function slide(direction) {
		switch (direction) {
			case'right':
				$('.page, .sidebarLeft').addClass('slidRight');

				slidRight = 1;
			break;

			case 'left':
				$('.page, .sidebarRight').addClass('slidLeft');

				slidLeft = 1;
			break;

			case 'shut':
				$('.page, .sidebarLeft, .sidebarRight').removeClass('slidRight slidLeft');

				slidRight = 0;
				slidLeft = 0;
			break;
		}
	}

	$('.slideRight').click(function() {
		if (!slidRight) {
			slide('right');
		} else {
			slide('shut');
		}

		return false;
	});

	$('.slideLeft').click(function() {
		if (!slidLeft) {
			slide('left');
		} else {
			slide('shut');
		}

		return false;
	});

	$('.shut').click(function() {
		slide('shut');

		return false;
	});

	$(document).keydown(function(e) {
		if (e.keyCode === 39) {
			if (!slidRight && !slidLeft) {
				slide('right');
			} else {
				slide('shut');
			}

			return false;
		}

		if (e.keyCode === 37) {
			if (!slidRight && !slidLeft) {
				slide('left');
			} else {
				slide('shut');
			}

			return false;
		}
	});

	$('body').hammer({drag:false, prevent_default:false, css_hacks:false}).on('swipe', function (event) {
		if (event.direction === 'right') {
			if (!slidRight && !slidLeft) {
				slide('right');
			} else {
				slide('shut');
			}

			return false;
		} else if (event.direction === 'left') {
			if (!slidRight && !slidLeft) {
				slide('left');
			} else {
				slide('shut');
			}

			return false;
		}
	});
});