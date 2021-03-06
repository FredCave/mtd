<?php 

    /* <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/print.css"> */
    

	// GET SELECTED ARTICLES FROM QUERY
	$arts = get_query_var( 'art' );
	$ids = [];
	if ( $arts === "" ) {
		return;
	}
		// IF COMMAS: SPLIT
	if ( strpos($arts, ',') !== false ) {
		$ids = explode ( "," , $arts );
        $multiple_articles = true;
	} else {
		$ids[] = intval ( $arts );
        $multiple_articles = false;
	}

    require_once __DIR__ . '/mpdf/mpdf.php';

    $mpdf = new mPDF();
    $mpdf->charset_in='UTF-8';
    $mpdf->SHYlang = 'en';
    $html = "";
    $title = "";

    // START OUTPUT BUFFER TO STORE CONTENT
    ob_start(); 

	$articles_query = new WP_Query( array( 
        'post__in' 	=> $ids, 
        'post_type' => 'articles',
        'orderby' 	=> 'post__in'
    ) ); 
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post();

    		// $html .= "<span style='font-family:univers; font-size:5em'>";

			// $html .= get_the_ID();
   //          $html .= $post->post_name;
            $title = get_the_title();
   //          $html .= get_the_title();
   //          $html .= get_field("full_title");

            // TEMPLATE SAVED TO BUFFER
            include("includes/pdf_template.php");

            // $html .= "</span>";
            
        endwhile;
        wp_reset_postdata();
    endif; 

    $content = ob_get_contents();
    
    // END OUTPUT BUFFER + APPEND TO HTML VARIABLE
    ob_end_clean();
    $html .= $content;

    // echo $html;

    $filename = $title .= ".pdf";

    $stylesheet = file_get_contents( get_bloginfo("template_url") . '/css/print.css');

    $mpdf->WriteHTML($stylesheet,1);

	$mpdf->WriteHTML($html);

    // $mpdf->showImageErrors = true;
    // error_reporting(E_ALL);
    // $mpdf->debug = true;
	$mpdf->Output($filename,'I');

?>