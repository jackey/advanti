<div class="box">

    <?php // For lifestyle node;
      $node = node_load(arg(1));
    ?>
    <?php if ($node && node_load(arg(1))->type == "lifestyle_motorsports"):?>
      <div class="shad_body"></div>
      <div class="show_img">
        <a href="javascript:;" id="show_prev"></a>
        <a href="javascript:;" id="show_next"></a>
        <a href="javascript:;" id="show_close"></a>
          <div class="show_img_list">
            <div class="show_img_con">
                <img>
              </div>
          </div>
          <div class="show_bg"></div>
      </div>
  <?php endif;?>



<div id='header' class="top_title"><div class='limiter clearfix'>
  <?php require_once path_to_theme().'/templates/header.tpl.php' ?>
  <?php print render($page['header']); ?>
</div></div>

<?php if ($page['help'] || ($show_messages && $messages)): ?>
  <div id='console'><div class='limiter clearfix'>
    <?php print render($page['help']); ?>
    <?php if ($show_messages && $messages): print $messages; endif; ?>
  </div></div>
<?php endif; ?>

<?php if ($page['highlighted']): ?>
  <div id='highlighted'><div class='limiter clearfix'>
    <?php print render($page['highlighted']); ?>
  </div></div>
<?php endif; ?>

<div id='page'><div class='limiter clearfix'>

  <div id='main-content' class='clearfix'>
    <div id='content' class='clearfix'>
        <?php global $user;?>
        <?php if (!(in_array("Media Visitor", $user->roles) || $user->uid == 1 || in_array("Partner Visitor", $user->roles) || in_array("admin", $user->roles))):?>
        <div class="news_hade">
            <div class="media_login_top">
                <h3 class="list_h3_font media_login_title"></h3>
            </div>
        </div>
        <div class="please_login_box">
           <div class="login_box">
              <?php $login_form = drupal_get_form("user_login");print drupal_render($login_form);?>
           </div>
        </div>
        <div style="height:269px;overflow:hidden;width:960px;margin:0 auto;"></div>
        <?php  else: ?>
          <?php print render($page['content']) ?>
          <div class="scroll_top parent_scroll"><a href="javascript:;" id="scroll_top"></a></div>
        <?php endif;?>

    </div>
  </div>

</div></div>

<div id="footer"><div class='limiter footer clearfix'>

  <?php print render($page['footer']) ?>
</div></div></div>
<script type="text/javascript">
  (function ($) {
    pull_down(true);
    $('#Map area').hover(function(){
      $('.area_box a')[$(this).index()].style.display="block";
    },function(){
      $('.area_box a')[$(this).index()].style.display="none";
    });
  })(jQuery);
</script>
