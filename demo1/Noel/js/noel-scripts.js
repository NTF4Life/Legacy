/*
	Template: Noel | Onepage AJAX Template
	Author: flGravity
	Site: http://themeforest.net/user/flGravity
	Created: 24/08/12
	File: Noel Scripts
*/

(function($){


	/** Noel Settings */
	
	var settings = {
		//background slider settings
		backslider: {
			mode: 'controls',					// "controls" or "timer" mode
			timerDelay: 5000,					// slideshow delay (for "timer" mode)
			effect: 'crossfade',				// effect ("fade", "crossfade", "slidefade" or "slide")
			effectTime: 1200,					// effect animation time
			effectEasing: 'easeOutQuint',		// effect animation easing
			startRandom: false,					// start on random slide
			preload: true, 						// preload background images
			preloadTime: 1000,					// preload screen fadeout time 
			preloadDelay: 500					// preload screen fadeout delay
		},
		//menu animation settings
		menu: {
			hoverIn: 500,						// menu background hover-in time
			hoverOut: 300,						// menu background hover-out time
			hoverEasingIn: 'easeOutCubic',		// menu background hover-in easing
			hoverEasingOut: 'easeInCubic',		// menu background hover-out time
			backsliderDelay: 500,				// time after menu click to switch to the next slide
			backsliderCarousel: true			// cycle through slides on every menu click 

		},
		//section animation settings
		section: {
			timeOpen: 500,						// section open time
			timeClose: 500,						// section close time
			easingOpen: 'easeOutCubic',			// section open easing
			easingClose: 'easeOutCubic',		// section close easing
			contentTime: 300,					// content fade-in time
			contentEasing: 'easeOutCubic'		// content fade-in easing
		},
		//site intro
		intro: {
			enable: true, 						// enable intro
			time: 300,							// intro fade time
			easing: 'easeOutCubic',				// intro fade easing
			topOffset: '20px',					// intro fade top position 
			menuTime: 300,						// menu show time
			menuDelay: 200,						// menu show delay
			menuEasing: 'easeInCubic'			// menu show easing
		},
		//goole map
		map: {
			address: 'Los Angeles, CA',			// address or lat,lng value
			zoom: 17,							// map zoom level
			controls: true,						// show controls
			icon: 'images/marker.png',			// custom marker icon
			hue: '#00aaff',						// hue value
			saturation: -100,					// saturation value
			lightness: -30,						// lightness value
			gamma: 0.4							// gamma value
		},
		//gallery
		gallery: {
			photoHoverOpacity: 0.7,				// photo hover opacity
			photoHoverTime: 200,				// photo hover time
			photoHoverEasing: 'swing',   		// photo hover easing
			fancyboxClass: 'fancybox',			// fancybox class
			fancyboxGroup: 'album',				// fancybox group
			photoSource: 'picasa',				// photo source ("flickr", "picasa" or "none")
			photoRange: '0-10',					// photo range ("" or "1-3,5,6,7-9")
			description: false,					// show photo description ("flickr" or "picasa")
			flickrFeed: 'photoset.gne', 		// flickr API feed name
			flickrQuery: {						// flickr API query arguments
				set: '72157594223783465',		// flickr set ID
				nsid: '71865026@N00'			// flickr user ID
			},
			picasaQuery: {						// picasa API query arguments
				user: '104073350269405140941',	// picasa user ID
				album: '5572378341793211809',	// picasa album ID
				imgmax: '1000u'					// picasa photo size ('d'-original,'NNc'-cropped,'NNu'-uncropped)
			}
		},
		//projects slideshow
		slideshow: {
			mode: 'auto',						// slideshow mode ("auto" or "wheel")
			animation: 'crossfade',				// animation - "fade" or "crossfade"
			easing: 'swing',					// slideshow animation easing
			time: 300,							// slideshow animation time
			delay: 500,							// slideshow animation delay ("auto" mode)
			controls: true						// show controls ("wheel" mode)
		},
		//news
		news: {
			photoHoverOpacity: 0.7,				// news photo hover opacity
			photoHoverTime: 300,				// news photo hover time
			photoHoverEasing: 'swing',			// news photo hover easing
			expandTime: 500,					// description expand time
			expandEasing: 'easeOutCubic',		// description expand easing
			expandPadding: 40,					// news block top/bottom padding
			autoCollapse: true					// auto collapse previous news
		}
	};
	
	
	/** Section Plugins (use "this" as context in selectors) */
	
	var plugins = function(methods){
				
		// "BackSlider" plugin
		$('#background',this).backslider(settings.backslider);
		
		// "Tipsy" plugin
		$('a[title]:not(.fancybox)',this).tipsy({gravity:'n',offset:5});
		
		// "FancyBox" plugin
		$('.fancybox:not(.vimeo)',this).fancybox({
			padding: 0,
			overlayColor: '#000',
			overlayOpacity: 0.5,
			titlePosition: 'over'
		});
		
		//"Fancybox" for vimeo
		$('.fancybox.vimeo').fancybox({
			padding: 0,
			overlayColor: '#000',
			overlayOpacity: 0.5,
			titlePosition: 'over',
			width: 640,
			height: 480,
			type: 'iframe'
		});
		
		// "RollBar" plugin
		$('.sections-inner',this).rollbar({
			pathPadding:40,
			wheelSpeed:10,
			lazyCheckScroll:500,
			scrollTime: 300,
			scrollEasing: 'easeOutCubic'
		});
		
		// "FlexSlider" plugin
		$('.flexslider',this).flexslider({
			controlNav: false,
			animation: 'slide',
			slideshowSpeed: 5000,
			start: function(s){
				$('<div class="flex-slide-counter">'+
				(s.currentSlide+1)+' of '+s.count+'</div>').appendTo(s);
			},
			after: function(s){
				s.find('.flex-slide-counter').text((s.currentSlide+1)+' of '+s.count);
			}
		});
		
		//"Backslider" plugin in static mode
		$('.backslider-static',this).backslider({
			mode: 'thumbnails', 
			effect: 'slide',
			effectTime: 500,
			preloadDelay: 0,
			photoSource: 'none',
			photoRange: ''
		});
		
		// "Tweetable" plugin
		$('.twitter-feed',this).tweetable({
			username:'envatowebdev',
			time:true,
			limit:5,
			onload: function(){
				var index = 0, feed = $(this).find('.tweetList');
				window.setInterval(function(){
					index = (++index < feed.children().length)?index:0;
					feed.animate({top:-index*40},'slow');						
				},5000);
			}
		});
		
		// "Validate" plugin
		$('#send-message',this).validate({
			rules: {
				name: 'required',
				email: {required:true, email:true},
				message: 'required'				
			},
			errorPlacement: function(error, element) {},
			submitHandler: function(form){
				$.ajax(form.action, {
					type: form.method,
					data: $(form).serialize(),
					success: function(data, status, xhr){
						form.submit.value = data;
						window.setTimeout(function(){
							form.reset();
							form.submit.value = "Send Message";
						},1200);
					},
					error: function(xhr,status){
						form.submit.value = status;
					}
				});
			}
		});	
		
		// "Noel Google Map" plugin
		$('#map',this).noel('map',settings.map);
		
		//"Noel Gallery" plugin
		$('#photo_gallery',this).noel('gallery',$.extend(settings.gallery,{
			oncreate: function(){
				//init fancybox when loaded from flickr or picasa
				$('a.fancybox',this).fancybox({
					padding: 0,
					overlayColor: '#000',
					overlayOpacity: 0.5,
					titlePosition: 'over'
				});
			}
		}));
		
		//"Noel Slideshow" plugin
		$('.projects .project-photo',this).noel('slideshow',settings.slideshow);
		
		//"Noel News" plugin
		$('.news',this).noel('news',settings.news);
		
		//"Noel ShareBox" plugin
		$('.sharebox',this).noel('sharebox',null);
		
		//"Noel Section Size" plugin
		$(this).noel('secsize',null);
		
		//"Noel Placeholder fix" plugin
		$('input[type="text"],input[type="email"],textarea',this).noel('placeholder',null);	
				
		//"Noel Section Link" plugin
		$(this).noel('sectionlink',{'methods': methods});
		
		//"Noel Tabs" plugin
		$('.tabs',this).noel('tabs',{animate:false,ontab:function(){
				$(this).find('img').css('opacity',0).fadeTo('slow',1);
			}
		});
	};
	
	
	/** DOM ready */
	$(function(){
		var content = $('#content');
		var sidenav = $('#sidenav');
		var wrapper = $('#wrapper');
		var sections = $('#sections');
		var methods = {
			/* function to switch site background */
			changeBackground: function(index){
				//do noting if backslider is in "timer" mode 
				if(settings.backslider.mode != "timer"){
					window.setTimeout(function(){
						var arg = (settings.menu.backsliderCarousel)?'next':['skip',index];
						$('#background').trigger('backslider',arg);
					},settings.menu.backsliderDelay);
				}
			},
			/* function to open requested section by DOM "id" and load its content with ajax */
			loadSection: function(id){
				var section = sections.find('.section-block[id="'+id+'"]');
				//do nothing if section is already visible
				if(section.is(':visible')) { return; } 
				this.unloadSection(function(){
					if(section.length){
						// if section has "ajax-section" link load content with ajax
						if(section.find('a.ajax-section').length){
							var url = section.find('a.ajax-section').attr('href');
							sections.find('.sections-inner').addClass('loading');
							section.load(url,function(){
								sections.find('.sections-inner').removeClass('loading');
								section.fadeIn(settings.section.contentTime,settings.section.contentEasing);
								//init plugins in context of loaded section
								plugins.call(section, methods);
							});
						} else {
							//if not ajax, show content right away
							section.fadeIn(settings.section.contentTime,settings.section.contentEasing);
						}
						//check site navigation and set menu item active
						sidenav.find('nav li a[href="#/'+id+'"]').parent().addClass('nav-active');
						//reset scrollbar
						$('.sections-inner').trigger('rollbar','reset');
					}					
				});
			},
			/* function to close currently visible section and run callback at the end of animation */
			unloadSection: function(callback){
				//check site navigation and set menu item inactive
				sidenav.find('.nav-active').removeClass('nav-active');
				if(sections.find('.section-block:visible').length){
					sections.find('.section-block:visible').
					stop().fadeOut(settings.section.contentTime,settings.section.contentEasing,function(){
						if(typeof callback == 'function') callback();
					});
				} else {
					if(typeof callback == 'function') callback();
				}
			},
			/* function to open sections container */
			openSection: function(callback){
				if(!sections.hasClass('sections-active')){	
					//if sections container is not visible, show it first					
					sections.stop().animate({width:content.width()-sidenav.outerWidth()},
						settings.section.timeOpen,settings.section.easingOpen,function(){
							sections.addClass('sections-active');
							callback.call(sections);
					});
					//when section is visible, show close button
					sections.find('.sections-close').delay(settings.section.timeOpen).fadeIn('fast');
				} else {
					callback.call(sections);
				}
			},
			/* function to close section container */
			closeSection: function(){
				sections.removeClass('sections-active').stop().
				animate({width:0},settings.section.timeClose,settings.section.easingClose);
				sections.find('.sections-close').fadeOut('fast');
			}
		};
		
		
		/* site intro (if enabled) */
		if(settings.intro.enable == true){
			var intro = content.find('#intro');
			//first shift site menu to the left
			content.css('left',-content.find('#sidenav').outerWidth());
			//show intro and assign click handler to intro-close button
			intro.show().find('.intro-close').click(function(){
				intro.animate({
					opacity:0,
					'margin-top':settings.intro.topOffset
				},settings.intro.time,settings.intro.easing,function(){
					intro.hide();
					content.animate({left:0},settings.intro.menuTime,settings.intro.menuEasing);
				});
			});
			//site logo returns to intro
			content.find('header .site-logo').click(function(){
				//if section is open add additional delay to close it
				var delay = content.find('#sections').hasClass('sections-active')?settings.section.timeClose:0;
				//hide menu and show intro
				content.delay(delay+settings.intro.menuDelay).animate({
					left: -content.find('#sidenav').outerWidth()
				},settings.intro.menuTime,settings.intro.menuEasing,function(){
					intro.show().animate({opacity:1,'margin-top':0},settings.intro.time,settings.intro.easing);
				})
			});
		}
		
		/* keep content vertically centered during resize */
		$(window).resize(function(){
			content.css('top', Math.max(10,(wrapper.height() - content.height()) / 2));
			//sections div width adjustments
			if(sections.hasClass('sections-active')) {
				sections.css('width',content.width()-sidenav.outerWidth());
			}
		}).trigger('resize');
		
		/* assign click handler to section close button and site logo */
		$('<a class="sections-close" href="#" title="Close">Close</a>').
		appendTo(sections).tipsy({gravity:'e'}).hide().
		add('header .site-logo').click(function(){
			methods.unloadSection(methods.closeSection);
		});
								
		/* assign click handlers to menu items using "Noel Menu" plugin */
		sidenav.noel('menu',$.extend(settings.menu,{
			onclick: function(name,index){
				methods.openSection(function(){
					methods.changeBackground(index);
					methods.loadSection(name);
				});
			}
		}));
		
		//hashchanhe event
		$(window).bind('hashchange',function(){
			var hash_match = /^#\/(\w+)/.exec(location.hash);
			//check if we are not in intro now
			if(settings.intro.enable && content.find('#intro').is(':visible')) return;
			hash_match && methods.openSection(function(){
				methods.loadSection(hash_match[1]);
			});	
		});
				
		// auto open site section by hash in URL
		if(/^#\/\w+/.test(location.hash)){
			var hash_match = /^#\/(\w+)/.exec(location.hash);
			//skip intro changes
			if(settings.intro.enable){
				intro.hide();
				content.css('left',0);
			}
			//wait for backslider preload
			var preload_delay = 0;
			if(settings.backslider.preload){
				preload_delay = settings.backslider.preloadTime+settings.backslider.preloadDelay;
			}
			//open requested section
			window.setTimeout(function(){
				methods.openSection(function(){
					methods.loadSection(hash_match[1]);
				});
			},preload_delay);
		}		
				
		/* init all plugins */
		plugins.call(window.document,methods);	
					
	}); 
	/** DOM ready */
})(jQuery);