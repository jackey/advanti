<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php 
$results = $view->result;
?>
<dl>
	<dt><h3><?php print $title; ?></h3></dt>
	<?php foreach ($results as $id => $row): ?>
	    <dd>
	    	<div class="other_left"><?php print drupal_render($row->field_field_image[0]["rendered"]) ?></div>
	        <div class="other_right">
	        	<span class=""><?php print date("Y.m.d", $row->node_created) ?></span>
	            <p class=""><?php print $row->node_title?></p>
	        </div>
	    </dd>
	<?php endforeach; ?>
</dl>