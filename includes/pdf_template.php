

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

            if ( get_row_layout() === "article_template_2" ) : ?>

                <columns column-count="1" vAlign="justify" column-gap="0" />
                    
                    <div class="template <?php echo get_row_layout() ?> <?php the_sub_field("article_template_serif"); ?>">
                        <?php the_sub_field("content"); ?>
                    </div>

                </columns>

            <?php else : ?>

                <columns column-count="2" vAlign="justify" column-gap="6" />
                    
                    <div class="template <?php echo get_row_layout() ?> <?php the_sub_field("article_template_serif"); ?>">
                        <?php the_sub_field("content"); ?>
                    </div>

                <!-- </columns> -->

              <!--   <columnbreak /> -->

               <!--  <div class="template_margin"></div> -->

            <?php endif;

        endwhile;
    endif;
    ?>

    </div><!-- END OF .ARTICLE_WRAPPER -->

    <columns column-count="1" column-gap="0" />

    <!-- FOOTNOTES -->
    <?php if ( get_field("article_footnotes") ): ?>
        <div class="article_footnotes" style="">
            <?php the_field("article_footnotes"); ?>
        </div><!-- END OF .TEMPLATE -->
    <?php endif; ?>

    </columns>


