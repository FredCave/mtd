<?php

// SECURITY: HIDE USERNAMES
add_action(‘template_redirect’, ‘bwp_template_redirect’);
function bwp_template_redirect() {
    if ( is_author() ) {
        wp_redirect( home_url() ); 
        exit;
    }
}

// HIDE VERSION OF WORDPRESS
function wpversion_remove_version() {
        return '';
    }
add_filter('the_generator', 'wpversion_remove_version');

// ENQUEUE CUSTOM SCRIPTS
function enqueue_mtd_scripts() {
  
    wp_deregister_script( 'jquery' );
	// wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
    wp_register_script( 'jquery', get_template_directory_uri() . '/assets/js/lib/_jquery.min.js');
	wp_enqueue_script( 'jquery' );  
 
    wp_register_script( "custom_ajax", get_template_directory_uri() . '/js/ajax_calls.js#asyncload', array('jquery'), true );
    wp_localize_script( "custom_ajax", "myAjax", array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );        
    wp_enqueue_script( "custom_ajax" );

}
add_action('wp_enqueue_scripts', 'enqueue_mtd_scripts');

// ADD CUSTOM POST TYPES
add_action( 'init', 'create_post_types' );
function create_post_types() {
    register_post_type( 'articles',
    array(
        'labels' => array(
            'name' => __( 'Articles' )
        ),
        'public' => true,
        'show_in_rest' => true,
        'taxonomies' => array('category','post_tag'),
        'has_archive' => true,
        'supports' => array('editor','title'),
        'menu_position' => 5
        )
    );
}

// ADD CUSTOM IMAGE SIZES
add_theme_support( 'post-thumbnails' );
add_image_size( 'extralarge', 1200, 1200 );
add_image_size( 'ultralarge', 1600, 1600 );

// IMAGE OBJECT

// function mtd_image_object( $image, $title, $saved_width, $saved_top, $saved_left, $saved_z_index ) {
//     if( !empty($image) ): 
//         $width = $image['sizes'][ 'thumbnail-width' ];
//         $height = $image['sizes'][ 'thumbnail-height' ];
//         $thumb = $image['sizes'][ "thumbnail" ]; // 300
//         $medium = $image['sizes'][ "medium" ]; // 600
//         $large = $image['sizes'][ "large" ]; // 900
//         $extralarge = $image['sizes'][ "extralarge" ]; // 1200
//         $ultralarge = $image['sizes'][ "ultralarge" ]; // 1200
//         $id = $image["id"];
//         $class = "landscape";
//         if ( $height > $width ) {
//         	$class = "portrait";	
//         }
//         echo "<img id='" . $id . "' 
//         	class='image " . $class . "' 
//             alt='Lola Hakimian – " . $title . "' 
//             data-width='" . $saved_width . "' 
//             data-ratio='" . $height / $width . "' 
//             data-top='" . $saved_top . "' 
//             data-left='" . $saved_left . "' 
//             data-zindex='" . $saved_z_index . "' 
//             data-thm='" . $thumb . "' 
//             data-med='" . $medium . "' 
//             data-lrg='" . $large . "' 
//             data-xlg='" . $extralarge . "' 
//             data-ulg='" . $ultralarge . "' 
//             src='" . $ultralarge . "' />";
//     endif;
// }

// AJAX CALLS

add_action( 'wp_ajax_intro', 'mtd_intro' );
add_action( 'wp_ajax_nopriv_intro', 'mtd_intro' );

function mtd_intro () { 

    include( "includes/intro_template.php" );

    wp_die();

}

add_action( 'wp_ajax_article', 'mtd_article' );
add_action( 'wp_ajax_nopriv_article', 'mtd_article' );

function mtd_article () {

    // $_REQUEST CONTAINS DATA SENT VIA AJAX
    if ( isset($_REQUEST) ) {
        
        $id = $_REQUEST['id'];
        
        echo include( "includes/article_template.php" );

        wp_die();
        
    }

}

add_action( 'wp_ajax_articledata', 'mtd_article_data' );
add_action( 'wp_ajax_nopriv_articledata', 'mtd_article_data' );

function mtd_article_data () {

    echo include( "includes/article_data.php" );

    wp_die();
        
}


// SET STYLES IN ARTICLES

function mtd_template_style ( $template ) {

    echo $template;

}

// CUSTOM URL QUERY

function myplugin_register_query_vars( $vars ) {
    $vars[] = 'art';
    return $vars;
}
add_filter( 'query_vars', 'myplugin_register_query_vars' ); 

?>