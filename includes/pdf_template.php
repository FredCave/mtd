

    <htmlpageheader name="runningInfo" style="">

        <div class="page_header" style=""><?php the_title(); ?>, <?php the_field("article_author"); ?> &nbsp; &nbsp; &nbsp; {PAGENO} / {nb}</div>

    </htmlpageheader>

    <div class="top_wrapper">

        <!-- TITLE -->
        <div class="title_wrapper <?php the_field("article_bg_color"); ?>">
            <h1>
                <?php if ( get_field("article_full_title") ) {
                    the_field("article_full_title");
                } else {
                    the_title();
                } ?>         
            </h1>
            <!-- AUTHOR -->
            <p class="author_name"><?php the_field("article_author"); ?></p>
        </div>

    </div><!-- END OF .TOP_WRAPPER -->
     
    <?php
    if ( have_rows("article_templates") ):
        while ( have_rows("article_templates") ) : the_row(); 
        ?>
                    
            <div class="template <?php echo get_row_layout() ?> <?php the_sub_field("article_template_serif"); ?>">
                <?php 
                $content = get_sub_field("content");
                $image_objects = array();
                // EXTRACT IMAGES AND SAVE TO $IMAGES ARRAY
                preg_match_all('/(<img [^>]*>)/', $content, $images);
                
                // LOOP THROUGH ARRAY
                for( $i=0; isset($images[1]) && $i < count($images[1]); $i++ ) {
                    // GET SRC 
                    $tag = $images[1][$i];
                    $doc = new DOMDocument();
                    $doc->loadHTML($tag);
                    $xpath = new DOMXPath($doc);
                    $src = $xpath->evaluate("string(//img/@src)");
                    // TEMP HACK IF ABSOLUTE PATHS
                    if ( strpos( $src, 'mindthedance.com/test' ) !== false ) {
                        $src = str_replace ( "http://mindthedance.com/test/", "http://localhost:8888/mind-the-dance/", $src );
                    }
                    // GET ATTACHMENT FROM ID
                    $img_id = mtd_get_image_id( $src );
                    $image_obj = wp_get_attachment_image_src( $img_id, "full" );
                    // GET FORMAT
                    if ( $image_obj[1] > $image_obj[2] ) {
                        // IF TEMPLATE 2
                        if ( get_row_layout() === "article_template_2" ) {
                            $class = "landscape_tmpl_2";
                        } else {
                            $class = "landscape";
                        }
                    } else {
                        if ( get_row_layout() === "article_template_2" ) {
                            $class = "portrait_tmpl_2";
                        } else {
                            $class = "portrait";
                        }
                    }
                    $new_tag = str_replace( 'class="', 'class="' . $class . ' ', $tag );
                    // PUSH TO ARRAY
                    $image_objects[] = $new_tag;
                }

                // REPLACE OLD TAGS WITH NEW ONES
                echo preg_replace_callback( '/(<img [^>]*>)/', function( $matches ) use ( &$image_objects ) {
                    return array_shift( $image_objects );
                }, $content );

                ?>
            </div>

        <?php 
        endwhile;
    endif;
    ?>

    </div><!-- END OF .ARTICLE_WRAPPER -->

    <pagebreak> 

    <!-- FOOTNOTES -->
    <?php if ( get_field("article_footnotes") ): 

        $notes_title = explode( "</h5>", get_field("article_footnotes") )[0] . "</h5>";
        $notes_list = "<ul>" . explode( "<ul>", get_field("article_footnotes") )[1];
            
        // ECHO TITLE
        echo $notes_title; ?>
        
        <columns column-count="2" vAlign="justify" column-gap="6" />
        
        <div class="article_footnotes" style="">
            
            <?php 
            // ECHO NOTES LIST
            echo $notes_list;
            ?>

        </div>

    <?php endif; ?>
