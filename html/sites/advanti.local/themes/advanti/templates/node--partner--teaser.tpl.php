<img src="<?php print image_style_url("313_148", $field_image['und'][0]['uri'])?>">
<div class="intro_down">
	<div class="list_intro">
        <span><?php print date("Y/m/d", $field_date['und'][0]["value"])?></span>
        <p><?php print $title?></p>
    </div>
    <div class="partner_down">
    	<a target="_blank" href="<?php print file_create_url($node->field_file[LANGUAGE_NONE][0]['uri'])?>" class="p_down_link">DWONLOAD<i class="more_bg"></i></a>
        <a target="_blank" href="<?php print file_create_url($node->field_file[LANGUAGE_NONE][0]['uri'])?>" class="p_down"><?php print format_size($node->field_file[LANGUAGE_NONE][0]['filesize'])?></a>
    </div>
</div>