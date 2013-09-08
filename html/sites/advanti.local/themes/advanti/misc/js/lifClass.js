(function ($){
$(function(){
	
	wallpaperMove();
	imgTab();
	
	//lifestyle
	(function(){
		var el,s,m,create;
		el={
			aBnt:$('.news_title_right div'),
			move:$('.partner_listbox .lif_list'),
			con:$('.partner_listbox .lif_list_tab'),
			lastBnt:0,
			indexBnt:0,
			index:0,
			pageIndex:0,
			pagePrev:$('.paging_2 ol li'),
			navbnt:$('.listmove'),
			falg:true
		};
		for(var i=0;i<el.con.length;i++){
			el.con[i].innerHTML+=el.con[i].innerHTML;
		}
		
		create=function(index){
			
			var ulLen=el.move.eq(el.index).find('ul').length/2;
			
			$('.paging_2 ol').html('');
			for(var i=0;i<ulLen;i++){
				$('<li><a href="javascript:;">'+(i+1)+'</a></li>').appendTo('.paging_2 ol');
			}
			//alert(index)
			
			$().Tmove({
					obj:$('.partner_listbox'),
					ul:$('.partner_listbox .lif_list_tab')[index],
					ol:$('.page_right ol')[0],
					bnt:$('.page_right ol li'),
					prev:$('.paging_1 .page_prev')[0],
					next:$('.paging_1 .page_next')[0]
			});
		};
		create(el.index);
		
		el.aBnt.click(function(){
			
			if(!el.falg)return;
			el.falg=false;
			
			el.index=$(this).index();
			if(el.index==el.lastBnt){
				el.falg=true;
				return;
			}
			
			if(el.index>0){
				$(el.aBnt).removeClass('lifClass_active');
				$(this).addClass('lifClass_active');
				$(el.aBnt).eq(0).addClass('active')
			}else if(el.index==0){
				$(this).removeClass('active');
				$(el.aBnt).removeClass('lifClass_active');
			}
			
			
			el.move.eq(el.index).css('height',0);
			el.move.eq(el.lastBnt).stop().animate({height:0},function(){
				el.move.eq(el.index).show();
				el.move.eq(el.lastBnt).hide();
				el.move.eq(el.index).stop().animate({height:506},function(){
					el.falg=true;
					el.lastBnt=el.index;
					create(el.index);
				});
				
				
			});
			
		});
		
		el.navbnt.click(function(){
			el.aBnt.eq(parseInt($(this).parent().index()+1)).click();
			
		});
		
		maoTab();
		function maoTab(id){
			
			var href=window.location.href;
			
			var str=href.toString().split('#');
			
			
			if(str){
				el.aBnt.eq(parseInt(str[1])).click();
			}
		}
		
	})();
	
	
	
	
	//gallery
	/*function galleryMove()
	{
		var now=0;
		
		var aLi=$('.gallery_bottom_list ul li');
		var aLiHover=$('.gallery_list2_box ul li');
		var aLiImg=$('.gallery_list2_box ul li .gallery_img');
		var aBnt=$('.gallery_list2_box .data_index li');
		var oDiv=$('.gallery_bottom_list');
		var ScrollBox=$('.gallery_bottom_border');
		var oSpan=$('.gallery_bottom_border span');
		var oPrev=$('.gallery_bot_prev');
		var oNext=$('.gallery_bot_next');
		var scrolloUl=$('.gallery_bottom_list ul');
		
		var nowIndex=0;
		
		amplification(aBnt,1)
		
		$(aLi).click(function(){
							  
			nowIndex=$(this).index();
			setScroll(this);
			
			$('.gallery_list2_box .list2_box_start').removeClass('data_index');
			$('.gallery_list2_box .list2_box_start').eq($(this).index()).addClass('data_index');
			now=0;
			
			$('.gallery_list2_box .data_index').css('marginLeft',0);
			aBnt=$('.gallery_list2_box .data_index li');
			
			amplification(aBnt,1);
		});
		
		$(aLiHover).hover(function(){
			$(this).find('.gallery_img p').stop().animate({height:23+'px'})
			$(this).find('.gallert_shade').hide();
		},function(){
			$(this).find('.gallery_img p').stop().animate({height:0+'px'})
			$(this).find('.gallert_shade').show();
		});
		
		$(oPrev).click(function(){
			nowIndex--;
			if(nowIndex==-1){
				nowIndex=0;
				return;
			}
			setScroll($(aLi).eq(nowIndex));
		});
		
		$(oNext).click(function(){
			nowIndex++;
			if(nowIndex==$(aLi).length){
				nowIndex=$(aLi).length-1;
				return;
			}
			setScroll($(aLi).eq(nowIndex));
		});
		
		$('.gallery_prev').click(function(){
			now--;
			if(now==-1)
			{
				now=0;
				return false;
			}
			tab();
		});
		
		$('.gallery_next').click(function(){
			now++;
			var aUl=$('.gallery_list2_box .data_index ul');
			if(now==$(aUl).length)
			{
				now=$(aUl).length-1;
				return false;
			}
			tab();
		});
		
		function tab()
		{
			var w=$('.list2_box_start ul').eq(0).innerWidth();
			var oDiv=$('.gallery_list2_box .data_index');
			$(oDiv).stop().animate({marginLeft:-w*now+'px'});
		}
		
	
		var setScroll=function(this_oLi){
			
			$(aLi).removeClass('on');
			$(this_oLi).addClass('on');
			var h=$('.gallery_list').innerHeight();
			$('.gallery_list2').stop().animate({marginTop:-h*nowIndex+'px'});
			
			var oDivLeft=parseInt($(oDiv).css('marginLeft'));
			var this_w=$(this_oLi).position().left+$(this_oLi).innerWidth()-$(oSpan).innerWidth();
			var scroll_Left=$(this_oLi).position().left;
			var sums=890;
			
			if(sums<=$(this_oLi).position().left+$(this_oLi).innerWidth()){
				var ml=parseInt($(scrolloUl).css('marginLeft'))-$(this_oLi).innerWidth();
				$(scrolloUl).css('marginLeft',ml)
				this_w=scroll_Left-$(oSpan).innerWidth();
			}
			
			if(scroll_Left<=0){
				var ml=parseInt($(scrolloUl).css('marginLeft'))+$(this_oLi).innerWidth();
				
				this_w=scroll_Left+$(this_oLi).innerWidth()+$(oSpan).innerWidth()+oDivLeft;
				if(ml>=0){
					ml=0;
					this_w=$(this_oLi).innerWidth()-oDivLeft;
				};
				$(scrolloUl).css('marginLeft',ml);
			}
			
			$(ScrollBox).css('width',(oDivLeft+this_w)+'px')	
		};
		
	}*/
	//gallery
	var galleryFn=function(){
		var sEl={
				aBntLi:$('.gallery_bottom_list ul li'),
				moveDiv:$('.gallery_list2'),
				moveDivParent:$('.gallery_list'),
				bntPrev:$('.gallery_bot_prev'),
				bntNext:$('.gallery_bot_next'),
				amoveList:$('.gallery_list2_box'),
				oBntPrev:$('.gallery_prev'),
				oBntNext:$('.gallery_next'),
				cBntLiCon:$('.gallery_bottom_list'),
				scrollBg:$('.gallery_bottom_border'),
				scrollSpan:$('.gallery_bottom_border span'),
				moveoUl:$('.gallery_bottom_list ul'),
				listLi:$('.gallery_list2_box ul li'),
				Index:0,
				isNow:0
			};
			
		function setSrc(){
			var arrLi=sEl.amoveList.eq(sEl.Index).find('ul li');
			var arrImg=sEl.amoveList.eq(sEl.Index).find('ul .gallery_img img');
			setImgSrc(arrLi,arrImg);
		}
		setSrc();
		
		var bigSum={
				moveDivParentH:sEl.moveDivParent.innerHeight(),
				moveDivParentW:sEl.moveDivParent.innerWidth(),
				cBntLiConW:sEl.cBntLiCon.innerWidth()
			};	
			
		var tab=function(){
				sEl.aBntLi.removeClass('on');
				sEl.aBntLi.eq(sEl.Index).addClass('on');
				
				var curLoction=sEl.aBntLi.eq(sEl.Index).position().left+sEl.aBntLi.eq(sEl.Index).innerWidth();
				var oLiLeft=sEl.aBntLi.eq(sEl.Index).position().left;
				var liConLeft=parseInt(sEl.moveoUl.css('marginLeft'));
				
				if(curLoction>=bigSum.cBntLiConW){
						var ml=liConLeft-(curLoction-bigSum.cBntLiConW);
						sEl.moveoUl.css('marginLeft',ml);
						curLoction=bigSum.cBntLiConW;
					}
				if(oLiLeft<=0){
						liConLeft=liConLeft-oLiLeft;
						sEl.moveoUl.css('marginLeft',liConLeft);
						curLoction=sEl.aBntLi.eq(sEl.Index).innerWidth()+parseInt(sEl.cBntLiCon.css('marginLeft'))-sEl.scrollSpan.innerWidth();
					}
					
				setSrc();
				sEl.scrollBg.css('width',curLoction);
				sEl.moveDiv.stop().animate({marginTop:-sEl.Index*bigSum.moveDivParentH+'px'});
			};	
		
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
				if(sEl.Index==sEl.aBntLi.length){
					sEl.Index=sEl.aBntLi.length-1;
					return;
				}
				tab();
			});
		
		sEl.aBntLi.click(function(){
				sEl.Index=$(this).index();
				tab();
			});
		
		sEl.oBntPrev.click(function(){
				sEl.isNow--;
				if(sEl.isNow==-1){
					sEl.isNow=0;
					return;
				}
				$(sEl.amoveList).eq(sEl.Index).find('.list2_box_start').stop().animate({'marginLeft':-sEl.isNow*bigSum.moveDivParentW+'px'});
			});
		
		sEl.oBntNext.click(function(){
				sEl.isNow++;
				if(sEl.isNow==$(sEl.amoveList).eq(sEl.Index).find('.list2_box_start ul').length){
					sEl.isNow=$(sEl.amoveList).eq(sEl.Index).find('.list2_box_start ul').length-1;
					return;
				}
				$(sEl.amoveList).eq(sEl.Index).find('.list2_box_start').stop().animate({'marginLeft':-sEl.isNow*bigSum.moveDivParentW+'px'});
			});
		
		sEl.listLi.hover(function(){
				$(this).find('.gallert_shade').fadeTo(500,0);
				$(this).find('.gallery_img p').stop().animate({height:23+'px'});
			},function(){
				$(this).find('.gallert_shade').fadeTo(500,0.5);
				$(this).find('.gallery_img p').stop().animate({height:0+'px'});
			});
		
	};
	
	galleryFn();
	
	//wallpaper
	function wallpaperMove()
	{
		
		var now=0;		
		var oUl=$('.wallpager_page ul');
		var aUl=$('.wallpapet_right_list ul');
		
		$('.wallpapet_right_list').css('width',$(aUl).eq(0).innerWidth()*$(aUl).length+'px');
	
		$.each(aUl,function(index){
			$('<li class="on"><a href="javascript:;">'+(index+1)+'</a></li>').appendTo(oUl);
		});
		
		var aBnt=$('.wallpager_page ul li');
		$(aBnt).click(function(){
			now=$(this).index();
			tab();
		});
		
		$('.prev_wall').click(function(){
			now--;
			if(now==-1)
			{
				now=0;
				return false;
			}
			tab();
		});
		
		$('.next_wall').click(function(){
			now++;
			if(now==$(aUl).length)
			{
				now=$(aUl).length-1;
				return false;
			}
			tab();
		});
		
		function tab()
		{
			$('.wallpapet_right_list').animate({marginLeft:-$(aUl).eq(0).innerWidth()*now});
		}
		
	}
	
	
	function imgTab(aLi)
	{
		var now=0;
		var aLi=$('.wallpapet_right_list li');
		$(aLi).eq(0).addClass('active');
		for(var i=0;i<aLi.length;i++)
		{
			aLi[i].index=i;
			$(aLi[i]).hover(function()
			{
				$(aLi).removeClass('active');
				$(this).addClass('active');
			},function(){
				$(aLi).removeClass('active');
				$(aLi).eq(now).addClass('active');
			});
			
			$(aLi[i]).click(function(){
				now=$(this).index();
				tab();
			});
		}
		
		
		
		$('.wall_left_prev').click(function(){
			now--;
			if(now==-1)
			{
				now=0;
				return false;
			}
			tab();
		});
		
		$('.wall_left_next').click(function(){
			now++;
			if(now==$(aLi).length)
			{
				now=$(aLi).length-1;
				return false;
			}
			tab();
		});
		
		function tab()
		{
			$('.wallpaper_img_list li').stop().fadeOut();
			$('.wallpaper_img_list li').eq(now).stop().fadeIn();
			
			$(aLi).removeClass('active');
			$(aLi).eq(now).addClass('active');
		}
		
	}
	
	
});


//


function getStyle(obj,name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}

})(jQuery);





