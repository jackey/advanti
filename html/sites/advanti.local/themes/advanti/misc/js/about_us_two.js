(function ($) {
// JavaScript Document
$(function(){
	aboutTab();
});

(function(){
	window.aboutTab=function(){
		var sEl={
			aBnt:$('.list_bnt_con a'),
			MoveDiv:$('.fac_mt'),
			MdivParent:$('.fac_img_show'),
			Index:0,
			bntPrev:$('.s_bnt_prev'),
			bntNext:$('.s_bnt_next'),
			aBntLen:$('.list_bnt_con a').length,
			aBntParent:$('.fac_list_bnt'),
			moveBntCon:$('.list_bnt_con'),
			scrollDiv:$('.fac_scroll'),
			oSpan:$('.fac_scroll span'),
			isNow:0,
			oBntPrev:$('.fac_prev'),
			oBntNext:$('.fac_next'),
			aUl:$('.fac_img_show ul'),
			aUlParent:$('.fac_img_show')
		};
		
		var bigSum={
			MdivParentH:sEl.MdivParent.innerHeight(),
			MdivParentW:sEl.MdivParent.innerWidth(),
			aBntParentW:sEl.aBntParent.innerWidth(),
			aUlParentW:sEl.aUlParent.innerWidth()
		};
		
		var setStyle=function(){
			var sW=sEl.aBnt.eq(0).outerWidth()+parseInt(sEl.aBntParent.css('marginLeft'))-sEl.oSpan.innerWidth();
			sEl.scrollDiv.css('width',sW+'px');	
		};
		setStyle();
		
		var tab=function(){
			sEl.isNow=0;
			
			sEl.aUl.css('marginLeft',0);
			sEl.aBnt.removeClass('active');
			sEl.aBnt.eq(sEl.Index).addClass('active');
			
			var curLoction=sEl.aBnt.eq(sEl.Index).position().left+sEl.aBnt.eq(sEl.Index).innerWidth();
			var aBntParentLeft=parseInt(sEl.moveBntCon.css('marginLeft'));
			if(curLoction>=bigSum.aBntParentW){
				var Fml=aBntParentLeft-(curLoction-bigSum.aBntParentW);
				sEl.moveBntCon.css({marginLeft:Fml+'px'});
			}
			
			if(sEl.aBnt.eq(sEl.Index).position().left<=0){
				aBntParentLeft=aBntParentLeft-sEl.aBnt.eq(sEl.Index).position().left;
				sEl.moveBntCon.css({marginLeft:aBntParentLeft+'px'});
				curLoction=sEl.aBnt.eq(sEl.Index).innerWidth()+parseInt(sEl.aBntParent.css('marginLeft'))-sEl.oSpan.innerWidth();
			}
			if(curLoction>=bigSum.aBntParentW){
				curLoction=bigSum.aBntParentW;
			}
			
			sEl.scrollDiv.css('width',curLoction+'px');
			sEl.MoveDiv.stop().animate({marginTop:-sEl.Index*bigSum.MdivParentH+'px'});	
		};
		
		sEl.aBnt.click(function(){
			sEl.Index=$(this).index();
			tab();
		});
		
		sEl.bntPrev.click(function(){
			sEl.Index--;
			if(sEl.Index==-1){
				sEl.Index=0;
				return;
			}
			tab();
		});
		
		sEl.bntNext.click(function(){
			sEl.Index++;
			if(sEl.Index==sEl.aBntLen){
				sEl.Index=sEl.aBntLen-1;
				return;
			}
			tab();
		});
		
		sEl.oBntPrev.click(function(){
			sEl.isNow--;
			if(sEl.isNow==-1){
				sEl.isNow=0;
				return;
			}
			$(sEl.aUl).eq(sEl.Index).stop().animate({'marginLeft':-sEl.isNow*bigSum.aUlParentW+'px'});
		});
		
		sEl.oBntNext.click(function(){
			sEl.isNow++;
			console.log(sEl.isNow)
			if(sEl.isNow==$(sEl.aUl).eq(sEl.Index).find('li').length){
				sEl.isNow=$(sEl.aUl).eq(sEl.Index).find('li').length-1;
				return;
			}
			$(sEl.aUl).eq(sEl.Index).stop().animate({'marginLeft':-sEl.isNow*bigSum.aUlParentW+'px'});
		});
		
	};
})();
})(jQuery);
