(function ($) {
$(function(){
	
	var style={
			obj:$('.gallery_bottom'),
			scroll_t:$('.gallery_bottom_border'),
			oSpan:$('.gallery_bottom_border span'),
			oDiv:$('.gallery_bottom_list'),
			oUl:$('.gallery_bottom_list ul'),
			aLi:$('.gallery_bottom_list ul li'),
			scroll_w:0
		};
		
	var setStyle=function()
	{
		var aLiW=0;
		
		$.each(style.aLi,function(index){
			aLiW+=$(this).innerWidth()+1;
		});
		
		style.oUl.css('width',aLiW+'px');
		
		var w=style.obj.width()*style.oDiv.width()/style.oUl.innerWidth();
		var oSpanW=style.oSpan.innerWidth();
		
		if(w+oSpanW>=960)
		{
			w=960-oSpanW;
		}
		style.scroll_w=w;
		style.scroll_t.css('width',w+'px');
	};
	setStyle();
	
	var scrollMove=function()
	{
		addWheel(style.oUl[0],function(Bdown){
			if(Bdown)
			{
				var l=style.scroll_t[0].offsetWidth-10;
			}
			else
			{
				var l=style.scroll_t[0].offsetWidth+10;
			}
			scroll_top(l);
		});
		
		
		style.oSpan.mousedown(function(ev){
									   
			var oEv=ev||event;
			var disX=oEv.clientX-style.oSpan.position().left;
			
			$(document).mousemove(function(ev){
				var oEv=ev||event;
				var l=oEv.clientX-disX;
				
				scroll_top(l);
			});
			
			$(document).mouseup(function(){
				$(document).unbind('mousemove');
				$(document).unbind('mouseup');
			});
			
			return false;
		});
		
		
		$('.gallery_bot_prev').click(function(){
			var l=style.scroll_t[0].offsetWidth-10;
			scroll_top(l);
		});
		
		$('.gallery_bot_next').click(function(){
			var l=style.scroll_t[0].offsetWidth+10;
			
			scroll_top(l);
		});
		
	};
	
	var scroll_top=function (l)
	{
		if(l<style.scroll_w)
		{
			l=style.scroll_w;
		}
		else if(l>style.obj.width()-style.oSpan.innerWidth())
		{
			l=style.obj.width()-style.oSpan.innerWidth();
		}
		
		style.scroll_t.css('width',l+'px');
		var x=l-style.scroll_w;
		var scale=x/(style.obj.width()-style.scroll_w-style.oSpan.innerWidth());
		
		style.oUl[0].style.left=-(style.oUl.innerWidth()-style.oDiv.width())*scale+'px';
		
	}
	
	
	scrollMove();
	
});


function addWheel(obj,fnBack)
{
	if(!obj)return;
	obj.onmousewheel=fnWheel;
	if(obj.addEventListener)
	{
		obj.addEventListener('DOMMouseScroll',fnWheel,false);
	}
	
	function fnWheel(ev)
	{
		var oEv=ev||event;
		var bDown=true;
		if(oEv.wheelDelta)
		{
			if(oEv.wheelDelta>0)
			{
				bDown=true;
			}
			else
			{
				bDown=false;
			}
		}
		else
		{
			if(oEv.detail)
			{
				if(oEv.detail>0)
				{
					bDown=false;
				}
				else
				{
					bDown=true;
				}
			}
		}
		fnBack(bDown);
		if(oEv.preventDefault)
		{
			oEv.preventDefault();
		}
		return false;

	}
}	
})(jQuery);

