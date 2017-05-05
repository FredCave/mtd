<?php 
if( have_rows('article_templates') ):

    while ( have_rows('article_templates') ) : the_row(); ?>

			<div class="<?php mtd_template_style( get_row_layout() ); ?>">

				<?php the_sub_field('content'); ?>

			</div>

	<?php
    endwhile;

endif;
?>