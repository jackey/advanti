<?php

$GLOBALS['product_series'] = array(
	"1" => "Advanti racing",
	"2" => "Storm Series",
	"3" => "Storm RRF Series",
	"4" => "Euro Series",
	"5" => "Advanti By Advanti Racing"
);
$GLOBALS["lifestyle_columns"] = array(
	"Motorsports" => t("Motorsports"),
	"Activity" => t("Activity"),
	"Video" => t("Video"),
	"Merchandising" => t("Merchandising"),
);
$GLOBALS["global_regions"] = array(
	'32' => strtolower("ANTARCTICA"),
	"30" => strtolower("OCEANIA"),
	"28" => strtolower("NORTH AMERICA"),
	"25" => strtolower("AFRICA"),
	"15"  => strtolower("ASIA"),
	"14" => strtolower("EUROPE")
);

$GLOBALS["partner_columns"] = array(
	"Standard logo and guid" => "Standard logo and guid",
	"Product" => "Product",
	"Image bank" => "Image bank"
);

function getProductSeriesWithId($id) {
	global $product_series;
	return $product_series[$id];
}

function getProductSeriesWithName($name) {
	global $product_series;
	foreach ($product_series as $id => $n) {
		if ($n == $name) {
			return $id;
		}
	}
}

/**
 * Implements hook_preprocess_node().
 */
function advanti_preprocess_node(&$vars) {
	// TODO:
	if ($vars["type"] == "webform") {
		//TODO:
	}
	$vars["statistics"] = statistics_get($vars["node"]->nid);
	if ($vars["view_mode"] == "teaser") {
		$vars["theme_hook_suggestions"][] = "node__".$vars["type"]. "__teaser";
	}
}

/**
 * Implements hook_theme()
 */
function advanti_theme() {
	return array(
		"lifestylepager" => array(
			'template' => "life-style-pager",
			'path' => drupal_get_path('theme', 'advanti').'/templates'
		),
		"user_login" => array(
			"render element" => "form",
      		"path" => drupal_get_path('theme', 'advanti').'/templates',
      		'template' => 'user_login',
		),
	);
}

/**
 * Implemenet hook_preprocess_taxonomy_term()
 */
function advanti_preprocess_taxonomy_term(&$vars) {
	//dpm($vars);
}

/**
 * Implements hook_process_page().
 */
function advanti_process_page(&$vars) {
	$vars["page"]["content"]["system_main"]["#weight"] = -1000;
}

// Helper function to load all home banner
function advanti_banner() {
	$query = new EntityFieldQuery();
	$result = $query->entityCondition("entity_type", "node")
		->entityCondition("bundle", "home_banner")
		->propertyCondition("status", 1)
		->fieldOrderBy("field_order_input", "value", "ASC")
		->execute();
	return @array_values(node_load_multiple(array_keys($result["node"])));
}

function advanti_milestone($type = "limit") {
	$types = array("limit" => "YHI International Limited", "group" => "YHI Manufacturing Group");
	$query = new EntityFieldQuery();
	$result = $query->entityCondition("entity_type", "node")
		->entityCondition("bundle", "group_milesones")
		->propertyCondition("status", 1)
		->fieldOrderBy("field_date", "value", "DESC")
		->fieldCondition("field_milestone_company", 'value', $types[$type])
		->execute();
	return @array_values(node_load_multiple(array_keys($result["node"])));
}

/**
 * Helper function to load all products.
 */
function advanti_products($series, $limit = 10) {
	$query = new EntityFieldQuery();
	$result = $query->entityCondition("entity_type", "node")
		->entityCondition("bundle", "products")
		->propertyCondition("status", 1)
		->fieldCondition("field_series", "value", getProductSeriesWithName($series))
		->fieldOrderBy("field_order_input", "value", "ASC")
		->range(0, $limit)
		->execute();
	return @array_values(node_load_multiple(array_keys($result["node"])));
}

function advanti_get_region_by_name($name) {
	global $global_regions;
	$names = $global_regions;
	$tid = '';
	foreach ($names as $id => $n) {
		if (strtolower($name) == $n) {
			$tid = $id;
			break;
		}
	}
	if ($tid) return taxonomy_term_load($tid);
}

function advanti_get_country_by_name($name) {
	static $_names;
	if ($_names[strtolower($name)]) return $_names[$name];
	$countries = taxonomy_get_tree(taxonomy_vocabulary_machine_name_load("country")->vid, 0, 2);
	foreach ($countries as $country) {
		if (strtolower($country->name) == strtolower($name)) {
			$term = taxonomy_term_load($country->tid); 
			$_names[strtolower($name)] = $term;
			return $term;
		}
	}
}

function advanti_get_lifestyle_gallery_with_country($country_id) {
	$query = new EntityFieldQuery();
	$ret = $query->entityCondition("entity_type", "node")
		->entityCondition("bundle", "lifestyle_gallery")
		->propertyCondition("status", 1)
		->fieldCondition("field_country", "target_id", $country_id)
		->execute();
	if (!empty($ret["node"])) {
		return node_load_multiple(array_keys($ret["node"]));
	}
	return array();
}

function advanti_lifestyle_types() {
	return array(
	  "Motorsports" => t("MOTOR SPORTS"),
	  "Activity" => t("Activity"),
	  "Video" => t("Video"),
	  "Merchandising" => t("Merchandising")
	);
}

function helper_function_group_lifestyle_gallery() {
    $countries = taxonomy_get_tree(taxonomy_vocabulary_machine_name_load("country")->vid, 0, 2);
    $group_items = array();
    foreach ($countries as $country) {
    	$is_top = $country->parents[0] == 0 ? TRUE : FALSE;
    	if(!$is_top) {
    		$items = advanti_get_lifestyle_gallery_with_country($country->tid);
    		if ($items) {
    			$group_items[$country->tid] = $items;
    		}
    	}
    }
    foreach ($group_items as $country_id => $nodes) {
    	$images = array();
    	foreach ($nodes as $node) {
    		foreach ($node->field_image[LANGUAGE_NONE] as &$image){
    			$image['node'] = $node;
    		}
    		$images = array_merge($images, $node->field_image[LANGUAGE_NONE]);
    	}
    	$group_items[$country_id] = array_chunk($images, 4);
    }
    return $group_items;
}

function helper_get_all_countries() {
    $countries = taxonomy_get_tree(taxonomy_vocabulary_machine_name_load("country")->vid, 0, 2);
    $ret_countries = array();
    foreach ($countries as $country) {
    	$is_top = $country->parents[0] == 0 ? TRUE : FALSE;
    	if(!$is_top) {
    		$ret_countries[] = $country;
    	}
    }

    return $ret_countries;
}

function help_wallpaper_list() {
	$query = new EntityFieldQuery();
	$ret = $query->entityCondition("entity_type", "node")
		->entityCondition("bundle", "lifestyle_wallpaper")
		->propertyCondition("status", 1)
		->fieldOrderBy("field_order_input", "value", "ASC")
		->execute();
	$nodes = node_load_multiple(array_keys($ret["node"]));
	return array_chunk($nodes, 6);
}

function helper_get_list_year_in_media() {
	$query = new EntityFieldQuery();
	$ret = $query->entityCondition("entity_type", "node")
		->entityCondition("bundle", "media")
		->propertyCondition("status", 1)
		->execute();
	$nodes = node_load_multiple(array_keys($ret["node"]));
	$years = array();
	foreach($nodes as $node) {
		$date = date("Y", $node->field_date[LANGUAGE_NONE][0]['value']);
		$years[$date] = $date;
	}
	rsort($years);
	return $years;
}

function helper_get_media_in_year($year = "YEAR") {
	$limit = 5;
	$query = new EntityFieldQuery();
	$query->entityCondition("entity_type", "node")
		->entityCondition("bundle", "media");
	if ($year != "YEAR" && is_numeric($year)) {
		$from_date = strtotime($year. "/01/01");
		$to_date = strtotime($year."/12/31");
		$query->fieldCondition("field_date", "value", $from_date, ">=")
			->fieldCondition("field_date", "value", $to_date, "<=");
	}
	$ret = $query->propertyCondition("status", 1)
		->pager($limit)
		->execute();
	if (count($ret['node'])) {
		$nodes = node_load_multiple(array_keys($ret["node"]));
		return $nodes;
	}
	return FALSE;
}

function helper_get_total_media_in_year($year = "YEAR"){
	$query = new EntityFieldQuery();
	$query->entityCondition("entity_type", "node")->entityCondition("bundle", "media");
	if ($year != "YEAR" && is_numeric($year)) {
		$from_date = strtotime($year. "/01/01");
		$to_date = strtotime($year."/12/31");
		$query->fieldCondition("field_date", "value", $from_date, ">=")->fieldCondition("field_date", "value", $to_date, "<=");
	}
	return $query->propertyCondition("status", 1)->count()->execute();
}

function advanti_pager($variables) {
  $tags = $variables['tags'];
  $element = $variables['element'];
  $parameters = $variables['parameters'];
  $quantity = $variables['quantity'];
  global $pager_page_array, $pager_total;

  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // first is the first page listed by this pager piece (re quantity)
  $pager_first = $pager_current - $pager_middle + 1;
  // last is the last page listed by this pager piece (re quantity)
  $pager_last = $pager_current + $quantity - $pager_middle;
  // max is the maximum page number
  $pager_max = $pager_total[$element];
  // End of marker calculations.

  // Prepare for generation loop.
  $i = $pager_first;
  if ($pager_last > $pager_max) {
    // Adjust "center" if at end of query.
    $i = $i + ($pager_max - $pager_last);
    $pager_last = $pager_max;
  }
  if ($i <= 0) {
    // Adjust "center" if at start of query.
    $pager_last = $pager_last + (1 - $i);
    $i = 1;
  }
  // End of generation loop preparation.

  $li_first = theme('pager_first', array('text' => (isset($tags[0]) ? $tags[0] : t('« first')), 'element' => $element, 'parameters' => $parameters));
  $li_previous = theme('pager_previous', array('text' => (isset($tags[1]) ? $tags[1] : t('‹ previous')), 'element' => $element, 'interval' => 1, 'parameters' => $parameters));
  $li_next = theme('pager_next', array('text' => (isset($tags[3]) ? $tags[3] : t('next ›')), 'element' => $element, 'interval' => 1, 'parameters' => $parameters));
  $li_last = theme('pager_last', array('text' => (isset($tags[4]) ? $tags[4] : t('last »')), 'element' => $element, 'parameters' => $parameters));

  if ($pager_total[$element] > 1) {
    if ($li_first) {
      $items[] = array(
        'class' => array('pager-first'),
        'data' => $li_first,
      );
    }
    if ($li_previous) {
      $items[] = array(
        'class' => array('pager-previous'),
        'data' => $li_previous,
      );
    }

    // When there is more than one page, create the pager list.
    if ($i != $pager_max) {
      if ($i > 1) {
        $items[] = array(
          'class' => array('pager-ellipsis'),
          'data' => '…',
        );
      }
      // Now generate the actual pager piece.
      for (; $i <= $pager_last && $i <= $pager_max; $i++) {
        if ($i < $pager_current) {
          $items[] = array(
            'class' => array('pager-item'),
            'data' => theme('pager_previous', array('text' => $i, 'element' => $element, 'interval' => ($pager_current - $i), 'parameters' => $parameters)),
          );
        }
        if ($i == $pager_current) {
          $items[] = array(
            'class' => array('pager-current'),
            'data' => $i,
          );
        }
        if ($i > $pager_current) {
          $items[] = array(
            'class' => array('pager-item'),
            'data' => theme('pager_next', array('text' => $i, 'element' => $element, 'interval' => ($i - $pager_current), 'parameters' => $parameters)),
          );
        }
      }
      if ($i < $pager_max) {
        $items[] = array(
          'class' => array('pager-ellipsis'),
          'data' => '…',
        );
      }
    }
    // End generation.
    if ($li_next) {
      $items[] = array(
        'class' => array('pager-next'),
        'data' => $li_next,
      );
    }
    if ($li_last) {
      $items[] = array(
        'class' => array('pager-last'),
        'data' => $li_last,
      );
    }
    
    ob_start();
    require_once DRUPAL_ROOT."/". drupal_get_path("theme", "advanti")."/templates/advanti-pager.tpl.php";
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
 }
}

function helper_get_next_product_in_type($crt_nid) {
	$node = node_load($crt_nid);
	if ($node) {
		$query = new EntityFieldQuery();
		$ret = $query->entityCondition("entity_type", "node")
			->entityCondition("bundle", $node->type)
			->propertyCondition("status", 1)
			->propertyCondition("nid", $crt_nid, ">")
			->range(0, 1)
			->execute();
		if (count($ret["node"])) {
			$nid = array_shift(array_keys($ret["node"]));
			return node_load($nid);
		}
	}
}

function helper_get_pre_product_in_type($crt_nid) {
	$node = node_load($crt_nid);
	if ($node) {
		$query = new EntityFieldQuery();
		$ret = $query->entityCondition("entity_type", "node")
			->entityCondition("bundle", $node->type)
			->propertyCondition("status", 1)
			->propertyCondition("nid", $crt_nid, "<")
			->range(0, 1)
			->execute();
		if (count($ret["node"])) {
			$nid = array_shift(array_keys($ret["node"]));
			return node_load($nid);
		}
	}
}

function helper_get_share_link($site, $node) {
	$sites = variable_get('social_share_sites', array());
  foreach ($sites as $site => $enabled) {
    if ($enabled) {
    	$link = _social_share_link($site, $node);
    	$link["#options"]["attributes"]['class'] .= ' '.strtolower($site);
      	$ret[] = $link;
    }
  }
  return $ret;
}

function helper_get_visited_count($node) {
    $statistics = statistics_get($node->nid);
    return $statistics['totalcount'];
}

function helper_get_download_count($fid, $entity) {
	return db_query("SELECT COUNT(fid) from {download_count} where fid = :fid AND type = :type AND id = :id", array(':fid' => $fid, ':type' => "node", ':id' => $entity->nid))->fetchField();
}