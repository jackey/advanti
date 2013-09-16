<?php

/**
 * @file
 * Customize the display of a complete webform.
 *
 * This file may be renamed "webform-form-[nid].tpl.php" to target a specific
 * webform on your site. Or you can leave it "webform-form.tpl.php" to affect
 * all webforms on your site.
 *
 * Available variables:
 * - $form: The complete form array.
 * - $nid: The node ID of the Webform.
 *
 * The $form array contains two main pieces:
 * - $form['submitted']: The main content of the user-created form.
 * - $form['details']: Internal information stored by Webform.
 */
?>
<div class="news_hade">
     	  <div class="news_top">
          	  <h3 class="contact_title"></h3>
              <div class="news_title_right">
                    <div class="year" id="xiala">
                    	<a href="javascript:;" id="yeartext">COUNTRY</a><b></b>
                    		<select id="par_class">
                                <option value="0" selected="selected">COUNTRY</option>
                            </select>
                            <ul class="options_list" style="display: none;">
                            	<li><a href="javascript:;">COUNTRY</a></li>
                            </ul>	
                    </div>
              </div>
          </div>
</div>
<div class="contact_con">  
	<div class="con_con_l">
		<div class="yourname">
			<?php print drupal_render($form["submitted"]["your_name"]);?>
		</div>
		<div class="email">
			<?php print drupal_render($form["submitted"]["email"])?>
		</div>
		<div class="subject">
			<?php print drupal_render($form["submitted"]["message_subject"])?>
		</div>
	</div>

	<div class="con_con_r">
		<div class="message">
			<?php print drupal_render($form["submitted"]["enter_your_message"])?>
	    </div>
	    <div class="checkbox"><input type="checkbox" name="email_me"><div style="display:inline" class="inline-text">E-mail a copy of this message to your own address.</div></div>
	</div>
	<div class="con_con_b clearfix">
		<?php 
			$form["actions"]["submit"]["#attributes"]["class"] = array("send");
			$form["actions"]["submit"]["#value"] = t("SEND");
		?>
		<?php print drupal_render($form["actions"])?>
		<div class="form-actions form-wrapper" id="edit-actions">
			<input type="button" class="cancel" value="CANCEL">
		</div>
	</div>
</div>
<?php
  // Always print out the entire $form. This renders the remaining pieces of the
  // form that haven't yet been rendered above.
  print drupal_render_children($form);

?>
<div style="height:269px;overflow:hidden;width:960px;margin:0 auto;"></div>