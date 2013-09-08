

(function ($) {
$(function(){
	//导航
	
	
	//banner
	
	(function(){
		
		var Tmove=function(){
				var style={
						oUL:$('.banner ul'),
						oL:$('.banner ol'),
						arrBnt:$('.banner ol li'),
						index:0,
						clickFalg:true
					};
					
				var setStyle=function(){
					if (style.oUL.size() == 0 ) { return }
						style.oUL[0].innerHTML+=style.oUL[0].innerHTML;
						style.arrLi=$(style.oUL).find('li');
						style.liLen=$(style.arrLi).length;
						$(style.arrLi).css('width',$('.banner').eq(0).innerWidth()+'px')
						$(style.oUL).css('width',$(style.arrLi).eq(0).innerWidth()*$(style.arrLi).length+'px');
					};
				setStyle();
				
				$.each(style.arrBnt,function(){
						$(this).click(function(){
								style.index=$(this).index();
								stratMove();
							});
					});
				
				var stratMove=function(){
						$(style.arrBnt).removeClass('active');
						$(style.arrBnt).eq(style.index%(style.liLen/2)).addClass('active');
						
						$('.banner ul').animate({marginLeft:-$(style.arrLi).eq(0).innerWidth()*style.index+'px'},function(){
							 if(style.index%5==style.liLen/2-1)
							 {
								 style.index=style.liLen/2-1;
								 $('.banner ul').css('marginLeft',-$(style.arrLi).eq(0).innerWidth()*(style.liLen/2-1)+'px');
							 }
						});
					};
					
				var autoPlay=function(){
						style.index++;
						stratMove();
					};
				setInterval(autoPlay,3000);
			};
		Tmove();
	})();
	
	//products
	(function(){
		var aLi=$('.products_index_list ul li');
		$(aLi).hover(function(){
			$(this).find('.detail').eq(0).fadeIn(500);
			$(this).find('.products_shade').eq(0).fadeTo(500,0.5);
		},function(){
			var _this=this;
			$(this).find('.detail').eq(0).fadeOut(500);
			$(this).find('.products_shade').eq(0).fadeOut(500);
		});
	
	})();
	
	//lifestyle
	(function(){
		
		var aDiv=$('.lifestyle_index_con .shade_bg');
		$(aDiv).parent().mouseover(function(){
			$(aDiv).show();
			$(this).find('.shade_bg').hide();
		});
		$('.lifestyle_index_con').eq(0).mouseout(function(ev){
			var to=ev.toElement;
			var _this=$('.lifestyle_index_con dl')[0];
			if(isChild(_this,to))
			{
				return;
			}
			$(aDiv).hide();
		});
	})();
	
});


function getPos(obj)
{
	var l=0;
	var t=0;
	while(obj)
	{
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
		
	}
	return {left:l,top:t};
}

function isChild(parent,obj)
{
	while(obj)
	{
		if(parent==obj)
		{
			return true;
		}
		obj=obj.parentNode;
	}
	return false;
}
})(jQuery);