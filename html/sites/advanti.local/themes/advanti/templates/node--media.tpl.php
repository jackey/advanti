
<div class="news_title">
    <span class="news_timer"><?php print date("Y/m/d", $field_date["und"][0]["value"])?></span>
      <h3 class="news_theme"><?php print $title?></h3>
</div>
<div class="news_intro">
    <?php print $body[0]["value"];?>
</div>
<div class="news_down">
    <div class="news_down_left">
        <span><b></b>63</span>
      </div>
      <div class="news_down_right">
        <a href="<?php print file_create_url($field_file["und"][0]["uri"])?>"><?php print t("DOWNLOAD") ?></a>
      </div>
</div>