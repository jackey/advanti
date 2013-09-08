//图片等比列
(function($){
$(function(){
	//放大镜
	$('.product_intro_img img').attr('src',$('.pshow_list li img').eq(0).attr('src'));
	$('.big_img img').attr('src',$('.pshow_list li img').eq(0).attr('src'));
	$('.product_intro_img').hover(function(){
		$('.big_img').show();
		$('.product_intro_img img').hide();
		
		$('.product_intro_img').eq(0).mousemove(function(ev){
			
			var oEv=ev||event;
			var l=oEv.clientX-$('.product_intro_left').offset().left-10;
			var t=oEv.clientY-$('.product_intro_left').offset().top-10;
		  	
			if(oEv.clientX<=$('.product_intro_left').offset().left){
				l=oEv.clientX;
			}
		  
			if(l<0)
			{
				l=0;
			}
			else if(l>$('.product_intro_left').outerWidth()-10)
			{
				l=$('.product_intro_left').outerWidth()-10;
			}	
						
			if(t<0)
			{
				t=0;
			}
			else if(t>$('.product_intro_left').innerWidth()-10)
			{
				t=$('.product_intro_left').innerHeight()-10;
			}
			
			var left=l/($('.product_intro_left').innerWidth()-10);
			var top=t/($('.product_intro_left').innerHeight()-10);
			 
			$('.big_img img').css({
				left:-parseInt(left*($('.big_img img').innerWidth()-$('.product_intro_left').innerWidth()))+'px',
				top: -parseInt(top*($('.big_img img').innerHeight()-$('.product_intro_left').innerHeight()))+'px'
			});
		})
		
		return false;
	},function(){
		$('.big_img').hide();
		$('.product_intro_img img').show();
	});
	
	
	//选项框
	var psjow_tab=function(){
		var sEl={
			oPrev:$('.pshow_list_prev'),
			oNext:$('.pshow_list_next'),
			oUl:$('.pshow_list ul'),
			aLi:$('.pshow_list ul li'),
			aLiLen:$('.pshow_list ul li').length,
			now:0,
			obj:$('.pshow_list'),
			sum:[]
		};
		
		$(sEl.oNext).click(function(){
			sEl.now++;
			if(sEl.now==sEl.aLiLen){
				sEl.now=sEl.aLiLen-1;
				return;
			}
			tab();
		});
		
		$(sEl.oPrev).click(function(){
			sEl.now--;
			if(sEl.now==-1){
				sEl.now=0;
				return;
			}
			tab();
		});
		
		$(sEl.aLi).click(function(){
			sEl.now=$(this).index();
			tab();
		});
		
		function tab(){
			
			sEl.oLiLeft=$(sEl.aLi).eq(sEl.now).position().left+$(sEl.aLi).eq(sEl.now).innerWidth();
			sEl.oLiLeft2=$(sEl.aLi).eq(sEl.now).position().left;
			
			sEl.oLiml=parseInt($(sEl.oUl).css('marginLeft'));
			sEl.oUlW=$(sEl.obj).innerWidth();
			sEl.liW=$(sEl.aLi).eq(sEl.now).innerWidth();
			 
			 if(sEl.oLiLeft>sEl.oUlW){
				
				 sEl.sum.push(sEl.oLiLeft-sEl.oUlW);
				 var ml=sEl.oLiml-(sEl.oLiLeft-sEl.oUlW);
				 $(sEl.oUl).css('marginLeft',ml);
			 }
			 if(sEl.oLiLeft2<=0){
				 sEl.sum.reverse();
				 sEl.oLiml+=sEl.sum.shift(sEl.sum);
				 $(sEl.oUl).css('marginLeft',sEl.oLiml);
			 }
			 
			 $(sEl.aLi).removeClass('active');
			 $(sEl.aLi).eq(sEl.now).addClass('active');
			 
			 var src=$(sEl.aLi).eq(sEl.now).find('img').attr('src');
			 $('.product_intro_img img').attr('src',src);
			 $('.big_img img').attr('src',src);
		}
	};
	psjow_tab();
});
    $.fn.VMiddleImg = function(options) {
        var defaults={
            "width":null,
            "height":null
        };
        var opts = $.extend({},defaults,options);
        return $(this).each(function() {
            var $this = $(this);
            var objHeight = $this.height(); //图片高度
            var objWidth = $this.width(); //图片宽度
            var parentHeight = opts.height||$this.parent().height(); //图片父容器高度
            var parentWidth = opts.width||$this.parent().width(); //图片父容器宽度
            var ratio = objHeight / objWidth;
            if (objHeight > parentHeight && objWidth > parentWidth) {
                if (objHeight > objWidth) { //赋值宽高
                    $this.width(parentWidth);
                    $this.height(parentWidth * ratio);
                } else {
                    $this.height(parentHeight);
                    $this.width(parentHeight / ratio);
                }
                objHeight = $this.height(); //重新获取宽高
                objWidth = $this.width();
                if (objHeight > objWidth) {
                    $this.css("top", (parentHeight - objHeight) / 2);
                    //定义top属性
                } else {
                    //定义left属性
                    $this.css("left", (parentWidth - objWidth) / 2);
                }
            }
            else {
                if (objWidth > parentWidth) {
                    $this.css("left", (parentWidth - objWidth) / 2);
                }
                $this.css("top", (parentHeight - objHeight) / 2);
            }
        });
    };
})(jQuery);
