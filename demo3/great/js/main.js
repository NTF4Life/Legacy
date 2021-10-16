/*jshint undef:false */
(function () {
	"use strict";
	/* SlideUp div .slider - with #id set in data-slider */
	$('.slideUp').on('click', function () {
		var slider = $(this).data('slider'); // get data-slider content Exmp: data-slder="projects" - and slideUp div #projects
		var height = $("#" + slider).height();
		$("#" + slider).animate({
			'top' : -height + 'px'
		}, 1500, function () {
			$(this).hide();
		});
		$('.overlay').hide();
	});

	/* SlideDown div .slider - with #id set in data-slider */
	$('.slideDown').on('click', function () {
		var slider = $(this).data('slider'); // get data-slider content Exmp: data-slder="projects" - and slideDown div #projects
		$("#" + slider).show(0, function () {
			$(this).css('visibility', 'visible');
			$(this).animate({
				'top' : '0'
			}, 1500);
		});
		$('.overlay').show();
	});

	/* Send contact form to email */
	$('#contactform').on('submit', function () {
		$('body').addClass('sending');
		var form_data = $(this).serialize() + '&submit=send';
		window.setTimeout(function () {
			$.ajax({
				type : "POST",
				url : "contact_form.php", // Path to contact_form.php
				data : form_data,
				dataType : 'jsonp'
			})
			.done(function (data) {
				$('#callback').html(data.msg).show('slow');
				if (data.status) {
					$('#contactform').find('input[type=text], textarea, select').val('');
				}
			});
			$('body').removeClass('sending');
		}, 2000);
		return false;
	});

	/* Initialize Google Maps in Contact form */
	function initialize() {

		var address = 'Sundgauallee, Freiburg im Breisgau, DE'; // YOUR-ADDRESS-HERE
		var geocoder = new google.maps.Geocoder();

		var settings = {
			zoom : 15, // Map zoom
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById('map-canvas'), settings);

		geocoder.geocode({
			'address' : address
		},
			function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				new google.maps.Marker({
					position : results[0].geometry.location,
					map : map
				});
				map.setCenter(results[0].geometry.location);
			}
		});
	}

	/* Load Fancybox gallery when page is loaded */
	$(document).ready(function () {

		/* Hide/Show Google Maps in contact form */
		$('.googlemap').on('click', function () {
			$('#googlemaps').toggle('slow', initialize);
			$(this).toggleClass('hoverd');
			return false;
		});

		/* Initialize project filters */
		$('#filtered-list').mixitup();

		$('.service-item').bind('hover', function () {
			$(this).find('.service-img').toggle();
			$(this).find('.service-text').toggle();
		});
	});

	/* Load some last stuff when page is fully loaded */
	$(window).load(function () {

		$('#menu').css('top', center() + 'px');

		/*Fancybox for project with full description, title, preview button and social buttons */
		$(".project-full-info").fancybox({
			openEffect : 'none',
			closeEffect : 'none',

			padding : 0,
			margin : [20, 60, 20, 60],
			afterShow : function () {
				twttr.widgets.load(); // Render tweet button
				FB.XFBML.parse(); // Render facebook button
			},
			helpers : {
				title : null,
				media : {}
			},
			tpl : {
				wrap : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image : '<div class="fancybox-image" style="background:#222 url({href}) no-repeat; background-size: contain; background-position:50% 50%; height:100%; width:68%;float:left"></div>',
				iframe : '<iframe style="background:#222;height:100%; width:68%;float:left" id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe clearfix" frameborder="0" vspace="0" hspace="0"' + ($.browser.msie ? ' allowtransparency="true"' : '') + '></iframe>',
				error : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},
			afterLoad : function () {
				var title = this.element.find('.title').length > 0 ? this.element.find('.title').html() : ''; // Project Title here
				var description = this.element.find('.description').length > 0 ? this.element.find('.description').html() : ''; // Project description here
				var tweeter = '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-url="' + (this.type === 'image' ? this.href : 'http:' + this.href) + '">Tweet</a>';
				var facebook = '<div class="fb-like" data-href="' + (this.type === 'image' ? 'http://' + location.host + this.href : 'http:' + this.href) + '" data-send="false" data-width="100" data-show-faces="false" data-layout="button_count"></div>';
				var preview = '';
				var $el_preview = this.element.find('.preview');
				if ($el_preview.length > 0) //Check if preview button is set
				{
					preview = '<p class="preview"><a href="' + $el_preview.html() + '" class="item-preview blue" target="_blank">Live preview</a></p>'; // Project preview button
				}

				var content = '<div class="item-info-wrap clearfix"><h2 class="item-title">' + title + '</h2><p class="item-description">' + description + preview + '</p><div class="item-social">' + facebook + tweeter + '</div></div>';

				var type = this.type;
				var isTouch = document.createTouch !== undefined;

				if (type === 'iframe' || type === 'swf') {
					this.tpl[type] = $(this.tpl[type].replace(/\{rnd\}/g, new Date().getTime()))
						.attr('scrolling', isTouch ? 'auto' : this.iframe.scrolling)
						.attr('src', this.href);
				} else {
					content = this.tpl[type].replace('{href}', this.href) + content;
				}

				$.extend(this, {
					aspectRatio : false,
					width : '860px',
					type : 'html',
					content : content
				});
			}
		});

		/*Fancybox for project without information only images or videos */
		$(".project-no-info").fancybox({
			openEffect : 'none',
			closeEffect : 'none',
			nextEffect : 'elastic',
			prevEffect : 'elastic',
			padding : 0,
			margin : [20, 60, 20, 60],
			helpers : {
				title : null,
				media : {}
			}
		});

		/* Fancybox for Gallery */
		$(".gallery-slider").fancybox({
			openEffect : 'none',
			closeEffect : 'none',
			nextEffect : 'elastic',
			prevEffect : 'elastic',
			padding : 0,
			margin : [20, 60, 20, 60],
			helpers : {
				type : null,
				media : {}
			}
		});

		/* Initialize news vertical titles menu */
		jQuery('#carousel').jcarousel({
			vertical : true,
			scroll : 1
		});

		/* Bind on "click" in news navigation button */
		$('.jcarousel-item a').on('click', function (e) {
			if (!$(this).hasClass('active')) {
				var i = $(this).attr('href');
				$(this).parent().parent().find('a').removeClass('active');
				$(this).addClass('active');
				$('.news-content').find('.active').fadeOut(300, function () {
					$(this).addClass('hide');
				}).removeClass('active');
				$(i).fadeIn(1000).addClass('active');
			}
			e.preventDefault();
		});
		
		if($.browser.chrome || $.browser.webkit)
		{
			$('body').addClass('chrome');
		}

		/* Fill skills-level */
		$('.skills-item-level').each(function () {
			var level = $(this).data('level');
			$('<div>').addClass('level-fill').width(level).appendTo(this);
			$('<span>').html(level).appendTo(this);
		});

		/* Check if SLIDER height is > from window height and fix it */
		$('.slider').each(function (i, v) {
			if ($(v).find('.setheight').length > 0) {
				if ($(v).height() > $(window).height()) {
					var a = $(v).height() - $(window).height() + 5;
					var b = $(v).find('.setheight').height() - a;
					$(v).find('.setheight').css('max-height', b + 'px').addClass('scrolled');
				}
			}
		});

		/* ROTATE Gallery pictures on random angle from -7deg to +7deg */
		$('.gallery-items li').each(function () {
			var from = -7;
			var to = 7;
			var deg = Math.floor(Math.random() * (to - from + 1) + from);
			$(this).css({
				'-webkit-transform' : 'rotate(' + deg + 'deg)', // for Chrome
				'-moz-transform' : 'rotate(' + deg + 'deg)', // for firefox
				'transform' : 'rotateZ(' + deg + 'deg)' // for IE
			});
		});

		/* Press ESC key - close slider */
		$(document).bind('keydown', function (e) {
			if (e.keyCode === 27) {
				$('.slider:visible .slideUp').trigger('click');
			}
		});

		/* Initialize Google Maps when document load */
		initialize();
	});

	function center() {
		return ($(document).height() - $('#menu').height()) / 2;
	}

	// Load facebbok like button Asynchronous
	(function (d, s, id) {
		var js,
		fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
		fjs.parentNode.insertBefore(js, fjs);
	}
		(document, 'script', 'facebook-jssdk'));
}).call(this);
