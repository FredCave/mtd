<?php 

    $articles = array(
        19  => "A Path for the Documentation of Teaching Practice.pdf", 
        324 => "A Path for the Documentation of Teaching Practice - Perspective.pdf", 
        326 => "A Path for the Documentation of Teaching Practice - Your Mirror.pdf", 
        328 => "A Path for the Documentation of Teaching Practice - Traces and Documents.pdf", 
        330 => "A Path for the Documentation of Teaching Practice - Terminology and Dance Transmission.pdf", 
        334 => "A Path for the Documentation of Teaching Practice - Making a Glossary of Dance Teaching Terms.pdf", 
        337 => "A Path for the Documentation of Teaching Practice - Dance Digitalization.pdf", 
        34  => "The Skin is the Most External Layer of the Brain.pdf", 
        45  => "Work to Be Discovered.pdf", 
        35  => "Documentation as (Part of) Artistic Practice.pdf", 
        133 => "Stewardship.pdf", 
        47  => "It Is Only a Draft: Envisioning Documenting in Education.pdf", 
        134 => "Three Interviews on Documenting Practices.pdf", 
        46  => "Hunting, Gathering, Cultivating.pdf", 
        48  => "My Personal Teaching Map.pdf", 
        49  => "Class Plan Templates.pdf", 
        55  => "Manual for Video Documentation of a Dance Class.pdf", 
        127 => "Video Tech.pdf", 
        50  => "How Do I Make a Sustainable Plan for My Documentation.pdf", 
        52  => "On Scores.pdf", 
        54  => "Moving Drawing Writing.pdf", 
        53  => "Art from Art - A Possible Collaborative Documentation.pdf", 
        184 => "Art from Art - Collaboration Examples.pdf", 
        130 => "Hunting, Gathering, Cultivating: Practical Scores.pdf", 
        56  => "Tracing the Invisible - Writing as a Trace.pdf", 
        232 => "Tracing the Invisible - Writing Experiments.pdf", 
        57  => "Scratching the Script.pdf", 
        59  => "Warming Up the Attention.pdf", 
        131 => "Fascia as Metaphor and Narrator.pdf", 
        295 => "Fascia as Metaphor and Narrator: Glossary of Terms.pdf", 
        58  => "Capacity of Language.pdf", 
        132 => "Dance Notation.pdf", 
        65  => "More to Explore.pdf", 
    );

    // GET SELECTED ARTICLES FROM QUERY
    $arts = get_query_var( 'art' );
    $ids = [];
    if ( $arts === "" ) {
        return;
    }
        // IF MULTIPLE ARTICLES: SPLIT
    if ( strpos($arts, ',') !== false ) {
        $ids = explode ( "," , $arts );
        $multiple_articles = true;
    } else {
        $ids[] = intval ( $arts );
        $multiple_articles = false;
    }

    require_once __DIR__ . '/mpdf/mpdf.php';

    $mpdf = new mPDF();
    $mpdf->SetImportUse(); 

    // LOOP THROUGH ARTICLES
    $articles_query = new WP_Query( array( 
        'post__in'  => $ids, 
        'post_type' => 'articles',
        'orderby'   => 'post__in',
        'posts_per_page'   => 99
    ) ); 
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post();

            $title = get_the_title() . '.pdf';
            $id = get_the_ID();

            $broken = array( 334, 326, 53, 132, 35, 295, 50, 130, 47 );

            if ( in_array( $id, $broken ) ) {
            } else {

                // GET FILE PATH FROM THEME FOLDER
                $file_path = __DIR__ . '/pdfs/' . $articles[$id]; 

                // echo $file_path;
                
                // GET PAGES FROM PDF
                $pagecount = $mpdf->SetSourceFile($file_path);
                for ( $i=1; $i<=$pagecount; $i++ ) {
                    $import_page = $mpdf->ImportPage($i);
                    $mpdf->UseTemplate($import_page);
                    $mpdf->AddPage();
                }

            }

        endwhile;
        wp_reset_postdata();
    endif; 

    if ( $multiple_articles ) {
        $filename = 'Mind The Dance.pdf';
    } else {
        $filename = $title;
    }

    // $mpdf->WriteHTML($html);
    // $mpdf->Output($filename, 'I');
    // exit;

?>