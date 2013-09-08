<?php

/**
 * @file
 * Default theme implementation to display a term.
 *
 * Available variables:
 * - $name: (deprecated) The unsanitized name of the term. Use $term_name
 *   instead.
 * - $content: An array of items for the content of the term (fields and
 *   description). Use render($content) to print them all, or print a subset
 *   such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $term_url: Direct URL of the current term.
 * - $term_name: Name of the current term.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the following:
 *   - taxonomy-term: The current template type, i.e., "theming hook".
 *   - vocabulary-[vocabulary-name]: The vocabulary to which the term belongs to.
 *     For example, if the term is a "Tag" it would result in "vocabulary-tag".
 *
 * Other variables:
 * - $term: Full term object. Contains data that may not be safe.
 * - $view_mode: View mode, e.g. 'full', 'teaser'...
 * - $page: Flag for the full page state.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the term. Increments each time it's output.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * @see template_preprocess()
 * @see template_preprocess_taxonomy_term()
 * @see template_process()
 *
 * @ingroup themeable
 */
?>
<?php 
   $countries = taxonomy_get_tree(taxonomy_vocabulary_machine_name_load("country")->vid, 0, 1);
?>
<div class="news_hade">
          <div class="news_top">
            <h3 class="global_title"></h3>
               <div class="news_title_right">
                    <div class="year" id="xiala">
                        <a href="javascript:;" id="yeartext"><?php print $term->name?></a><b></b>
                            <select id="par_class">
                                <?php foreach ($countries as $index => $country):?>
                                <option value="<?php print $index?>" selected="selected"><?php print $country->name?></option>
                                <?php endforeach;?>
                            </select>
                            <ul class="options_list">
                                <?php foreach ($countries as $index => $country): ?>
                                <li><a href="<?php print url("taxonomy/term/". $country->tid)?>"><?php print $country->name?></a></li>
                                <?php endforeach;?>
                            </ul>   
                    </div>
              </div>
          </div>
</div>

<?php 
	$countries = taxonomy_get_tree(taxonomy_vocabulary_machine_name_load("country")->vid, $term->tid, 1);
?>
 <div class="asia_box">
 	<a class="area_back" href="<?php print url("global-network")?>"></a>
 	<img src="/<?php print path_to_theme()?>/misc/images/global/<?php print strtolower($name)?>_area.jpg">
 	<?php foreach ($countries as $country) :?>
 	<?php $country = taxonomy_term_load($country->tid);?>
 	<?php if (@$country->field_is_yhi[LANGUAGE_NONE][0]['value'] == 1): ?>
	    <div class="hot <?php print strtolower(str_replace(" ", "_", $country->name));?>">
			<div class="prompt_two protab">
	        	<a href="javascript:;" class="close"></a>
	            <h3><?php print $country->name?></h3>
	            <h4><?php print $country->field_company[LANGUAGE_NONE][0]['safe_value']?></h4>
	            <p><?php print t("Address")?><?php print " ". $country->field_address[LANGUAGE_NONE][0]['safe_value'] ?></p>
	            <p><?php print t("Tel"). "  : "?><?php print $country->field_tel[LANGUAGE_NONE][0]["safe_value"]?></p>
	            <p><?php print t("Fax")?> : <?php print $country->field_fax[LANGUAGE_NONE][0]['safe_value']?></p>
	            <p><?php print t("E-mail")?> : <?php print $country->field_email[LANGUAGE_NONE][0]["safe_value"]?></p>
	        </div>
	    </div>
	<?php else: ?>
	    <div class="hot <?php print strtolower(str_replace(" ", "_", $country->name));?>">
			<div class="prompt protab">
		    	<a href="javascript:;" class="close"></a>
		        <h3><?php print $country->name?></h3>
		        <p><?php print @$country->field_company[LANGUAGE_NONE][0]['safe_value']?></p>
		    </div>
		</div>
	<?php endif;?>
	<?php endforeach;?>
    
 </div>