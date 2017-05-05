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
	wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
    // wp_register_script( 'jquery', get_template_directory_uri() . '/js/_jquery.js');
	wp_enqueue_script( 'jquery' );  
 
    // wp_enqueue_script('all-scripts', get_template_directory_uri() . '/js/scripts.min.js', array('jquery'), true);

	// LOCALIZE DATA FOR SCRIPT – AUTHENTIFICATION FOR REST API
	// wp_localize_script( 'all-scripts', 'LH_SCRIPT', array(
	// 		'root' => esc_url_raw( rest_url() ),
	// 		'nonce' => wp_create_nonce( 'wp_rest' ),
	// 		'success' => __( 'Images saved.', 'your-text-domain' ),
	// 		'failure' => __( 'Error. Images not saved.', 'your-text-domain' ),
	// 		'current_user_id' => get_current_user_id()
	// 	)
	// );

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
        'taxonomies' => array('category'),
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

// REGISTER END POINTS

function mtd_get_article ( $request_data ) {

    $parameters = $request_data->get_params();

    $projects_query = new WP_Query( array( 
        'p' => $parameters["id"],
        'post_type' => 'articles' 
    ) );

    $data = array();
    // LOOP THROUGH POSTS
    if ( $projects_query->have_posts() ) :
        while ( $projects_query->have_posts() ) : $projects_query->the_post();    
            $data[] = array(
                'title'             => get_the_title()
            );
        endwhile;
        wp_reset_postdata();
    endif;
    // RETURN DATA
    if ( empty( $data ) ) {
        return null;
    }   
    return $data;
}

// GET ARTICLE LIST 

function mtd_all_articles () {

    $articles_query = new WP_Query( array( 
        'post_type' => 'articles' 
    ) );    
    if ( $articles_query->have_posts() ) :
        $data = array();
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); 
            global $post;
            $image = get_field("article_preview_image");
            $cats = get_the_category();
            foreach ( $cats as $cat ) {
                $article_cat = $cat->cat_name;
            }
            $data[] = array(
                "title"         => get_the_title(),
                "full_title"    => get_field("article_full_title"),
                "id"            => get_the_ID(),
                "slug"          => $post->post_name,
                "category"      => $article_cat,
                "image_thumb"   => $image["sizes"]["thumbnail"],
                "image_medium"  => $image["sizes"]["medium"],
                "image_large"   => $image["sizes"]["large"],
                "image_extra"   => $image["sizes"]["extralarge"],
                "next_post"     => get_next_post(),
                "prev_post"     => get_previous_post()
            );          
        endwhile;
        wp_reset_postdata();
    endif;
    // RETURN DATA
    if ( empty( $data ) ) {
        return null;
    }   
    return $data;

}

add_action( 'rest_api_init', function () {
    //  ARTICLES
    register_rest_route( 'custom/v1', '/article/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'mtd_get_article',
    ) );
    // ARTICLE LIST - NO CONTENT
    register_rest_route( 'custom/v1', '/all-articles', array(
        'methods' => 'GET',
        'callback' => 'mtd_all_articles',
    ) ); 
} );


// SET STYLES IN ARTICLES

function mtd_template_style ( $template ) {

    echo $template;

}


?>