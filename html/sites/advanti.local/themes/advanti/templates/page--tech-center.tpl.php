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
<div class="tech_banner">
        <div class="tech_b_con">
            <h3 class="tech_title"></h3>
            <h4></h4>
            <p>Every single piece of Advanti Racing wheel is a masterpiece. Our unique designs are result of strong collaboration between our dedicated engineers and product development team. With years of aftermarket experience,our team's continuous innovation will take the aftermarket customization to the next level. </p>
            <br>
            <p>Integrating innovation and technology, Advanti Racing adopts modern computerised analysis and design systems to improve production standards. Using CAE (Computer Aided Engineering), our engineers can simulate the physical response of the wheel simply on the basis of its geometric model. With the FEA (Finite Element Analysis) our engineer can optimise the geometric shape and the choice of material, to identify the product's critical factors by a virtual simulation of a physical or mechanical problem.</p>
            <br>
            <p>All Advanti Racing wheels undergo rigorous testings according to each market safety standards. Our manufacturing plants have internal testing facilities, fully equipped with the equipment for assessment certified by TUV  and JWL VIA Institutes.</p>
            <p><img src="<?php print path_to_theme()?>/misc/images/tech/Techsdf Center_r2_c2.png"></p>
        </div>
        </div>

        <div class="tech_con">
        <div class="tech_forged">
            <h3 class="tech_title forged_title"></h3>
            <div class="tech_for_in">
                <p>Rim Rotary Forged (RRF)  is Advanti's latest proprietary technolog to hit the aftermarket industry. Utilising Flow Form technology to apply pressure on the inner wheel after casting, stretching and forming the material, this causes the aluminium to flow imparting tensile strength similar to forged wheels. The result is greater strength and shock resistance over conventional cast wheels, which will ultimately improve vehicle performance too.</p>
                <p class="irm_img"><img src="<?php print path_to_theme()?>/misc/images/tech/irm_img.jpg"></p>
            </div>
        </div>

        <div class="tech_icon">
            <h3 class="tech_title icon_title"></h3>
            <ul>
                <li>
                    <div class="icon_list_bg">
                        <img src="<?php print path_to_theme()?>/misc/images/tech/tech_icon_img1.png">
                    </div>
                    <p>Step up and be the envy of the road. More design options for the enthusiast who does not fear to be different from conventional </p>
                </li>
                
                <li>
                    <div class="icon_list_bg">
                        <img src="<?php print path_to_theme()?>/misc/images/tech/tech_icon_img2.png">
                    </div>
                    <p>Why settle for second best? Pamper your car with individualism and expression. Assembled by hand to achieve that customization that you desire. 3 pieces of handcrafted precision coming together to form a masterpiece  </p>
                </li>
                
                <li>
                    <div class="icon_list_bg">
                        <img src="<?php print path_to_theme()?>/misc/images/tech/tech_icon_img3.png">
                    </div>
                    <p>Achieving near perfect standards using tilted gravity casting systems, combined with flow forming technology, it is truly MAT (Most advanced Technology). </p>
                </li>
                
                <li>
                    <div class="icon_list_bg">
                        <img src="<?php print path_to_theme()?>/misc/images/tech/tech_icon_img4.png">
                    </div>
                    <p>Brighten up with a classy glow, titanium mirror finishes are used only on wheels of the highest quality and finishing. Be a cut above the rest.</p>
                </li>
                
                <li>
                    <div class="icon_list_bg">
                        <img src="<?php print path_to_theme()?>/misc/images/tech/tech_icon_img5.png">
                    </div>
                    <p>Achieve more then what you actually have, undercut technology allows wheels to have an illusion of a bigger surface area.</p>
                </li>
                
                <li>
                    <div class="icon_list_bg">
                        <img src="<?php print path_to_theme()?>/misc/images/tech/tech_icon_img6.png">
                    </div>
                    <p>Details counts in fashion, small differences do wonders in today's world. Why settle for boring and traditional ways.  </p>
                </li>
                
                <li>
                    <div class="icon_list_bg">
                        <img src="<?php print path_to_theme()?>/misc/images/tech/tech_icon_img7.png">
                    </div>
                    <p>Stay in style with the latest concave designs, how deep can you go? </p>
                </li>
                
                <li>
                    <div class="icon_list_bg">
                        <img src="<?php print path_to_theme()?>/misc/images/tech/tech_icon_img8.png">
                    </div>
                    <p>Utilizing prevailing casting techniques together with flow forming technology, achieve that perfect balance of style and performance. </p>
                </li>
            </ul>
        </div>
        </div>
        <?php print render($page['content']) ?>
        <div class="scroll_top"><a href="javascript:;" id="scroll_top" style="display: inline;"></a></div>
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

    $(function() {
        $('#gallery').click(function(){
            maoScrollTo('fil_gallery');
        });
        $('#wallpaper').click(function(){
            maoScrollTo('wallpaper');
        });
        $('#technique').click(function(){
            maoScrollTo('tech_icon');
        });
        $('#capabllity').click(function(){
            maoScrollTo('tech_banner');
        });
        $('#rim_rotary').click(function(){
            maoScrollTo('tech_con');
        });
        maoScrollTo();
    });
  })(jQuery);
</script>




