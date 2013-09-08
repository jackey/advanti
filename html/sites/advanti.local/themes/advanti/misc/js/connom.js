(function ($) {
$(function(){
	//导航
	
	$('.nav_box > ul > li').hover(function(){
	
		$('.nav_box > ul > li > a').removeClass('active');
		$(this).children('a').eq(0).addClass('active');
		
		var oUl=$(this)[0].getElementsByTagName('ul')[0];
		if(oUl)
		{
			$('.nav_list_bg').show();
			$(this).find('ul').show();
			
			var left=$(this).find('ul').offset().left
			var innw=$(this).find('ul').innerWidth();
			var clw=window.innerWidth;
			
			var liLen=$(this).find('ul').find('li');
			var liW=0;
			for(var i=0;i<liLen.length;i++)
			{
				liW+=$(liLen).eq(i).innerWidth()+parseInt($(liLen).eq(i).css('marginRight'));
			}
			
			var parentW=$('.title_con').offset().left+$('.title_con').innerWidth();
			var liLeft=$(this).position().left+$('.title_con').offset().left;
			
			if((liW+liLeft)>=parentW)
			{
				$(this).find('ul').css('left',(liW+liLeft-parentW)*-1+'px')
			}
		}
	},function(ev){
		var to=ev.toElement||ev.relatedTarget;
		var _this=$(this)[0];
		if(isChild(_this,to))
		{
			return;
		}
		$(this).children('a').eq(0).removeClass('active');
		var oUl=$(this)[0].parentNode.getElementsByTagName('ul')[0];
		$(oUl).fadeOut();
		if(oUl)
		{
			$('.nav_list_bg').hide();
			$(this).find('ul').hide();
		}
	
	});
	
	$('.nav_box_list li').hover(function(){
		$(this).parent().find('li').removeClass('active');
		$(this).addClass('active');
	});
	
	
	
	//scroll
	var oBtn=$('#scroll_top')[0];
	$('#scroll_top').click(function ()
	{
		$('body,html').animate({scrollTop:'0px'});
	});

	// Life style image popup.
	var obj=$('.motor_img')[0];
	var sChild=$('.motor_img li');
	var prev=$('.prev_mo')[0];
	var next=$('.next_mo')[0];
	var curr_sum=$('.curr_sum');
	var sum=$('.sum');
	startTab(sChild,{prev:prev,next:next},'fade',{curr_sum:curr_sum,sum:sum});

	//amplification('.motor_img .fangda',2);
	setImgSrc($('.fangda'),$('.fangda').parents('.motor_img').find(' img'));

	$('.mot_right dd').hover(function(){
		$(this).find('.other_left img').fadeTo(100,1);
		$(this).find('p').addClass('hover');
		$(this).find('span').addClass('hover');
	},function(){
		$(this).find('img').fadeTo(100,0.6);
		$(this).find('p').removeClass('hover');
		$(this).find('span').removeClass('hover');
	});
	
	var ch=document.documentElement.clientHeight||document.body.scrollTop;
	
	window.onscroll=function ()
	{
		userScroll=true;
		
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		
		if(scrollTop+ch>1250)
		{
			$('#scroll_top').fadeIn();
		}
		else
		{
			$('#scroll_top').fadeOut();
		}
	};
});

//获取位置
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

//是否在父元素中
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


function startTab(sChild,ev,type,elseEv)
{
	if(!type)type='animate';
	var prev=ev.prev;
	var next=ev.next;
	var now=0;
	
	if(type=='fade'){$(elseEv.sum).html(sChild.length<10?'0'+sChild.length:sChild.length)};
	
	function tab()
	{
		if(type=='fade')
		{
			$.each(sChild,function(index){
				$(this).stop().fadeOut(800);
			});
			$(sChild).eq(now).stop().fadeIn(800);
			elseEv.curr_sum.html((now+1)<10?'0'+(now+1):(now+1));
		}
	}
	
	$(prev).click(function(){
		now--;
		if(now==-1)
		{
			now=0;
			return;
		}
		tab();
	});
	$(next).click(function(){
		now++;
		
		if(now==sChild.length)
		{
			now=$(sChild).length-1;
			return;
		}
		tab();
	});
}

function hoverMove(sChild,ev)
{
	$(ev.parent()).hover(function(){
		 $(this).find('.view_bg').addClass('view_bg2');
		
	},function(){
		$(this).find('.view_bg').removeClass('view_bg2');
	});
}

//遮罩放大
/*function amplification(aBnt,falg)
{
	$(aBnt).unbind('click')
	var aImg='';
	var aImg2='';
	var now2=0;
	
	$(aBnt).bind('click',function(){
		now2=0;	
		
		$('.show_img').stop().fadeIn();	
		if(falg==1){
			aImg=$(this).parent().find('img');	
		}else if(falg==2){
			aImg2=$(this).parents('.motor_img').find('img');
		}
				   
		aP=$(this).parent().find('p');
		var _this=this;
		
		var windowH=$(window).innerHeight();
		var windowW=$(window).innerWidth();
		var scrollT=$(window).scrollTop();
		  
		if(falg==1){
			now2=$(this).index();
		}
		else if(falg==2){
			now2=$(this).parent().index();
		}
		setSrc();
		
		var imgH=$('.show_img img').innerHeight();
		var imgW=$('.show_img img').innerWidth();
		
		$('.shad_body').show();
		
		$('.shad_body').css('height',$(document).innerHeight()+'px');
		
		$('.show_img').css({left:(windowW/2-imgW/2)+'px',top:(windowH/2-imgH/2)+scrollT+'px'});
		
	});
	
	function setSrc(){
		if(aImg2){
			var imgSrc=$(aImg2).eq(now2).attr('src');
			$('.show_img .show_bg').html($(aP).eq(now2).html())
			$('.show_img img').attr('src',imgSrc);
		}
		else{
			var imgSrc=$(aImg).eq(now2).attr('src');
			$('.show_img .show_bg').html($(aP).eq(now2).html())
			$('.show_img img').attr('src',imgSrc);
		}
	}
	
	$('#show_prev').unbind('click');
	$('#show_prev').bind('click',function(){
		now2--;
		if(now2==-1){
			$(this).hide();
			now2=0;
		}
		else{
			$('#show_next').show();
		}
		setSrc();
	});	
		
	$('#show_next').unbind('click');
	$('#show_next').bind('click',function(){
		now2++;
		if(aImg){
			
			if(now2==aImg.length){
				$(this).hide();
				now2=aImg.length-1;
			}
			else{
				$('#show_prev').show();
			}
		}
		else{
			if(now2==aImg2.length){
				$(this).hide();
				now2=aImg2.length-1;
			}
			else{
				$('#show_prev').show();
			}
		}
		setSrc();
	});
	
	$('#show_close').click(function(){
		$('.shad_body').hide();
		$('.show_img').hide();
		$('#show_next').show();
		$('#show_prev').show();
		now2=0;
	});
	
	$('.shad_body').click(function(){
    	$('#show_close').click();
		$(this).hide();
		$('.show_img').hide();
	});
	
}*/


window.Milestones = function(){
	
	var creaoUl=$('.milestones_year ul');
	var date=new Date();
	var yaer=date.getFullYear();
	for(var i=0;i<19;i++){
		$('<li>'+(yaer-i)+'<b></b></li>').appendTo(creaoUl);
	}
	
	var sEl={
		obj:$('.mi_con'),
		objUl:$('.mil_c_r ul'),
		oUlaLi:$('.mil_c_r ul li'),
		oUl:$('.milestones_year ul'),
		oDiv:$('.mi_year_list'),
		aLi:$('.milestones_year ul li'),
		now:0,
		aLiLen:$('.milestones_year ul li').length,
		conDiv:$('.milestones_con_right .mi_con_box')
	};
	$(sEl.aLi).eq(0).addClass('active');
	
	$('.milestones_prev').click(function(){
		sEl.now--;
		if(sEl.now==-1){
			sEl.now=0;
			return;
		}
		tab();
	});
	
	$('.milestones_next').click(function(){
		sEl.now++;
		if(sEl.now==sEl.aLiLen){
			sEl.now=sEl.aLiLen-1;
			return;
		}
		tab();
	});
	
	$(sEl.aLi).click(function(){
		sEl.now=$(this).index();
		tab();
	});
	
	function tab(){
		$(sEl.aLi).removeClass('active');
		$(sEl.oUlaLi).removeClass('active');
		$(sEl.aLi).eq(sEl.now).addClass('active');
		$(sEl.oUlaLi).eq(sEl.now).addClass('active');
		
		if(sEl.obj){
			$(sEl.obj).stop().animate({marginTop:-sEl.now*$(sEl.conDiv).eq(0).innerHeight()+'px'});
		}
		
		var oLi=$('.milestones_year ul .active');
		var aLiTop=$(oLi).position().top+$(oLi).innerHeight();
		var prevTop=$(oLi).position().top;
		var oDivH=$(sEl.oDiv).innerHeight();
		
		if(aLiTop>=oDivH){
			var mt=parseInt($(sEl.oUl).css('marginTop'))-$(sEl.aLi).eq(0).innerHeight();
			console.log(mt);
			$(sEl.oUl).css('marginTop',mt+'px');
			if(sEl.objUl){
				$(sEl.objUl).css('marginTop',mt+'px');
			}
			
		}
		else if(prevTop<0){
			var mt=parseInt($(sEl.oUl).css('marginTop'))+$(sEl.aLi).eq(0).innerHeight();
			$(sEl.oUl).css('marginTop',mt+'px');
			if(sEl.objUl){
				$(sEl.objUl).css('marginTop',mt+'px');
			}
		}
	}
};


//下拉列表
window.pull_down = function (backUrl){
	
	var sEle={
		obj:$('#xiala'),
		aLi:$('.options_list li'),
		yaerText:$('#yeartext'),
		oSele:$('#par_class')
	};
	
	$(sEle.obj).toggle(function(){
		$(this).addClass('options_active');	
		$(this).find('.options_list').show();
	},function(){
		$(this).removeClass('options_active');	
		$(this).find('.options_list').hide();
	});
	
	$(sEle.aLi).click(function(){
		if(backUrl){
			var url=$(this).find('a').attr('href');
			window.location.href=url;
		}else{
			var str=$(this).find('a').html();
			$(sEle.yaerText).html(str);
			$(sEle.oSele).get(0).selectedIndex=$(this).index();
		}
		
	});
}

//遮罩
window.setImgSrc = function (arrLi,aImg){
	arrLi.unbind('click');
	arrLi.bind('click',function(){
								
			var _this=this;
			for(var i=0,j=arrLi.length;i<j;i++){
				arrLi[i].index=i;
			}
		
			var windowH=$(window).innerHeight();
			var windowW=$(window).innerWidth();
			var documentH=$(document).innerHeight();
			var documentW=$(document).innerWidth();
			var scrollT=$(window).scrollTop();
			
			$('.shad_body').fadeTo(500,0.5).css({width:documentW+'px',height:documentH+'px'});
			$('.show_img').fadeIn().css({left:windowW/2-($('.show_img').innerWidth()/2)+'px',top:(windowH/2-($('.show_img').innerHeight()/2)+scrollT)+'px'});
			
			var index=this.index;
			
			var oImg=$('.show_img_con img');
			tab();
			
			$('#show_prev').unbind('click');
			$('#show_prev').click(function(){
				index--;
				if(index==-1){
					index=0;
					$('#show_prev').hide();
					return;
				}
				$('#show_next').show();
				tab();
			});
			
			$('#show_next').unbind('click');
			$('#show_next').click(function(){
				index++;
				
				if(index==$(aImg).length){
					index=$(aImg).length-1;
					$('#show_next').hide();
					return;
				}
				$('#show_prev').show();
				tab();
			});
			
			function tab(){
				var src=$(aImg).eq(index).attr('src');
				var strP=$(_this).find('p').html();
				oImg.eq(0).attr('src',src);
				oImg.LoadImage(true,638,432,'webfiles/en/images/common/loading.gif');
				oImg.css('marginTop',($('.show_img_con').innerHeight()-oImg.innerHeight())/2+'px');
				$('.show_bg').html(strP);
			};
			
			$('#show_close').click(function(){
				$('.shad_body').hide();
				$('.show_img').hide();
				index=0;
				$('#show_prev').show();
				$('#show_next').show();
			});
			
		});
};

//锚点平滑
window.maoScrollTo = function (arr){
	var href=window.location.href;
	var str=href.toString().split('#');
	var mao=str[1];
	
	if(arr){
		mao=arr;
	}
	
	if (mao&&isNaN(mao)) {//判断对象是否存在
		var maoObj=$('.'+mao);
		if(maoObj[0]){
			var pos = $(maoObj).offset().top; 
			$('html,body').animate({scrollTop:pos},1000);
		}
	} 
};


//等比例缩放
jQuery.fn.LoadImage=function(scaling,width,height,loadpic) {  
		if(loadpic==null) loadpic=null;  
		return this.each(function(){  
				var t=$(this);  
				var src=$(this).attr("src")  
				var img=new Image();  
				 
				img.src=src;  
				//自动缩放图片  
				var autoScaling=function(){  
					if(scaling){  
	 
						if(img.width>0 && img.height>0){  
							if(img.width/img.height>=width/height){  
								if(img.width>width){  
									t.width(width);  
									t.height((img.height*width)/img.width);  
								}else{  
									t.width(img.width);  
									t.height(img.height);  
								}  
							}  
							else{  
								if(img.height>height){  
									t.height(height);  
									var reW=(img.width*height)/img.height;
									if(reW<=width){//宽度不能小于父级宽度
										reW=width
									}
									t.width(reW); 
								}else{ 
									t.width(img.width);  
									t.height(img.height);  
								}  
							}  
						}  
					}  
				}  
				//阻止ff缓存图片  
				if(img.complete){   
					autoScaling();  
					return;  
				}  
				$(this).attr("src","");  
				var loading=$("<img alt=\"加载中\" title=\"图片加载中\" src=\""+loadpic+"\" />");  
 
				t.hide();  
				t.after(loading);  
				$(img).load(function(){  
					autoScaling();  
					loading.remove();  
					t.attr("src",this.src);  
					t.show();   
				});  
 
			});  
} 

$.fn.Tmove=function (options)
{
	var style={
		obj:options.obj,
		oUl:options.ul,//ul
		oL:options.ol,//ol
		arrBnt:options.bnt,//ol li a
		prveBnt:options.prev,//上一张按钮
		nextBnt:options.next,//下一张按钮
		index:0,
		clickFalg:true
	};
	
	var setStyle=function()//设置ul的宽度,取出li的个数
	{
		style.arrLi=$(options.ul).find('ul');
		style.liLen=$(options.ul).find('ul').length;
		style.oUl.style.width=970*style.arrLi.length+'px';		
	}
	setStyle();
	
	for(var i=0;i<style.arrBnt.length;i++)
	{
		style.arrBnt[i].index=i;
		style.arrBnt[i].onclick=function()
		{
			style.index=this.index;
			stratMove();
		};
	}
	
	var stratMove=function()//运动
	{
		$(style.oUl).stop().animate({'marginLeft':-style.arrLi[0].offsetWidth*style.index},function(){
			if(style.index%style.liLen/2==style.liLen/2-1)//如果是第10张,让它回到第五张
			{
				style.index=style.liLen/2-1;
				style.oUl.style.marginLeft=-style.arrLi[0].offsetWidth*(style.liLen/2-1)+'px';
			}
			style.clickFalg=true;
		});
	};
	
	style.nextBnt.onclick=function()//下一张
	{
		if(!style.clickFalg)return;
		style.clickFalg=false;
		style.index++;
		stratMove();
	};
	
	style.prveBnt.onclick=function()//上一张
	{
		if(!style.clickFalg)return;//如果没有运动完，返回
		style.clickFalg=false;
		if(style.index==0)//若果是第一张,让它回到第六张
		{
			style.index=style.liLen/2;
			style.oUl.style.marginLeft=-style.arrLi[0].offsetWidth*(style.liLen/2)+'px';
		}
		style.index--;
		stratMove();
	};
	
}
})(jQuery);














