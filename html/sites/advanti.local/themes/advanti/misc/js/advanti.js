(function ($) {
	$(function () {
		$(".nei_list_dd").hover(function () {
			$(".nei_list_an", $(this)).css("display", "inline");
			$(".shade_span", $(this)).css("display", "inline");
			$(".shade_span em", $(this)).css("display", "inline");
			$(".nei_list_tb_2", $(this)).css("display", "inline");
		}, function () {
			$(".nei_list_an", $(this)).css("display", "none");
			$(".shade_span", $(this)).css("display", "none");
			$(".shade_span em", $(this)).css("display", "none");
			$(".nei_list_tb_2", $(this)).css("display", "none");
		});
	});
})(jQuery);