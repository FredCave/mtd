

    <htmlpageheader name="runningInfo" style="">

        <?php /*<div class="page_header" style=""><?php the_title(); ?>, <?php the_field("article_author"); ?> &nbsp; &nbsp; &nbsp; {PAGENO} / {nb}</div> 
        <div class="page_header" style="">Mind the Dance &nbsp; &nbsp; &nbsp; {PAGENO} / {nb}</div>*/ ?>

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
            // IGNORE TEMPLATE 6: VIDEOS
            if ( get_row_layout() !== "article_template_6" ) : ?><div class="template <?php echo get_row_layout() ?> <?php the_sub_field("article_template_serif"); ?>"><?php 

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

                        // TEMP HACK IF ON LOCAL && ABSOLUTE PATHS
                        if ( strpos( get_bloginfo("url"), 'localhost' ) !== false && strpos( $src, 'mindthedance.com/test' ) !== false ) {
                            $src = str_replace ( "http://mindthedance.com/test/", "http://localhost:8888/mind-the-dance/", $src );
                        }
                        // GET ATTACHMENT FROM ID
                        $img_id = mtd_get_image_id( $src );
                        $image_obj = wp_get_attachment_image_src( $img_id, "full" );
                        // GET FORMAT
                        if ( $image_obj[2] - $image_obj[1] >= 0 && $image_obj[2] - $image_obj[1] < 20 ) {
                            // IF SQUARE
                            $class = "square";
                        } else if ( $image_obj[1] > $image_obj[2] ) {
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
                        // IF NOT DOWNLOAD LINK IMG : PUSH TO ARRAY
                        if ( strpos( $new_tag, "download_img" ) === false ) {
                            $image_objects[] = $new_tag;    
                        }

                    }

                    // REMOVE PDF DOWNLOAD LINKS
                    $content = preg_replace( '#<a class="download_link(.*?)</a>#', '', $content );

                    // ADD EM DASH TO CAPTIONS + QUOTES
                    $content = str_replace( 'caption">', 'caption">— ', $content );
                    $content = str_replace( 'caption_vertical">', 'caption_vertical">— ', $content );
                    $content = str_replace( 'class="after_wingdings">', 'class="after_wingdings">— ', $content );

                    // REPLACE OLD TAGS WITH NEW ONES
                    echo preg_replace_callback( '/(<img [^>]*>)/', function( $matches ) use ( &$image_objects ) {
                        return array_shift( $image_objects );
                    }, $content );

                    ?></div><?php 
            endif; // END OF TEMPLATE 6 CHECK

        endwhile;
    endif;
    ?>

    </div><!-- END OF .ARTICLE_WRAPPER -->

    <!-- FOOTNOTES -->
    <?php if ( get_field("article_footnotes") ):

        echo "<div class='article_footnotes_wrapper post-" . get_the_ID() . "'>";

        // GET ALL LIST TITLES
        $raw_titles = explode( "<h5>", get_field("article_footnotes") );
        $list_titles = [];
        foreach( $raw_titles as $list_title ) {
            $ttl = explode( "</h5>", $list_title )[0];
            if ( $ttl !== "" ) {
                array_push( $list_titles, $ttl );
            }
        }

    
        // GET ALL LIST CONTENTS
        $raw_lists = explode( "<ul>", get_field("article_footnotes") );
        $lists = array();
        foreach( $raw_lists as $list ) {
            $lst = explode( "</ul>", $list )[0];
            if ( $lst !== "" ) {
                array_push( $lists, $lst );
            }
        }

        // LOOP THROUGH LISTS
        $i = 0;
        while ( $i < count($list_titles) ) {
        
            // ECHO TITLE ?>
            <columns column-count="1" vAlign="" column-gap="0" />
            <?php echo "<h5 class='list-" . $i . "'>" . $list_titles[$i] . "</h5>"; ?>

            <?php 
            // ECHO NOTES LIST ( $i + 1 )
            if ( substr_count( $lists[$i+1], "<li>" ) === 1 ) {
                // IF ONLY ONE NOTE ?>
                <div class="article_footnotes one_column" style="">
                    <?php echo "<ul>" . $lists[$i+1] . "</ul>"; ?>
                </div>
            <?php } else { ?>
                <columns column-count="2" vAlign="" column-gap="6" />
                <div class="article_footnotes" style="">
                    <?php echo "<ul>" . $lists[$i+1] . "</ul>"; ?>
                </div>
            <?php } 

            $i++; 

        } ?>

        </div>
        
        <?php if ( $multiple_articles ) : ?>
            <columns column-count="1" vAlign="" column-gap="0" />
            <pagebreak>
        <?php endif; ?>
        
    <?php endif; ?>
