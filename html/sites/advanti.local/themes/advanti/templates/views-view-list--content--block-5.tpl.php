<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $options['type'] will either be ul or ol.
 * @ingroup views_templates
 */
?>

<div class="fil_gallery other_box">
	<div class="gallery_box">
	<div class="other_title"><h3 class="list_h3_font other_h3"></h3></div>
		<ul class="other_box_list">
		    <?php foreach ($view->result as $id => $row): ?>
		    <li>
				<a href="<?php print url("node/".$row->nid)?>">
					<h3 class="list_h3_font mk512"></h3>
					<?php print render($row->field_field_thumbnail[0]["rendered"])?>
					<span class="list_yiny"></span>
				</a>
			</li>
		    <?php endforeach; ?>
		</ul>
	</div>
</div>