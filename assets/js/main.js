/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel - DISABLED (navigation always visible)
	/*
		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');
	*/

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>medium', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=medium', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

	// Contact Form Handler with EmailJS.
		var $contactForm = $('#contact-form');

		if ($contactForm.length > 0) {

			// Initialize EmailJS
			emailjs.init('p6JYnPAO72tsOETh7');

			$contactForm.on('submit', function(e) {
				e.preventDefault();

				var $submitBtn = $contactForm.find('input[type="submit"]');
				var originalValue = $submitBtn.val();
				$submitBtn.val('Sending...').prop('disabled', true);

				var templateParams = {
					from_name: $('#name').val(),
					from_email: $('#email').val(),
					subject: $('#subject').val(),
					message: $('#message').val()
				};

				emailjs.send('service_1ltvvoa', 'template_7ib4x8i', templateParams)
					.then(function() {
						$submitBtn.val('Sent!');
						$contactForm[0].reset();
						setTimeout(function() {
							$submitBtn.val(originalValue).prop('disabled', false);
						}, 3000);
					}, function(error) {
						$submitBtn.val('Error - Try Again').prop('disabled', false);
						console.error('EmailJS error:', error);
						setTimeout(function() {
							$submitBtn.val(originalValue);
						}, 3000);
					});
			});

		}

})(jQuery);

// Calculate and display next second Sunday for recurring event
function updateNextEventDate() {
	const today = new Date();
	const currentMonth = today.getMonth();
	const currentYear = today.getFullYear();

	// Start with current month
	let targetMonth = currentMonth;
	let targetYear = currentYear;

	// Find the second Sunday of the current month
	let secondSunday = getSecondSunday(targetYear, targetMonth);

	// If the second Sunday has already passed, move to next month
	if (secondSunday < today) {
		targetMonth++;
		if (targetMonth > 11) {
			targetMonth = 0;
			targetYear++;
		}
		secondSunday = getSecondSunday(targetYear, targetMonth);
	}

	// Format the date
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const formattedDate = secondSunday.toLocaleDateString('en-US', options);

	// Update the DOM
	const dateElement = document.getElementById('next-event-date');
	if (dateElement) {
		dateElement.textContent = formattedDate;
	}
}

function getSecondSunday(year, month) {
	let sunday = 0;
	let sundayCount = 0;

	for (let day = 1; day <= 31; day++) {
		const date = new Date(year, month, day);

		// Stop if we've moved to the next month
		if (date.getMonth() !== month) break;

		// Check if it's Sunday (day 0)
		if (date.getDay() === 0) {
			sundayCount++;
			if (sundayCount === 2) {
				sunday = day;
				break;
			}
		}
	}

	return new Date(year, month, sunday);
}

// Run when page loads
window.addEventListener('load', updateNextEventDate);