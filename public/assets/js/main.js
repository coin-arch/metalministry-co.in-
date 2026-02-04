 (function($) {
     "use strict";
     /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- */
     $(window).ready(function() {
         $('.tractour-loader').fadeOut();
         $('#spinner').delay(200).fadeOut('slow');

     });
         /*----------------------------
         		header middle short info Slider Active
         	------------------------------*/
         $(".header-middle-short-info").owlCarousel({
             loop: true,
             autoplay: true,
             smartSpeed: 1000,
             dots: false,
             nav: false,
             responsive: {
                 0: {
                     items: 1
                 },
                 600: {
                     items: 2
                 },
                 1000: {
                     items: 3
                 }
             }
         });

         /*----------------------------
    		hero Slider Active
    	------------------------------*/
         $(".tractor-main-slider").owlCarousel({
             loop: true,
             autoplay: true,    
			 animateOut: 'slideOutDown',
			 animateIn: 'flipInX',
             dots: false,
             nav: true,
             navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
             responsive: {
                 0: {
                     items: 1
                 },
                 600: {
                     items: 1
                 },
                 1000: {
                     items: 1
                 }
             }
         });

         $(".tractor-main-slider").on("translate.owl.carousel", function() {
             $(".tractor-single-slider h1, .tractor-single-slider p").removeClass("animated fadeInUp").css("opacity", "0");
             $(".tractor-single-slider .btn").removeClass("animated fadeInDown").css("opacity", "0");
         });

         $(".tractor-main-slider").on("translated.owl.carousel", function() {
             $(".tractor-single-slider h1, .tractor-single-slider p").addClass("animated fadeInUp").css("opacity", "1");
             $(".tractor-single-slider .btn").addClass("animated fadeInDown").css("opacity", "1");
         });

         /*----------------------------
         		about Slider Active
         	------------------------------*/
         $(".about-slider-wraper").owlCarousel({
             loop: true,
             autoplay: true,
             smartSpeed: 1000,
             dots: false,
             nav: true,
             navText: ["<span><i class='fa fa-long-arrow-left '></i> prev</span>", "<span>next <i class='fa fa-long-arrow-right '></i></span>"],
             responsive: {
                 0: {
                     items: 1
                 },
                 600: {
                     items: 1
                 },
                 1000: {
                     items: 1
                 }
             }
         });
         $(".about-slider-wraper").on("translate.owl.carousel", function() {
             $(".about-single-item h4").removeClass("animated fadeInUp").css("opacity", "0");
             $(".about-single-item h4").removeClass("animated fadeInDown").css("opacity", "0");
         });
         $(".about-slider-wraper").on("translated.owl.carousel", function() {
             $(".about-single-item h4").addClass("animated fadeInUp").css("opacity", "1");
             $(".about-single-item h4").addClass("animated fadeInDown").css("opacity", "1");
         });
         /*----------------------------
        		Counter Active
        	------------------------------*/
         $('.counter').counterUp({
             delay: 2,
             time: 1000
         });

         $('#bar1').barfiller({
             barColor: '#a7a6a6',
             duration: 3000
         });
         $('#bar2').barfiller({
             barColor: '#a7a6a6',
             duration: 3000
         });
         $('#bar3').barfiller({
             barColor: '#a7a6a6',
             duration: 3000
         });
         $('#bar4').barfiller({
             barColor: '#a7a6a6',
             duration: 3000
         });

         /*----------------------------
         		Testimonial Active
         	------------------------------*/
         $(".all-testimonial-wraper").owlCarousel({
             loop: true,
             autoplay: false,
             smartSpeed: 1000,
             dots: false,
             nav: true,
             navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
             responsive: {
                 0: {
                     items: 1
                 },
                 600: {
                     items: 1
                 },
                 1000: {
                     items: 1
                 }
             }
         });
         /*----------------------------
         		scrolltop active
         	------------------------------*/
         $('body').materialScrollTop();
         /*----------------------------
         		popup active
         	------------------------------*/
         $(".video-view").magnificPopup({
             type: "iframe"
         });
         /*----------------------------
           		Client Slider Active
           	------------------------------*/
         $(".all-client-slider").owlCarousel({
             loop: true,
             autoplay: false,
             smartSpeed: 1000,
             dots: false,
             nav: true,
             navText: ["<i class='fa fa-angle-left '></i>", "<i class='fa fa-angle-right '></i>"],
             responsive: {
                 0: {
                     items: 1
                 },
                 600: {
                     items: 2
                 },
                 1000: {
                     items: 4
                 }
             }
         });
         /*----------------------------
           		project Slider Active
           	------------------------------*/
         $(".project-slider").owlCarousel({
             loop: true,
             autoplay: false,
             smartSpeed: 1000,
             dots: false,
             nav: true,
             navText: ["<i class='fa fa-angle-left '></i>", "<i class='fa fa-angle-right '></i>"],
             responsive: {
                 0: {
                     items: 1
                 },
                 600: {
                     items: 2
                 },
                 1000: {
                     items: 4
                 }
             }
         });
         /*----------------------------
         		NiceSelect Active
         	------------------------------*/
         $('select').niceSelect();
         /*----------------------------
         		Price Filter Active
         	------------------------------*/
         $("#price-range").slider({
             range: true,
             min: 0,
             max: 500,
             values: [120, 388],
             slide: function(event, ui) {
                 $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
             }
         });
         $("#amount").val("$" + $("#price-range").slider("values", 0) +
             " - $" + $("#price-range").slider("values", 1));
         /*----------------------------
            		main menu Active
            	------------------------------*/
         jQuery('#mobile-menu').meanmenu({
             meanMenuContainer: '.mobile-menu',
             meanScreenWidth: "991"
         });

// WOW active
new WOW().init();
 })(jQuery);