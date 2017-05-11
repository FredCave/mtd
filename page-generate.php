<?php 

	// GET SELECTED ARTICLES FROM QUERY
	$arts = get_query_var( 'art' );
	$ids = [];
	if ( $arts === "" ) {
		return;
	}
		// IF COMMAS: SPLIT
	if ( strpos($arts, ',') !== false ) {
		$ids = explode ( "," , $arts );
	} else {
		$ids[] = intval ( $arts );
	}

    require_once __DIR__ . '/mpdf/mpdf.php';

    $mpdf = new mPDF();
    $html = "";

	$articles_query = new WP_Query( array( 
        'post__in' 	=> $ids, 
        'post_type' => 'articles',
        'orderby' 	=> 'post__in'
    ) ); 
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post();

    		$html .= "<span style='font-family:univers; font-size:5em'>";

			$html .= get_the_ID();
            // $html .= $post->post_name;
			$html .= get_the_title();
            // $html .= get_field("full_title");

            $html .= "</span>";
            
        endwhile;
        wp_reset_postdata();
    endif; 

    // echo $html;

	$mpdf->WriteHTML($html);
    // error_reporting(E_ALL);
    // var_dump( $mpdf );
    $mpdf->debug = true;
	$mpdf->Output();

?>