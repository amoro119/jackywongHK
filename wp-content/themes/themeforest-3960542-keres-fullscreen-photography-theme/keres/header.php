<?php
/**
 * The Header for the template.
 *
 * @package WordPress
 */
 
if ( ! isset( $content_width ) ) $content_width = 960;

if(session_id() == '') {
	session_start();
}
 
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

<title><?php wp_title('&lsaquo;', true, 'right'); ?><?php bloginfo('name'); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

<?php
	/**
	*	Get favicon URL
	**/
	$pp_favicon = get_option('pp_favicon');
	
	if(!empty($pp_favicon))
	{
?>
		<link rel="shortcut icon" href="<?php echo $pp_favicon; ?>" />
<?php
	}
?>

<?php    
    $pp_advance_combine_css = get_option('pp_advance_combine_css');
	
	if(!empty($pp_advance_combine_css))
	{	
		if(!file_exists(get_stylesheet_directory_uri()."/cache/combined.css"))
		{
			$cssmin = new CSSMin();
    		
			$css_arr = array(
			    get_template_directory().'/css/screen.css',
			    get_template_directory().'/js/fancybox/jquery.fancybox.css',
			    get_template_directory().'/js/fancybox/jquery.fancybox-thumbs.css',
			    get_template_directory().'/css/supersized.css',
			    get_template_directory().'/css/tipsy.css',
			);
			
   			$cssmin->addFiles($css_arr);
 			
    		// Set original CSS from all files
    		$cssmin->setOriginalCSS();
    		$cssmin->compressCSS();
 			
    		$css = $cssmin->printCompressedCSS();
    		
    		file_put_contents(get_template_directory()."/cache/combined.css", $css);
    	}
    	
		wp_enqueue_style("combined_css", get_stylesheet_directory_uri()."/cache/combined.css", false, THEMEVERSION);
	}
	else
	{
		wp_enqueue_style("screen", get_stylesheet_directory_uri()."/css/screen.css", false, THEMEVERSION, "all");
		wp_enqueue_style("fancybox", get_stylesheet_directory_uri()."/js/fancybox/jquery.fancybox.css", false, THEMEVERSION, "all");
		wp_enqueue_style("fancybox_thumb", get_stylesheet_directory_uri()."/js/fancybox/jquery.fancybox-thumbs.css", false, THEMEVERSION, "all");
		wp_enqueue_style("supersized", get_stylesheet_directory_uri()."/css/supersized.css", false, THEMEVERSION, "all");
		wp_enqueue_style("tipsy", get_stylesheet_directory_uri()."/css/tipsy.css", false, THEMEVERSION, "all");
	}
	
	//Add custom colors and fonts
	wp_enqueue_style("custom_css", get_stylesheet_directory_uri()."/templates/custom-css.php", false, THEMEVERSION, "all");
	
	//Get Google Web font CSS
	if(isset($_SESSION['pp_font']))
	{
		$pp_font = $_SESSION['pp_font'];
	}
	else
	{
		$pp_font = get_option('pp_font');
	}
	
	if(!empty($pp_font))
	{
		wp_enqueue_style('google_fonts', "http://fonts.googleapis.com/css?family=".$pp_font."&subset=latin,cyrillic-ext,greek-ext,cyrillic", false, "", "all");
	}
	else
	{
		wp_enqueue_style('google_fonts', get_stylesheet_directory_uri()."/css/gfont.css", false, "", "all");
	}
	
	//Check if enable responsive layout
	$pp_enable_responsive = get_option('pp_enable_responsive');
	
	if(!empty($pp_enable_responsive))
	{
		wp_enqueue_style('grid', get_stylesheet_directory_uri()."/css/grid.css", false, "", "all");
	}
?>

<?php
	//Enqueue javascripts
	wp_enqueue_script("jquery");
	wp_enqueue_script("google_maps", "http://maps.google.com/maps/api/js?sensor=false", false, THEMEVERSION);
	wp_enqueue_script("swfobject", "http://ajax.googleapis.com/ajax/libs/swfobject/2.1/swfobject.js", false, THEMEVERSION);
	wp_enqueue_script("jquery.ui", get_stylesheet_directory_uri()."/js/jquery.ui.js", false, THEMEVERSION);
	
	$js_path = get_template_directory()."/js/";
	$js_arr = array(
		'jwplayer.js',
	    'fancybox/jquery.fancybox.pack.js',
	    'fancybox/jquery.fancybox-thumbs.js',
	    'fancybox/jquery.mousewheel-3.0.6.pack.js',
	    'jquery.touchwipe.1.1.1.js',
	    'gmap.js',
	    'jquery.validate.js',
	    'browser.js',
	    'jquery.backstretch.js',
	    'hint.js',
	    'jquery.flip.min.js',
	    'jquery.ppflip.js',
	    'jquery.isotope.js',
	    'supersized.3.1.3.js',
	    'supersized.shutter.js',
	    'jquery.tipsy.js',
	    'custom.js',
	);
	$js = "";

	$pp_advance_combine_js = get_option('pp_advance_combine_js');
	
	if(!empty($pp_advance_combine_js))
	{	
		if(!file_exists(get_template_directory()."/cache/combined.js"))
		{
			foreach($js_arr as $file) {
				if($file != 'jquery.js' && $file != 'jquery-ui.js')
				{
    				$js .= JSMin::minify(file_get_contents($js_path.$file));
    			}
			}
			
			file_put_contents(get_template_directory()."/cache/combined.js", $js);
		}

		wp_enqueue_script("combined_js", get_stylesheet_directory_uri()."/cache/combined.js", false, THEMEVERSION);
	}
	else
	{
		foreach($js_arr as $file) {
			if($file != 'jquery.js' && $file != 'jquery-ui.js')
			{
				wp_enqueue_script($file, get_stylesheet_directory_uri()."/js/".$file, false, THEMEVERSION);
			}
		}
	}
?> 

<?php
	/* Always have wp_head() just before the closing </head>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to add elements to <head> such
	 * as styles, scripts, and meta tags.
	 */
	wp_head();
?>

</head>

<?php
//Check homepage style for demo purpose
if(isset($_SESSION['pp_homepage_style']))
{
    $pp_homepage_style = $_SESSION['pp_homepage_style'];
}
else
{
    $pp_homepage_style = get_option('pp_homepage_style');
}
?>
<body <?php body_class(); ?> <?php if(is_home() && $pp_homepage_style == 'flow') { ?>data-gallery="flow"<?php } ?>>
	<?php
		//Check if disable right click
		$pp_enable_right_click = get_option('pp_enable_right_click');
		$pp_right_click_text = get_option('pp_right_click_text');
	?>
	<input type="hidden" id="pp_enable_right_click" name="pp_enable_right_click" value="<?php echo $pp_enable_right_click; ?>"/>
	<input type="hidden" id="pp_right_click_text" name="pp_right_click_text" value="<?php echo $pp_right_click_text; ?>"/>
	<input type="hidden" id="pp_image_path" name="pp_image_path" value="<?php echo get_stylesheet_directory_uri(); ?>/images/"/>
	<?php 
		//Check if always display menu
		$pp_display_menu = get_option('pp_display_menu');
		
		if(is_home() && ($pp_homepage_style == 'youtube' OR $pp_homepage_style == 'vimeo' OR $pp_homepage_style == 'flow'))
		{
			$pp_display_menu = '';
		}
		
		if(isset($post->ID))
		{
			$current_page_tempalte = get_post_meta( $post->ID, '_wp_page_template', true );
		}
		else
		{
			$current_page_tempalte = '';
		}
		
		if((is_home() && $pp_homepage_style == 'wall') OR $current_page_tempalte=='template-gallery-youtube.php' OR $current_page_tempalte=='template-gallery-vimeo.php' OR $current_page_tempalte=='template-gallery-flow.php' OR $current_page_tempalte=='template-gallery-wall.php')
		{
			$pp_display_menu = '';
		}
	?>
	<input type="hidden" id="pp_display_menu" name="pp_display_menu" value="<?php echo $pp_display_menu; ?>"/>
	
	<?php
		//Check footer sidebar columns
		$pp_footer_style = get_option('pp_footer_style');
	?>
	<input type="hidden" id="pp_footer_style" name="pp_footer_style" value="<?php echo $pp_footer_style; ?>"/>

	<!-- Begin template wrapper -->
	<div id="wrapper">
	
	<div id="menu_expand_wrapper">
		<a href="javascript:;" title="<?php _e( 'Click here to Display Main Menu', THEMEDOMAIN ); ?>"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon_menu.png" alt=""/></a>
	</div>
	
	<div class="top_bar">
	
		<div id="menu_wrapper">
			
			<!-- Begin logo -->
					
			<?php
				//get custom logo
				$pp_logo = get_option('pp_logo');
							
				if(empty($pp_logo))
				{
					$pp_logo = get_stylesheet_directory_uri().'/images/logo.png';
				}

			?>
						
			<a id="custom_logo" class="logo_wrapper" href="<?php echo home_url(); ?>">
				<img src="<?php echo $pp_logo?>" alt=""/>
			</a>
						
			<!-- End logo -->
			
			<?php
				if(pp_detect_ie())
				{
			?>
			<br class="clear"/>	
			<?php
				}
				
				$current_browser = getBrowser();
				if(isset($current_browser['name']) && $current_browser['name']=='Opera')
				{
			?>
			<br class="clear"/>	
			<?php
				}
			?>
			
		    <!-- Begin main nav -->
		    <div id="nav_wrapper">
		    	<div class="nav_wrapper_inner">
		    		<div id="menu_border_wrapper">
		    			<?php 	
		    				if ( has_nav_menu( 'primary-menu' ) ) 
		    				{
			    			    //Get page nav
			    			    wp_nav_menu( 
			    			        	array( 
			    			        		'menu_id'			=> 'main_menu',
			    			        		'menu_class'		=> 'nav',
			    			        		'theme_location' 	=> 'primary-menu',
			    			        	) 
			    			    ); 
			    			}
			    			else
						    {
						     		echo '<div class="notice">Please setup "Main Menu" using Wordpress Dashboard > Appearance > Menus</div>';
						    }
		    			?>
		    		</div>
		    	</div>
		    </div>

		    <?php
				if(pp_detect_ie())
				{
			?>
			<br class="clear"/>	
			<?php
				}
			?>
			<?php				
				if(isset($current_browser['name']) && $current_browser['name']=='Opera')
				{
			?>
			<br class="clear"/>	
			<?php
				}
			?>
		    
		    <a id="menu_close" href="javascript:;"><?php _e( 'x Close', THEMEDOMAIN ); ?></a>
		    <!-- End main nav -->

		    </div> 
		</div>