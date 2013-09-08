<?php 
$years = helper_get_list_year_in_media();

$crt_year = arg(1) ? arg(1) : "YEAR";

$medias= helper_get_media_in_year($crt_year);
?>

<!--newslist start-->
 <div class="news_hade">
    <div class="news_top">
          <h3 class="news_title_h3"></h3>
          <div class="news_title_right">
              <div class="all"><a href="<?php print url("media")?>">ALL</a></div>
                <div class="year" id="xiala">
                  <a href="javascript:;" id="yeartext"><?php print strtoupper($crt_year)?></a><b></b>
                    <select id="par_class">
                            <option value="all" selected="<?php if ($crt_year == "all") print "all"?>">YEAR</option>
                            <?php foreach ($years as $year):?>
                                <option value="<?php print $year?>" selected="<?php if ($crt_year == $year) print "selected"?>" ><?php print $year?></option>
                            <?php endforeach;?>
                        </select>
                        <ul class="options_list">
                          <li><a href="<?php print url("media")?>">YEAR</a></li>
                            <?php foreach ($years as $year):?>
                                <li><a href="<?php print url("media/". $year)?>"><?php print $year?></a></li>
                            <?php endforeach;?>
                        </ul>
                </div>
          </div>
      </div>
 </div>
             
 <div class="news_list">
    <ul>
        <?php foreach ($medias as $media):?>
        <li>
          <div class="news_title">
              <span class="news_timer"><?php print date("Y/m/d", $media->field_date[LANGUAGE_NONE][0]['value'])?></span>
                <h3 class="news_theme"><?php print $media->title?></h3>
            </div>
            <div class="news_intro">
              <?php print $media->body[LANGUAGE_NONE][0]['value']?>
            </div>
            <div class="news_down">
              <div class="news_down_left">
                  <span><b></b><?php print helper_get_download_count($media->field_file[LANGUAGE_NONE][0]['fid'], $media)?></span>
                </div>
                <div class="news_down_right">
                  <a target="_blank"  href="<?php print file_create_url($media->field_file[LANGUAGE_NONE][0]['uri']) ?>">DOWNLOAD</a>
                </div>
            </div>
        </li>
        <?php endforeach;?>
    </ul>
 </div>
             
 <div class="page_box">
  <div class="page_con">
      <div class="page_left">
          <span>TOTAL : <?php print helper_get_total_media_in_year($crt_year);?></span>
        </div>
        <div class="page_right">
          <?php  
            print theme("pager");
          ?>
        </div>
    </div>
 </div>