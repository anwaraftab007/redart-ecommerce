jQuery.noConflict();
jQuery(document).ready(function($){
	
	"use strict";
	
		Pace.on("done", function(){
			$(".loader-wrapper").fadeOut(500);
			$(".pace").remove();
		});
		
		/*To Top*/
		$().UItoTop({ easingType: 'easeOutQuart' });
		
		//Accordion & Toggle
		$('.dt-sc-toggle').toggle(function(){ $(this).addClass('active'); },function(){ $(this).removeClass('active'); });
		$('.dt-sc-toggle').on("click", function(){ $(this).next('.dt-sc-toggle-content').slideToggle(); });
		
		$('.dt-sc-toggle-frame-set').each(function(){
			var $this = $(this),
				$toggle = $this.find('.dt-sc-toggle-accordion');
				
				$toggle.on("click", function(){
					if( $(this).next().is(':hidden') ) {
						$this.find('.dt-sc-toggle-accordion').removeClass('active').next().slideUp();
						$(this).toggleClass('active').next().slideDown();
					}
					return false;
				});
				
				//Activate First Item always
				$this.find('.dt-sc-toggle-accordion:first').addClass("active");
				$this.find('.dt-sc-toggle-accordion:first').next().slideDown();
		});//Accordion & Toggle
		
		
		// Tabs Shortcodes
		if($('ul.dt-sc-tabs').length > 0) {
		  $('ul.dt-sc-tabs').tabs('> .dt-sc-tabs-content', {
			  effect: 'fade'
		  });
		}
		
		if($('ul.dt-sc-tabs-frame').length > 0){
		  $('ul.dt-sc-tabs-frame').tabs('> .dt-sc-tabs-frame-content', {
			  effect: 'fade'
		  });
		}
		
		if($('.dt-sc-tabs-vertical-frame').length > 0){
		  
		  $('.dt-sc-tabs-vertical-frame').tabs('> .dt-sc-tabs-vertical-frame-content', {
			  effect: 'fade'
		  });
		  
		  $('.dt-sc-tabs-vertical-frame').each(function(){
			$(this).find("li:first").addClass('first').addClass('current');
			$(this).find("li:last").addClass('last');
		  });
		  
		  $('.dt-sc-tabs-vertical-frame li').on("click", function(){
			$(this).parent().children().removeClass('current');
			$(this).addClass('current');
		  });
		  
		}/*Tabs Shortcode Ends*/
		
		//Mobile Menu
		$("#dt-menu-toggle").on("click", function( event ){
			event.preventDefault();
			var $menu;
			$menu = $("nav#main-menu").find("ul.menu:first");
			$menu.slideToggle(function(){
				$menu.css('overflow' , 'visible');
				$menu.toggleClass('menu-toggle-open');
			});
		});
		
		$(".dt-menu-expand").on("click", function(event){
			if( $(this).hasClass("dt-mean-clicked") ){
				$(this).text("+");
				if( $(this).prev('ul').length ) {
					$(this).prev('ul').slideUp(400);
				} else {
					$(this).prev('.megamenu-child-container').find('ul:first').slideUp(600);
				}
			} else {
				$(this).text("-");
				if( $(this).prev('ul').length ) {
					$(this).prev('ul').slideDown(400);
				} else{
					$(this).prev('.megamenu-child-container').find('ul:first').slideDown(2000);
				}
			}
			
			$(this).toggleClass("dt-mean-clicked");
			return false;
		});
		
		//Mobile Menu End				
	
	//**MAIN-MENU FUNCTIONS**//
	
	$('.menu-trigger').on('click', function(e){
		toggle3dBlock(!$('.header').hasClass('nav-is-visible'));
		if($('.menu-trigger').parents('.header').hasClass('nav-is-visible')) $('#header').css({ top: 0 }).stop().animate({ top: '100px' }, 200);
		else $('#header').stop().animate({ top: 0 }, 600);
		e.preventDefault();
	});

	function toggle3dBlock(addOrRemove) {
		if(typeof(addOrRemove)==='undefined') addOrRemove = true;	
		$('.header').toggleClass('nav-is-visible', addOrRemove);
		$('main').toggleClass('nav-is-visible', addOrRemove);
		$('#main-menu').toggleClass('nav-is-visible', addOrRemove);
	}

	var isMobile = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ? true : false;
	var currentWidth = window.innerWidth || document.documentElement.clientWidth;	
	
	//create a sticky nav
	if(!isMobile && currentWidth > 767) {
		var headerH = $('#header').height();
		$(document).bind('ready scroll', function() {
			var docScroll = $(document).scrollTop();
			if($('#header').length && docScroll >= headerH) {
				if (!$('#header').hasClass('header-animate') && !$('#header').hasClass('nav-is-visible')) {
					$('#header').addClass('header-animate').css({ top: '-155px' }).stop().animate({ top: 0 }, 500);
				}
			} else {
				$('#header').removeClass('header-animate');
			}
		});
	}

	//**MAIN-MENU FUNCTIONS ENDS**//	

	//Tooltip
	 if($(".dt-sc-tooltip-bottom").length){
		$(".dt-sc-tooltip-bottom").each(function(){	$(this).tipTip({maxWidth: "auto"}); });
	 }
	  
	 if($(".dt-sc-tooltip-top").length){
		$(".dt-sc-tooltip-top").each(function(){ $(this).tipTip({maxWidth: "auto",defaultPosition: "top"}); });
	 }
	  
	 if($(".dt-sc-tooltip-left").length){
		$(".dt-sc-tooltip-left").each(function(){ $(this).tipTip({maxWidth: "auto",defaultPosition: "left"}); });
	 }
	  
	 if($(".dt-sc-tooltip-right").length){
		$(".dt-sc-tooltip-right").each(function(){ $(this).tipTip({maxWidth: "auto",defaultPosition: "right"}); });
	 }
	 
	/* PrettyPhoto For Portfolio */
	if($(".portfolio").length) {
		$(".portfolio a[data-gal^='prettyPhoto']").prettyPhoto({hook:'data-gal',animation_speed:'normal',theme:'dark_rounded',slideshow:3000, autoplay_slideshow: false,social_tools: false,deeplinking:false});		
	}
	
	// Parallax Section
	$('.parallax').each(function(){
		$(this).bind('inview', function (event, visible) {
			if(visible === true) {
				$(this).parallax("50%", 0.3);
			} else {
				$(this).css('background-position','');
			}
		});
	});
	
	/* Loadmore For Portfolio */
		
	var j = 1;
	$('.loadmore').on("click", function(e){
	
		if(j == 3) {
			$('.loadmore').html('<i class="fa fa-exclamation-triangle"></i> <span> Thats All!! </span>').css({"cursor":"default"});
			$('.loadmore').attr('data-hover', 'Thats All!');
		} else {

			$.ajax({
				type: "POST",
				url: "contents/portfolio-content-two-"+j+".html",
				dataType: "html",
				cache: false,
				msg : '',
				error: function (xhr, status, error) {
					confirm('Something went wrong!');
				},
				beforeSend: function(){
					$('.loadmore').html('<i class="fa fa-magic"></i> <span> Loading... </span>');
					$('.loadmore').attr('data-hover', 'Loading...');
				},
				success: function(msg){
					$('.dt-sc-portfolio-container').append(msg);
					$('.dt-sc-portfolio-container').isotope( 'reloadItems' ).isotope();
				},
				complete: function(){
					if(j == 2) {
						$('.loadmore').html('<i class="fa fa-exclamation-triangle"></i> <span> Thats All!! </span>').css({"cursor":"default"});
						$('.loadmore').attr('data-hover', 'Thats All!');
					} else {
						$('.loadmore').html('<i class="fa fa-paint-brush"></i> <span> More Art </span>').css({"cursor":"pointer"});
						$('.loadmore').attr('data-hover', 'More Art');
					}
					j++;	
					
					/* PrettyPhoto For Portfolio */
					if($(".portfolio").length) {
						$(".portfolio a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false,social_tools: false,deeplinking:false});		
					}
									
				} 
			});
			
		}
		
		//Isotope relayout...
		setTimeout(function() {
			   $('.dt-sc-portfolio-container').isotope('reLayout');
			   $(window).resize();
		}, 600);
		
		setTimeout(function() {
			   $(window).resize();
		}, 1200);
			   
		e.preventDefault();
	});	
	

	//Window Load Start
	$(window).load(function(){
		
		//PORTFOLIO ISOTOPE CATEGORY...
		var $container = $('.dt-sc-portfolio-container');
		if( $container.length) {
			
			var $width = 15;
	
			$(window).smartresize(function(){
				$container.css({overflow:'hidden'}).isotope({itemSelector : '.portfolio',masonry: { gutter: $width } });
			});
			
			$container.isotope({
			  filter: '*',
			  masonry: { gutterWidth: $width },
			  animationOptions: { duration: 750, easing: 'linear', queue: false  }
			});
		}
		
		if($("div.dt-sc-sorting-container").length){
			$("div.dt-sc-sorting-container a").on("click", function(){
				var $width = 15;				
				$("div.dt-sc-sorting-container a").removeClass("active-sort");
				var selector = $(this).attr('data-filter');
				$(this).addClass("active-sort");
				$container.isotope({
					filter: selector,
					masonry: { gutterWidth: $width },
					animationOptions: { duration:750, easing: 'linear',  queue: false }
				});
			return false;	
			});
		}
		
		//FRAME ISOTOPE CATEGORY...
		var $framecontainer = $('.dt-sc-frame-container');
		if( $framecontainer.length) {
			
			var $width = 12;
	
			$(window).smartresize(function(){
				$framecontainer.css({overflow:'hidden'}).isotope({itemSelector : '.frame',masonry: { gutter: $width } });
			});
			
			$framecontainer.isotope({
			  filter: '*',
			  masonry: { gutterWidth: $width },
			  animationOptions: { duration: 750, easing: 'linear', queue: false  }
			});
		}
		
		if($("div.frame-sorting").length){
			$("div.frame-sorting a").on("click", function(){
				var $width = 12;				
				$("div.frame-sorting a").removeClass("active-sort");
				var selector = $(this).attr('data-filter');
				$(this).addClass("active-sort");
				$framecontainer.isotope({
					filter: selector,
					masonry: { gutterWidth: $width },
					animationOptions: { duration:750, easing: 'linear',  queue: false }
				});
				var framesel = selector.replace('.', '');
				if(framesel == '*') framesel = 'all';
				$('.dt-frames').stop().slideUp(500);
				$('#frame-'+framesel).stop().slideDown(500);

			return false;	
			});
		}
		
		
	 // animate css + jquery inview configuration
		 $(".animate").each(function () {
			$(this).bind('inview', function (event, visible) {
				var $delay = "";
				var $this = $(this),
					$animation = ($this.data("animation") !== undefined) ? $this.data("animation") : "slideUp";
				$delay = ($this.data("delay") !== undefined) ? $this.data("delay") : 300;
	
				if (visible === true) {
					   setTimeout(function () { $this.addClass($animation); }, $delay);
			   } else {
					   setTimeout(function() { $this.removeClass('animate'); } );
			   }
			});
		});
		
		//Blog
		if( $(".apply-isotope").length ){
			$(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { gutterWidth: 14} });
		}//Blog	
		
		// Blog Prev / Next Loader //
		
		$('.blog .post-next-link a').on("click", function(e){
			
			var  $this = $(this),
				$fetch_page = parseInt($this.attr('data-page'), 10)+1;
			
			$.ajax({
				type: "POST",
				url: "contents/blog-content-"+$fetch_page+".html",
				dataType: "html",
				cache: false,
				msg : '',
				error: function (xhr, status, error) {
					confirm('Something went wrong!');
				},
				beforeSend: function(){
					$.scrollTo($('.breadcrumb'), 800, { offset: { top: -150 }});
				},
				success: function(msg){
					$('.blog-items').html(msg);
					$('.blog-items').isotope( 'reloadItems' ).isotope();
				},
				complete: function(){
					$('.post-next-link').removeClass('hidden');
					$('.post-prev-link').removeClass('hidden');
					$('.post-next-link a').attr('data-page', $fetch_page);
					$('.post-prev-link a').attr('data-page', $fetch_page);
					if($fetch_page == 3) {
						$('.post-next-link').addClass('hidden');
						$('.post-prev-link').removeClass('hidden');
					}
					if($('.blog-slider').length) {
						$('.blog-slider').bxSlider({auto: false, mode: 'fade', pager: '', adaptiveHeight:true, autoHover:true });
					}
				} 
			});
				
			e.preventDefault();
			
		});
		
		$('.blog .post-prev-link a').on("click", function(e){
		
			var  $this = $(this),
				$fetch_page = parseInt($this.attr('data-page'), 10)-1;
		
			$.ajax({
				type: "POST",
				url: "contents/blog-content-"+$fetch_page+".html",
				dataType: "html",
				cache: false,
				msg : '',
				error: function (xhr, status, error) {
					confirm('Something went wrong!');
				},
				beforeSend: function(){
					$.scrollTo($('.breadcrumb'), 800, { offset: { top: -150 }});
				},
				success: function(msg){
					$('.blog-items').html(msg);
					$('.blog-items').isotope( 'reloadItems' ).isotope();
				},
				complete: function(){
					$('.post-prev-link').removeClass('hidden');
					$('.post-next-link').removeClass('hidden');
					$('.post-prev-link a').attr('data-page', $fetch_page);
					$('.post-next-link a').attr('data-page', $fetch_page);
					if($fetch_page == 1) {
						$('.post-prev-link').addClass('hidden');
						$('.post-next-link').removeClass('hidden');
					}
					if($('.blog-slider').length) {
						$('.blog-slider').bxSlider({auto: false, mode: 'fade', pager: '', adaptiveHeight:true, autoHover:true });
					}
				} 
			});
				
			e.preventDefault();
			
		});
		
		//SHOP ISOTOPE CATEGORY...
		var $containerproduct = $('.products');
		if( $containerproduct.length) {
			
			var $width = 24;
	
			$(window).smartresize(function(){
				$containerproduct.css({overflow:'hidden'}).isotope({itemSelector : '.product-wrapper',masonry: { gutter: $width } });
			});
			
			$containerproduct.isotope({
			  filter: '*',
			  masonry: { gutterWidth: $width },
			  animationOptions: { duration: 750, easing: 'linear', queue: false  }
			});
		}
		
		//SHOP Quantity Box...
		
		$('.plus').on("click", function(e){
			e.preventDefault();
			var currentVal = parseInt($(this).parents('.quantity').find('input[name="quantity"]').val(), 10);
			if (!isNaN(currentVal)) {
				$(this).parents('.quantity').find('input[name="quantity"]').val(currentVal + 1);
			} else {
				$(this).parents('.quantity').find('input[name="quantity"]').val(0);
			}
		});
	
		$(".minus").on("click", function(e) {
			e.preventDefault();
			var currentVal = parseInt($(this).parents('.quantity').find('input[name="quantity"]').val(), 10);
			if (!isNaN(currentVal) && currentVal > 0) {
				$(this).parents('.quantity').find('input[name="quantity"]').val(currentVal - 1);
			} else {
				$(this).parents('.quantity').find('input[name="quantity"]').val(0);
			}
		});
		
		
		//DROP-DOWN Box.../
		$( function() {
			
			$('.shop-dropdown').each(function() {
				$(this).dropdown( {
					gutter : 4,
					stack : false,
					delay : 100,
					slidingIn : 58
				});
			});

		});				
			

		// Bx SLIDER //
		if($('.blog-slider').length) {
			$('.blog-slider').bxSlider({
				auto: true,
				mode: 'fade',
				pager: '', 
				adaptiveHeight:true,
				autoHover:true
			});
			//$(".blog-slider").bxSlider({ auto:false, useCSS:false, pagerCustom: '#bx-pager', autoHover:true, adaptiveHeight:true });
		}
		
		if($('.blog-slider').length) {
			$('.blog-slider').bxSlider({auto: false, mode: 'fade', pager: '', adaptiveHeight:true, autoHover:true });
		}
		
		//Recent gallery slider...
		if( $(".recent-gallery").find("li").length > 1 ) {
			$(".recent-gallery").bxSlider({ auto: true, useCSS:false, pagerCustom: '#bx-pager', autoHover:true, adaptiveHeight:true });
		}		
		
		//Donutchart
		jQuery(".dt-sc-donutchart").each(function(){
			var $this = jQuery(this);
			var $bgColor =  ( $this.data("bgcolor") !== undefined ) ? $this.data("bgcolor") : "#5D18D6";
			var $fgColor =  ( $this.data("fgcolor") !== undefined ) ? $this.data("fgcolor") : "#000000";
			var $size = ( $this.data("size") !== undefined ) ? $this.data("size") : "100";
		 
			$this.donutchart({'size': $size, 'fgColor': $fgColor, 'bgColor': $bgColor , 'donutwidth' : 5 });
			$this.donutchart('animate');
		});
		//Donutchart Shortcode Ends
		
		//Progress Bars...
		(function($){
			$(".dt-sc-progress").one('inview', function (event, visible) {
				var $this = $(this),
				pvalue = $this.find('.dt-sc-bar').attr('data-value');
				
				if (visible == true) {
					$this.find('.dt-sc-bar').animate({width: pvalue + "%"},600,function(){ $this.find('.dt-sc-bar-text').fadeIn(400); });
				}
			});
		})(jQuery);	
		
		//Contact Map...
		var $map = $('#contact_map');
		if( $map.length ) {
			$map.gMapResp({
				address: 'Iamdesigning, 1/52,3/53, Lal Bahadhur Colony,Shringar Nagar Road, Near Gopal Naidu School, Peelamedu, Coimbatore, TN 641004',
				zoom: 16,
				markers: [{ 
					  address : 'Iamdesigning, 1/52,3/53, Lal Bahadhur Colony,Shringar Nagar Road, Near Gopal Naidu School, Peelamedu, Coimbatore, TN 641004',
					  html: 'No: 58 A, East Madison St, Baltimore, MD, USA',
					  icon: { 
							image: "js/images/mapicon.png",
							iconsize: [26, 47],
						} ,
					  key: 'key1'
					}],
				scrollwheel: false,
				styles: [ { "stylers": [ { "featureType": "all" }, { "saturation": -100 }, { "gamma": 0.50 }, {"lightness": 30 } ] } ],
			});
		}
				
		// NEWSLETTER //
		
		if($('form[name="frmnewsletter"]').length) {
				
			//NEWSLETTER AJAX SUBMIT...
			$('form[name="frmnewsletter"]').submit(function () {
				
				var This = $(this);
				if($(This).valid()) {
					var action = $(This).attr('action');
		
					var data_value = unescape($(This).serialize());
					$.ajax({
						 type: "POST",
						 url:action,
						 data: data_value,
						 error: function (xhr, status, error) {
							 confirm('Something went wrong!');
						   },
						  success: function (response) {
							$('#ajax_subscribe_msg').html(response);
							$('#ajax_subscribe_msg').slideDown('slow');
							if (response.match('success') !== null) $(This).slideUp('slow');
						 }
					});
				}
				return false;
				
			});
			$('form[name="frmnewsletter"]').validate({
				rules: { 
					mc_email: { required: true, email: true }
				},
				errorPlacement: function(error, element) { }
			});
			
		}
		
			(function() {
				// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
				if (!String.prototype.trim) {
					(function() {
						// Make sure we trim BOM and NBSP
						var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
						String.prototype.trim = function() {
							return this.replace(rtrim, '');
						};
					})();
				}

				[].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
					// in case the input is already filled..
					if( inputEl.value.trim() !== '' ) {
						classie.add( inputEl.parentNode, 'input--filled' );
					}

					// events:
					inputEl.addEventListener( 'focus', onInputFocus );
					inputEl.addEventListener( 'blur', onInputBlur );
				} );

				function onInputFocus( ev ) {
					classie.add( ev.target.parentNode, 'input--filled' );
				}

				function onInputBlur( ev ) {
					if( ev.target.value.trim() === '' ) {
						classie.remove( ev.target.parentNode, 'input--filled' );
					}
				}
			})();
		
		
		if($('form[name="enqform"]').length) {
			
			//CONTACT FORM AJAX SUBMIT...
			$('form[name="enqform"]').submit(function () {
				var This = $(this);
				
				if($(This).valid()) {
					var action = $(This).attr('action');
		
					var data_value = unescape($(This).serialize());
					$.ajax({
						 type: "POST",
						 url:action,
						 data: data_value,
						 error: function (xhr, status, error) {
							 confirm('The page save failed.');
						   },
						  success: function (response) {
							$('#ajax_contactform_msg').html(response);
							$('#ajax_contactform_msg').slideDown('slow');
							if (response.match('success') !== null) $(This).slideUp('slow');
						 }
					});
				}
				return false;
			});
			$('form[name="enqform"]').validate({
				onfocusout: function(element)
				{	
					$(element).valid();
				},
				rules: { 
					txtname: { required: true },
					txtemail: { required: true, email: true },
					txtmessage: { required: true }
				}
			});
		
		}
		
	});

	jQuery(window).load(function() {
		'use strict';
		var $ = jQuery;
		chart();
		graph();
		
		//Pie Chart
		function chart() {
		  var $ = jQuery;
		  
		  $('.chart').each(function () {
			var $this             = $(this),
				line              = [],
				type              = 'line',
				width             = '100%',
				height            = '225',
				lineColor         = '#e1e1e1',
				fillColor         = 'rgba(0, 0, 0, .05)',
				spotColor         = '#a9a8a8',
				minSpotColor      = '#c6c6c6',
				maxSpotColor      = '#727070',
				verticalLineColor = '#e1e1e1',
				spotColorHovered  = '#1e1e1e',
				lineWidth         = 2,
				barSpacing        = 8,
				barWidth          = 18,
				barColor          = 'rgba(0, 0, 0, .2)',
				offset            = 0,
				sliceColors       = [],
				colorMap          = [],
				rangeColors       = ['#d3dafe', '#a8b6ff', '#7f94ff'],
				posBarColor	      = '#c6c6c6',
				negBarColor	      = '#727070',
				zeroBarColor      = '#a9a8a8',
				performanceColor  = '#575656',
				targetWidth       = 5,
				targetColor       = '#1e1e1e';
			  
			if ($this.attr('data-line') !== undefined && $this.attr('data-line') !== false) {
			  line = $this.attr('data-line').split(/,/);
			}
			if ($this.attr('data-height') !== undefined && $this.attr('data-height') !== false) {
			  height = $this.attr('data-height');
			}
			if ($this.attr('data-line-width') !== undefined && $this.attr('data-line-width') !== false) {
			  lineWidth = $this.attr('data-line-width');
			}
			if ($this.attr('data-line-color') !== undefined && $this.attr('data-line-color') !== false) {
			  lineColor = $this.attr('data-line-color');
			}
			if ($this.attr('data-vertical-line-color') !== undefined && $this.attr('data-vertical-line-color') !== false) {
			  verticalLineColor = $this.attr('data-vertical-line-color');
			}
			if ($this.attr('data-spot-color-hovered') !== undefined && $this.attr('data-spot-color-hovered') !== false) {
			  spotColorHovered = $this.attr('data-spot-color-hovered');
			}
			if ($this.attr('data-spot-color') !== undefined && $this.attr('data-spot-color') !== false) {
			  spotColor = $this.attr('data-spot-color');
			}
			if ($this.attr('data-min-spot-color') !== undefined && $this.attr('data-min-spot-color') !== false) {
			  minSpotColor = $this.attr('data-min-spot-color');
			}
			if ($this.attr('data-max-spot-color') !== undefined && $this.attr('data-max-spot-color') !== false) {
			  maxSpotColor = $this.attr('data-max-spot-color');
			}
			if ($this.attr('data-bar-spacing') !== undefined && $this.attr('data-bar-spacing') !== false) {
			  barSpacing = $this.attr('data-bar-spacing');
			}
			if ($this.attr('data-bar-width') !== undefined && $this.attr('data-bar-width') !== false) {
			  barWidth = $this.attr('data-bar-width');
			}
			if ($this.attr('data-bar-color') !== undefined && $this.attr('data-bar-color') !== false) {
			  barColor = $this.attr('data-bar-color');
			}
			if ($this.attr('data-color-map') !== undefined && $this.attr('data-color-map') !== false) {
			  colorMap = $this.attr('data-color-map').split(/, /);
			}
			if ($this.attr('data-offset') !== undefined && $this.attr('data-offset') !== false) {
			  offset = $this.attr('data-offset');
			}
			if ($this.attr('data-slice-colors') !== undefined && $this.attr('data-slice-colors') !== false) {
			  sliceColors = $this.attr('data-slice-colors').split(/, /);
			}
			if ($this.attr('data-range-colors') !== undefined && $this.attr('data-range-colors') !== false) {
			  rangeColors = $this.attr('data-range-colors').split(/, /);
			}
			if ($this.attr('data-target-width') !== undefined && $this.attr('data-target-width') !== false) {
			  targetWidth = $this.attr('data-target-width');
			}
			if ($this.attr('data-pos-bar-color') !== undefined && $this.attr('data-pos-bar-color') !== false) {
			  posBarColor = $this.attr('data-pos-bar-color');
			}
			if ($this.attr('data-neg-bar-color') !== undefined && $this.attr('data-neg-bar-color') !== false) {
			  negBarColor = $this.attr('data-neg-bar-color');
			}
			if ($this.attr('data-performance-color') !== undefined && $this.attr('data-performance-color') !== false) {
			  performanceColor = $this.attr('data-performance-color');
			}
			if ($this.attr('data-fill-color') !== undefined && $this.attr('data-fill-color') !== false) {
			  fillColor = $this.attr('data-fill-color');
			}
			if ($this.attr('data-type') == 'bar') {
			  type = 'bar';
			}
			if ($this.attr('data-type') == 'pie') {
			  type = 'pie';
			  width = 'auto';
			}
			if ($this.attr('data-type') == 'discrete') {
			  type = 'discrete';
			}
			if ($this.attr('data-type') == 'tristate') {
			  type = 'tristate';
			}
			if ($this.attr('data-type') == 'bullet') {
			  type = 'bullet';
			}
			if ($this.attr('data-type') == 'box') {
			  type = 'box';
			}
			
			$this.sparkline(line, {
			  type               : type,
			  width              : width,
			  height             : height,
			  lineColor          : lineColor,
			  fillColor          : fillColor,
			  lineWidth          : lineWidth,
			  spotColor          : spotColor,
			  minSpotColor       : minSpotColor,
			  maxSpotColor       : maxSpotColor,
			  highlightSpotColor : spotColorHovered,
			  highlightLineColor : verticalLineColor,
			  spotRadius         : 6,
			  chartRangeMin      : 0,
			  barSpacing         : barSpacing,
			  barWidth           : barWidth,
			  barColor           : barColor,
			  offset             : offset,
			  sliceColors        : sliceColors,
			  colorMap           : colorMap,
			  posBarColor	     : posBarColor,
			  negBarColor	     : negBarColor,
			  zeroBarColor       : zeroBarColor,
			  rangeColors        : rangeColors,
			  performanceColor   : performanceColor,
			  targetWidth        : targetWidth,
			  targetColor        : targetColor
			});
		  });
		}
		
		function graph($re) {
		  var $ = jQuery,
			  tax_data;
		  
		  if ($re) {
			$('.graph').html('');
		  }
		  
		  tax_data = [
			{
			  period: "2011 Q3",
			  licensed: 3407,
			  sorned: 660
			}, {
			  period: "2011 Q2",
			  licensed: 3351,
			  sorned: 629
			}, {
			  period: "2011 Q1",
			  licensed: 3269,
			  sorned: 618
			}, {
			  period: "2010 Q4",
			  licensed: 3246,
			  sorned: 661
			}, {
			  period: "2009 Q4",
			  licensed: 3171,
			  sorned: 676
			}, {
			  period: "2008 Q4",
			  licensed: 3155,
			  sorned: 681
			}, {
			  period: "2007 Q4",
			  licensed: 3226,
			  sorned: 620
			}, {
			  period: "2006 Q4",
			  licensed: 3245,
			  sorned: null
			}, {
			  period: "2005 Q4",
			  licensed: 3289,
			  sorned: null
			}
		  ];
		  
		//Hero-Donut Chart
		  
		  if ($('#hero-donut').length) {
			Morris.Donut({
			  element   : "hero-donut",
			  data      : [
				{
				  label: "Acrylic Art",
				  value: 80
				}, {
				  label: "Sculpture",
				  value: 30
				}, {
				  label: "Dropper Art",
				  value: 60
				}, {
				  label: "Sketches",
				  value: 70
				}
			  ],
			  colors:['#58b9da',"#a81c51","#f4d30f","#fe6b35"],
			  height    : 100,
			  formatter : function(y) {
				return y + "%";
			  }
			});
		  } 
		}
	
		//Diagram-bar
		if ($('#diagram').length) {
			
			var o = {
				init: function(){
					this.diagram();
				},
				random: function(l, u){
					return Math.floor((Math.random()*(u-l+1))+l);
				},
				diagram: function(){
					var r = Raphael('diagram', 320, 320),
						rad = 20,
						defaultText = 'Skills',
						speed = 250;
					
					r.circle(160, 160, 40).attr({ stroke: 'none', fill: '#193340' });
					
					var title = r.text(160, 160, defaultText).attr({
						font: '12px Arial',
						fill: '#fff'
					}).toFront();
					
					r.customAttributes.arc = function(value, color, rad){
						var v = 3.6*value,
							alpha = v == 360 ? 359.99 : v,
							random = o.random(91, 240),
							a = (random-alpha) * Math.PI/180,
							b = random * Math.PI/180,
							sx = 160 + rad * Math.cos(b),
							sy = 160 - rad * Math.sin(b),
							x = 160 + rad * Math.cos(a),
							y = 160 - rad * Math.sin(a),
							path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
						return { path: path, stroke: color }
					}
					
					$('.get').find('.arc').each(function(i){
						var t = $(this), 
							color = t.find('.color').val(),
							value = t.find('.percent').val(),
							text = t.find('.text').text();
						
						rad += 24;	
						var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': 12 });
						
						z.mouseover(function(){
							this.animate({ 'stroke-width': 24, opacity: .75 }, 1000, 'elastic');
							if(Raphael.type != 'VML') //solves IE problem
							this.toFront();
							title.stop().animate({ opacity: 0 }, speed, '>', function(){
								this.attr({ text: text + '\n' + value + '%' }).animate({ opacity: 1 }, speed, '<');
							});
						}).mouseout(function(){
							this.stop().animate({ 'stroke-width': 12, opacity: 1 }, speed*4, 'elastic');
							title.stop().animate({ opacity: 0 }, speed, '>', function(){
								title.attr({ text: defaultText }).animate({ opacity: 1 }, speed, '<');
							});	
						});
					});
					
				}
			}
			$(function(){ o.init(); });
		
		}
		
	});		

});