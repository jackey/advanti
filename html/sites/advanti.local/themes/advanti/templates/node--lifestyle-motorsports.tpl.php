<?php 
	$options = advanti_lifestyle_types();
	$statictis = statistics_get($node->nid);
?>
<a href="<?php print url("node/".$node->nid."/edit")?>">Edit</a>
<div class="news_hade motor_hade">
     	  <div class="motor_box">
          		<div class="news_top">
                      <h3 class="partner_title_h3 place_title_h3"></h3>
                  </div>
                  <div class="mot_con">
                    <div class="mot_left">
                        <h3 class="mot_title"><?php print $title;?></h3>
                        <div class="motor_list">
                        	<div class="amplification"></div>
                            <div class="motor_list_top">
                                <div class="motor_sports_left">
                                    <div class="motor_sports"><div class="motor_bf"><span><?php print $options[$node->field_motorsport_columns["und"][0]['value']]?></span></div></div>
                                    <span class="timer"><?php print date("Y/m/d", $node->field_date["und"][0]["value"])?></span>
                                </div>
                                <div class="motor_sports_right">
                                    <span class="click_span"><b></b><?php print $statictis["totalcount"]?></span>
                                    <a href="<?php print url("lifestyle")?>">Back TO<b></b></a>
                                </div>
                            </div>

                            <?php if ($node->field_motorsport_columns['und'][0]['value'] <> "Video" ): ?>
                                <ul class="motor_img">
                                	<?php foreach ($field_image as $index => $image): ?>
                                    	<li <?php if ($index == 0) print 'style="display:block"'?>><a href="javascript:;" class="fangda"></a><a href="javascript:;"><img src="<?php print file_create_url($image['uri'])?>"></a></li>
                                	<?php endforeach;?>
                                </ul>
                            <?php else:?>
                                <ul class="motor_img">
                                    <div class="video">
                                        <?php if(!empty($node->field_video_url)):?>
                                            <video id="example_video_1" class="video-js vjs-default-skin"  
                                              controls preload="auto" width="640" height="264"  
                                              poster="http://video-js.zencoder.com/oceans-clip.png"  
                                              data-setup='{"example_option":true}'>  
                                                 <source src="<?php print $node->field_video_url[LANGUAGE_NONE][0]['url']?>"/>
                                            </video>
                                        <?php endif;?>
                                    </div>
                                </ul>
                            <?php endif;?>

                            <?php if ($node->field_motorsport_columns['und'][0]['value'] <> "Video" ): ?>
                            <div class="motor_list_bot">
                                <div>
                                    <a href="javascript:;" class="prev_mo"></a>
                                    <span class="curr_page">
                                        <a class="curr_sum">01</a>/<a class="sum"><?php print count($node->field_image["und"])?></a>
                                    </span>
                                    <a href="javascript:;" class="next_mo"></a>
                                </div>
                            </div>
                            <?php endif; ?>
                            
                        </div>
                        <div class="mort_intro">
                        	<?php print drupal_render($elements["body"])?>
                        </div>
                    </div>
                 </div>
          </div>
         
         <div class="mot_right">
         	<ul>
            	<li class="navigation">
                	<h3>NAVIGATION</h3>
                </li>
                <li class="share">
                	<h3>SHARE TO FRAND</h3>
                    <div>
                    	<?php 
                            $links = helper_get_share_link($node, "medium");
                            foreach ($links as $link) {
                                print "<a class='".$link["#options"]["attributes"]["class"]."' href='".$link["#href"]."'><b></b>".$link['#title']."</a>";
                            }
                        ?>
                    </div>
                </li>
            </ul>
        	<?php $output = views_embed_view("content", "block_6");?>
        	<?php print $output;?>
         </div>
     </div>
