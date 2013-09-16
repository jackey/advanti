<?php 
    $menus = menu_tree_page_data("main-menu");
    function get_hash_tag_from_menu_link($link) {
        if (@$link["options"]["attributes"]["style"] && @$link["options"]["attributes"]["style"][0] == "#") {
            return str_replace('#', '', @$link["options"]["attributes"]["style"]);
        }
    }

    function active_is_on_parent($parent_menu_link) {
        $children = $parent_menu_link["below"];
        $link = $parent_menu_link["link"];
        if ($link["link_path"] == $_GET["q"]) return TRUE;
        foreach ($children as $child) {
            if ($_GET['q'] == $child["link"]["link_path"]) {
                return TRUE;
            }
        }
        return FALSE;
    }
?>
<div class="title_con">
<div class="title_list">
	<ul>
        <li class="title_item">
            <a href="<?php print url("partner", array("query" => array("distination" => "partner"))) ?>"><?php print t("Partner Page")?></a>
        </li>
        <li class="title_item2"><a href="javascript:;"></a></li>
        <li class="title_item3"><a href="javascript:;"></a></li>
        <li class="title_item4"><a href="javascript:;"></a></li>
    </ul>
</div>

<div class="login_nav">
    <div class="login">
         <a href="<?php print url("<front>")?>"><img src="/<?php print path_to_theme() ?>/misc/images/index/login.jpg"></a>
    </div>
    <div class="nav_box">
    	<ul>
            <?php foreach ($menus as $level1_menu_link):?>
                <?php 
                    $link = $level1_menu_link["link"];
                    $children = $level1_menu_link["below"];
                ?>
                <li>
                    <a href="<?php print url($link["link_path"])?>" class="<?php if (active_is_on_parent($level1_menu_link)) print "currenta"?>"><?php print $link["link_title"]?></a>
                    <?php if (active_is_on_parent($level1_menu_link)):?><b class="current"></b><?php endif;?>
                    <ul class="nav_box_list" style="display: none;">
                    <?php foreach ($children as $level2_menu_link):?>
                            <li><img src="/<?php print path_to_theme()?>/misc/images/index/travel_06_03.png">
                                <a class="<?php print implode(',', $level2_menu_link["link"]["options"]["attributes"]["class"])?>" id="<?php print @$level2_menu_link["link"]["options"]["attributes"]["id"]?>" href="<?php print url($level2_menu_link["link"]["link_path"], array("fragment" => get_hash_tag_from_menu_link($level2_menu_link["link"])))?>"><?php print $level2_menu_link["link"]["link_title"]?></a>
                            </li>
                    <?php endforeach;?>
                    </ul>
                </li>
            <?php endforeach;?>
        </ul>
    </div>
  </div>
</div>
<div class="nav_list_bg" style="display: none;"></div>