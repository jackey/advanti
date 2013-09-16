<?php 
$first_image = NULL;
foreach ($field_image_media as $image_media) {
  if ($image_media) break;
  $image_media = field_collection_item_load($image_media["value"]);
  $first_image = $image_media;
}
?>

<div class="action">
  <ul>
    <li><a href="<?php print url("node/".$nid."/edit")?>">Edit</a></li>
  </ul>
</div>

<div class="news_hade">
     	  <div class="news_top">
          	  <h3 class="partner_title_h3 products_title_h3"></h3>
              <div class="news_title_right">
                  <div class="year products_fanhui">
                    	<a href="<?php print url("products")?>">BACK TO LISTS</a>
                        <b class="products_de"></b>
                  </div>
              </div>
          </div>
     </div>

 <div class="product_intro">
 	<div class="product_intro_left">
    	<div class="product_intro_img">
       		 <div class="mapk_sha"></div>
        	 <img src="<?php print file_create_url($first_image->field_image['und'][0]['uri'])?>">
        </div>
        <div class="big_img" style="display: none;"><img src="<?php print file_create_url($first_image->field_image['und'][0]['uri'])?>"></div>
   </div>
    
    <div class="product_intro_right">
        <h3><?php print $title?></h3>
        <dl>
        	<dt>SIZE :</dt>
            <dd>
            	<?php foreach ($field_size as $size):?>
            	<a href="javascript:;"><?php print $size["value"]?></a>
            	<?php endforeach;?>
            </dd>
        </dl>
        <dl>
        	<dt>COLOR :</dt>
            <dd>
            	<a href="javascript:;"><?php print $field_colour["0"]["value"] ?></a>
            </dd>
        </dl>
        
        <div class="pshow_list_box">
        	<a href="javascript:;" class="pshow_list_prev "></a>
        	<a href="javascript:;" class="pshow_list_next"></a>
        	<div class="pshow_list">
            	<ul> 
            		<?php foreach ($field_image_media as $image_media):?>
            			<?php $image_media = field_collection_item_load($image_media["value"]);?>
                		<li><a href="javascript:;"><img src="<?php print file_create_url($image_media->field_image['und'][0]['uri'])?>"></a></li>
                	<?php endforeach;?>
                </ul>
            </div>
        </div>
        <ul class="pshow_list_bot">
          <?php if (!empty($node->field_advanti_technology)):?>
            <?php foreach ($node->field_advanti_technology[LANGUAGE_NONE] as  $item): ?>
              <li><img src="<?php print file_create_url($item['uri'])?>"></li>
            <?php endforeach;?>
          <?php endif;?>
        </ul>
        
        <div class="pshou_page">
        	<a href="<?php $next_node =  helper_get_next_product_in_type($node->nid); if ($next_node) {print url("node/".$next_node->nid);} else {print "javascript:;";}?>" class="pshou_page_next"><b></b>NEXT</a>
          <?php $pre = helper_get_pre_product_in_type($node->nid);?>
        	<a href="<?php if ($pre) {print url("node/". $pre->nid);} else { print "javascript:;";}?>" class="pshou_page_prev"><b></b>PREVIOUS</a>
        </div>
        
    </div>
    
 </div>