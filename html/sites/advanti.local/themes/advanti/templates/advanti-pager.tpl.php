<?php 
    $next = null;
    $pre = null;
    $crt = null;
    $last = null;
    $first = null;
    foreach ($items as $key => $item) {
        if ($item["class"][0] == "pager-next") {
            $next = $item;
            unset($items[$key]);
        }
        elseif ($item['class'][0] == "pager-previous") {
            $pre = $item;
            unset($items[$key]);
        }
        elseif ($item['class'][0] == "pager-current") {
            $crt = $item;
            unset($items[$key]);
        }
        elseif ($item['class'][0] == "pager-first") {
            $first = $item;
            unset($items[$key]);
        }
        elseif ($item['class'][0] == "pager-last") {
            $last = $item;
            unset($items[$key]);
        }
    }
?>
<div class="paging_1">
    <a href="<?php if ($pre) {print url($pre['data']["href"], array('query' => $pre['data']['query']));} else {print "javascript:;";}?>" class="page_next"><b></b>PREVIOUS</a>
	<a href="<?php if ($next) {print url($next['data']["href"], array('query' => $next['data']['query']));} else {print "javascript:;";}?>" class="page_prev"><b></b>NEXT</a>
</div>
<div class="fenge">|</div>
<div class="paging_2">
    <a href="javascript:;" class="page_prev2"></a>
	<ol>
        <?php foreach ($items as $item): ?>
            <li><a href="<?php print  url($item["data"]["href"], array("query" => $item["data"]["query"]))?>"><?php print $item["data"]['title']?></a></li>
        <?php endforeach;?>
    </ol>
    <a href="javascript:;" class="page_next2"></a>
</div>