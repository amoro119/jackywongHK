var $j = jQuery.noConflict();

/* jquery.imagefit 
 *
 * Version 0.2 by Oliver Boermans <http://www.ollicle.com/eg/jquery/imagefit/>
 *
 * Extends jQuery <http://jquery.com>
 *
 */
(function($) {
	$.fn.imagefit = function(options) {
		var fit = {
			all : function(imgs){
				imgs.each(function(){
					fit.one(this);
					})
				},
			one : function(img){
				$(img)
					.width('100%').each(function()
					{
						$(this).height(Math.round(
							$(this).attr('startheight')*($(this).width()/$(this).attr('startwidth')))
						);
					})
				}
		};
		
		this.each(function(){
				var container = this;
				
				// store list of contained images (excluding those in tables)
				var imgs = $('img', container).not($("table img"));
				
				// store initial dimensions on each image 
				imgs.each(function(){
					$(this).attr('startwidth', $(this).width())
						.attr('startheight', $(this).height())
						.css('max-width', $(this).attr('startwidth')+"px");
				
					fit.one(this);
				});
				// Re-adjust when window width is changed
				$(window).bind('resize', function(){
					fit.all(imgs);
				});
			});
		return this;
	};
})(jQuery);

$j.fn.getIndex = function(){
	var $jp=$j(this).parent().children();
    return $jp.index(this);
}
 
jQuery.fn.extend({
  slideRight: function() {
    return this.each(function() {
    	jQuery(this).show();
    });
  },
  slideLeft: function() {
    return this.each(function() {
    	jQuery(this).hide();
    });
  },
  slideToggleWidth: function() {
    return this.each(function() {
      var el = jQuery(this);
      if (el.css('display') == 'none') {
        el.slideRight();
      } else {
        el.slideLeft();
      }
    });
  }
});

$j.fn.setNav = function(){
	$j('#main_menu li ul').css({display: 'none'});

	$j('#main_menu li').each(function()
	{	
		var $jsublist = $j(this).find('ul:first');
		
		$j(this).hover(function()
		{	
			position = $j(this).position();
			$j(this).animate({left: '0px'}, 200);
			
			if($j(this).parents().attr('class') == 'sub-menu')
			{	
				$jsublist.stop().css({height:'auto', display:'none'}).fadeIn(200);
			}
			else
			{
				$jsublist.stop().css({overflow: 'visible', height:'auto', display:'none'}).fadeIn(400);
				
				if(BrowserDetect.browser == 'Explorer' && BrowserDetect.version < 8)
 				{
 					hackMargin = -$j(this).width()-2;
					$jsublist.css({marginLeft: hackMargin+'px'});
				}
			}
		},
		function()
		{	
			$j(this).animate({left: '-10px'}, 200);
			$jsublist.stop().css({height:'auto', display:'none'}).fadeOut(200);	
		});

	});
	
	$j('#menu_wrapper .nav ul li ul').css({display: 'none'});
}

$j(document).ready(function(){ 

	$j(document).setNav();

	$j('.pp_gallery a').fancybox({ 
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers	: {
			title	: {
				type: 'outside'
			},
			overlay	: {
				opacity : 1,
				css : {
					'background-color' : '#000'
				}
			},
			thumbs	: {
				width	: 60,
				height	: 60
			}
		}
	});
	
	$j('.flickr li a').fancybox({ 
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers	: {
			title	: {
				type: 'outside'
			},
			overlay	: {
				opacity : 1,
				css : {
					'background-color' : '#000'
				}
			},
			thumbs	: {
				width	: 60,
				height	: 60
			}
		}
	});
	
	$j('a.fancy-gallery').fancybox({
		padding : 0,
		prevEffect	: 'fade',
		nextEffect	: 'fade',
		helpers	: {
			title	: {
				type: 'outside'
			},
			overlay	: {
				opacity : 1,
				css : {
					'background-color' : '#000'
				}
			},
			thumbs	: {
				width	: 80,
				height	: 80
			}
		}
	});
	
	$j('.img_frame').fancybox({ 
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers	: {
			title	: {
				type: 'outside'
			},
			overlay	: {
				opacity : 1,
				css : {
					'background-color' : '#000'
				}
			},
			thumbs	: {
				width	: 60,
				height	: 60
			}
		}
	});
	
	$j('.lightbox_youtube').fancybox({ 
		padding: 0,
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers	: {
			title	: {
				type: 'outside'
			},
			overlay	: {
				opacity : 1,
				css : {
					'background-color' : '#000'
				}
			},
			thumbs	: {
				width	: 60,
				height	: 60
			}
		}
	});
	
	$j('.lightbox_vimeo').fancybox({ 
		padding: 0,
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers	: {
			title	: {
				type: 'outside'
			},
			overlay	: {
				opacity : 1,
				css : {
					'background-color' : '#000'
				}
			},
			thumbs	: {
				width	: 60,
				height	: 60
			}
		}
	});
	
	$j('input[title!=""]').hint();
	
	$j('textarea[title!=""]').hint();
	
	$j('.post_img').hover(
		function(){
			$j(this).stop().animate({
					'opacity': .8
				}, 400);
		},
		function(){
			$j(this).stop().animate({
					'opacity': 1
				}, 400);
		}
	);
	
	$j('.portfolio_img').hover(
		function(){
			$j(this).stop().animate({
					'opacity': .8
				}, 400);
		},
		function(){
			$j(this).stop().animate({
					'opacity': 1
				}, 400);
		}
	);
	
	$j('.post_img').click(
		function(event){
			$j(this).children('a').trigger('click');
		}
	);
	
	var calScreenHeight = $j(window).height()-108;
	var miniRightPos = 800;
	
	$j('#page_minimize').click(function(){
		$j(this).css('visibility', 'hidden');
		$j('#page_maximize').css('visibility', 'visible');
		$j('#page_content_wrapper').fadeOut();
		$j('.gallery_social').fadeOut();
		$j('#imageFlow').fadeOut();
		$j('.gallery_mansory_wrapper').fadeOut();
	});
	
	$j('#page_maximize').click(function(){
		$j(this).css('visibility', 'hidden');
		$j('#page_minimize').css('visibility', 'visible');
		$j('#page_content_wrapper').fadeIn();
		$j('.gallery_social').fadeIn();
		$j('#imageFlow').fadeIn();
		$j('.gallery_mansory_wrapper').fadeIn();
	});
	
	$j('#pp_contact_view_mape').click(function(){
		$j('#page_content_wrapper').fadeOut();
		$j('#page_maximize').css('visibility', 'visible');
	});
	
	// Create the dropdown base
	$j("<select />").appendTo("#menu_border_wrapper");
	
	// Create default option "Go to..."
	$j("<option />", {
	   "selected": "selected",
	   "value"   : "",
	   "text"    : "- Main Menu -"
	}).appendTo("#menu_border_wrapper select");
	
	// Populate dropdown with menu items
	$j(".nav li").each(function() {
	 var current_item = $j(this).hasClass('current-menu-item'); 
	 var el = $j(this).children('a');
	 var menu_text = el.text();

	 if($j(this).parent('ul.sub-menu').length > 0)
	 {
	 	menu_text = "- "+menu_text;
	 }
	 
	 if($j(this).parent('ul.sub-menu').parent('li').parent('ul.sub-menu').length > 0)
	 {
	 	menu_text = el.text();
	 	menu_text = "- - "+menu_text;
	 }
	 
	 if(current_item)
	 {
	 	$j("<option />", {
	 		 "selected": "selected",
	    	 "value"   : el.attr("href"),
	    	 "text"    : menu_text
		 }).appendTo("#menu_border_wrapper select");
	 }
	 else
	 {
	 	$j("<option />", {
	     	"value"   : el.attr("href"),
	     	"text"    : menu_text
	 	}).appendTo("#menu_border_wrapper select");
	 }
	});
	
	$j("#menu_border_wrapper select").change(function() {
  		window.location = $j(this).find("option:selected").val();
	});
	
	var $container = $j('.gallery_mansory_wrapper');
    $container.isotope();
    
    $j('#menu_expand_wrapper a').click(function(){
    	$j('#menu_wrapper').fadeIn();
	    $j('#custom_logo').animate({'left': '15px', 'opacity': 1}, 400);
	    $j('#main_menu li').each(function(){
	    	$j(this).animate({'left': '-10px', 'opacity': 1}, 400);
	    });
	    $j('#menu_close').animate({'left': '-10px', 'opacity': 1}, 400);
	    $j(this).animate({'left': '-60px', 'opacity': 0}, 400);
	    $j('#menu_border_wrapper select').animate({'left': '0', 'opacity': 1}, 400).fadeIn();
    });
	
	$j('#menu_close').click(function(){
		$j('#custom_logo').animate({'left': '-200px', 'opacity': 0}, 400);
	    $j('#main_menu li').each(function(){
	    	$j(this).animate({'left': '-200px', 'opacity': 0}, 400);
	    });
	    $j(this).stop().animate({'left': '-200px', 'opacity': 0}, 400);
	    $j('#menu_expand_wrapper a').animate({'left': '20px', 'opacity': 1}, 400);
	    $j('#menu_border_wrapper select').animate({'left': '-200px', 'opacity': 0}, 400).fadeOut();
	    $j('#menu_wrapper').fadeOut();
	});
	
	var isDisplayMenu = $j('#pp_display_menu').val();
	var windowWidth = $j(window).width();
	
	if(isDisplayMenu!='' && windowWidth > 480)
	{
		setTimeout(function() {
			$j('#menu_expand_wrapper a').trigger('click');
		}, 1000 );
	}
	
	$j('#menu_expand_wrapper a').tipsy({gravity: 'w'});
	
	var footerLi = 0;
	$j('#footer .sidebar_widget li.widget').each(function()
	{
		footerLi++;
		
		if(footerLi%$j('#pp_footer_style').val() == 0)
		{ 
			$j(this).addClass('last');
		}
	});
	
	// Isotope
	// modified Isotope methods for gutters in masonry
	jQuery.Isotope.prototype._getMasonryGutterColumns = function() {
	    var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
	    	containerWidth = this.element.width();
  
	this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
              // or use the size of the first item
              this.$filteredAtoms.outerWidth(true) ||
              // if there's no items, use size of container
              containerWidth;

	this.masonry.columnWidth += gutter;

	this.masonry.cols = Math.floor( ( containerWidth + gutter ) / this.masonry.columnWidth );
	this.masonry.cols = Math.max( this.masonry.cols, 1 );
	};

	jQuery.Isotope.prototype._masonryReset = function() {
	    // layout-specific props
	    this.masonry = {};
	    // FIXME shouldn't have to call this again
	    this._getMasonryGutterColumns();
	    var i = this.masonry.cols;
	    this.masonry.colYs = [];
	    while (i--) {
	    	this.masonry.colYs.push( 0 );
	    }
	};

	jQuery.Isotope.prototype._masonryResizeChanged = function() {
	    var prevSegments = this.masonry.cols;
	    // update cols/rows
	    this._getMasonryGutterColumns();
	    // return if updated cols/rows is not equal to previous
	    return ( this.masonry.cols !== prevSegments );
	};
  
	// cache jQuery window
	var $window = jQuery(window);
  
	// cache container
	var $container = jQuery('#photo_wall_wrapper');
	
	// start up isotope with default settings
	$container.imagesLoaded( function(){
	    reLayout();
	    $window.smartresize( reLayout );
	});
	
	function reLayout() {

	    masonryOpts = {
		  columnWidth: $container.width() / 4
		};

	    $container.isotope({
	      resizable: false, // disable resizing by default, we'll trigger it manually
	      itemSelector : '.wall_entry',
	      masonry: masonryOpts
	    }).isotope( 'reLayout' );

	}
	
	$j(window).resize(function() {
		if($j(this).width() < 768)
		{
			$j('#menu_expand_wrapper a').trigger('click');
		}
	});
	
	var isDisableRightClick = $j('#pp_enable_right_click').val();
	var disableRightClickTxt = $j('#pp_right_click_text').val();
	
	if(isDisableRightClick!='')
	{
		$j(this).bind("contextmenu", function(e) {
	    	alert(disableRightClickTxt);
	    });
	}
});
