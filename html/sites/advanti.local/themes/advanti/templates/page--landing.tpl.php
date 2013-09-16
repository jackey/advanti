<?php 
    $new_regions = helper_load_all_landing_country_with_group();
    $images = helper_load_all_landing_images();
?>

<?php if ($page['help'] || ($show_messages && $messages)): ?>
  <div id='console'><div class='limiter clearfix'>
    <?php print render($page['help']); ?>
    <?php if ($show_messages && $messages): print $messages; endif; ?>
  </div></div>
<?php endif; ?>

<div class="landing">
	<div class="landing_logo"><img src="/<?php print path_to_theme()?>/misc/images/landing_logo.png" width="173" height="69" /></div>
    <div class="landing_menu">
    	<ul>
        	<li>INTERNATIONAL</li>
            <?php foreach ($new_regions as $name => $region):?>
            <li><?php print strtoupper($name)?><br /><br />
                <?php foreach ($region as $country):?>
                    <a href="<?php print helper_url($country->field_url[LANGUAGE_NONE][0]['url'])?>"><?php print $country->title?></a>
                <?php endforeach;?>
            </li>
            <?php endforeach;?>
        </ul>
        <!--<span>INTERNATIONAL</span>
        <span>ASIA<br /><br /><a href="#">CHINA</a><br /><a href="#">HONG KONG</a><br /><a href="#">INDONESIA</a><br /><a href="#">JAPAN</a><br /><a href="#">MALAYSIA</a><br /><a href="#">TAIWAN</a><br /><a href="#">THAILAND</a></span>-->
    </div>
    <DIV  style="clear:both;"></DIV>
</div>

<ul id="landing-bg">
    <?php foreach ($images as $image): ?>
    <li style="display:none" src="<?php print $image?>"></li>
    <?php endforeach;?>
</ul>

<style>
* { margin:0px; padding:0px;}
body{background-repeat:no-repeat; background-position: center top; background-color:#000; font-family:arial; font-size:12px;}
ul,li{margin:0px; padding:0; list-style-type:none;}
a:focus, input[type=button] ,input[type=submit] {outline:none;}
.landing{ color:#fff; text-align:center; background:url(/<?php print path_to_theme()?>/misc/images/landing_bg.png); margin-top:334px; behavior: url("/<?php print path_to_theme()?>/misc/iepngfix.htc"); margin-bottom:40px; }
.landing_logo{ padding-top:44px; height:123px; behavior: url("iepngfix.htc") }
.landing_menu{ text-align:center; width:780px; margin:0 auto;}
.landing_menu ul li{width:130px; float:left; text-align:left;}
.landing_menu ul li a{ color:#999; text-decoration:none; width:130px; height:25px; line-height:25px; display:block;}
.landing_menu ul li a:hover{ color:#1767c0;}
#skip-link {display: none}
#admin-menu {display: none}
</style>
<script type="text/javascript">
(function ($) {
    $(function () {
        var bg = []; //设定图片数量，如果图片数为3，这个参数就设为2，依次类推
        $("#landing-bg li").each(function () {
            bg.push($(this).attr("src"));
        });
        index = Math.floor(Math.random() * bg.length);
        //dcument.write("<BODY BACKGROUND="+bg[index]+">");
        $('body').attr("background", bg[index]);
    });
})(jQuery);
</script>