(function($){
	// JavaScript Document
	$(function(){
		sectionFn();
		pull_down();
	});
	window.sectionFn=function(){
			var sEl={
					evBnt:$('.asia_box .hot'),
					closeaBnt:$('.asia_box .protab .close'),
					closeaBntTwo:$('.prompt_two .close'),
					obj:$('.asia_box')
				};
			
			
			sEl.evBnt.click(function(){	
						
					$('.asia_box .protab').hide();
					$(this).find('.protab').eq(0).show();
				
					var left=$(this).find('.protab').eq(0).parent().offset().left+$(this).find('.protab').innerWidth();
					var _this=this;
					
					$(window).resize(function(){
						var left=$(_this).find('.protab').eq(0).parent().offset().left+$(_this).find('.protab').innerWidth();					  
						ifOnresize(left,_this);
					});
					
					ifOnresize(left,this);
				});
			
			var ifOnresize=function(left,_this){
					
					var windowW=$(window).width();
					
					if(left>=windowW){
						var returnLeft=windowW-left;
						$(_this).find('.protab').eq(0).css('left',(returnLeft-20)+'px');
					}
					else
					{
						$(_this).find('.protab').eq(0).css('left',0+'px');
					}
				};
			
			
			
			sEl.closeaBnt.click(function(){
					$(this).parent().hide();
					return false;
				});
			
			sEl.evBnt.hover(function(){
					$(this).addClass('hover');
				},function(){
					$(this).removeClass('hover');
				});
			
		};
})(jQuery);