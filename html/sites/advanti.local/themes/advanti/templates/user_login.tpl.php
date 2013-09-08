<?php 
$form["name"]["#description"] = "";
$form["pass"]["#description"] = "";

$form["name"]["#title"] = "";
$form["pass"]["#title"] = ""; 

$form["name"]["#theme_wrappers"] = array();
$form["pass"]["#theme_wrappers"] = array();
?>

<ul>
	<li class="user_name"><span>USER NAME:</span>
		<?php print drupal_render($form["name"])?>
	</li>
	<li class="pass_word"><span>PASSWORD:</span>
		<?php print drupal_render($form["pass"])?>
	</li>
	<li class="log_in">
		<?php print drupal_render($form["actions"]["submit"])?>
	</li>
</ul>

<?php print drupal_render_children($form)?>