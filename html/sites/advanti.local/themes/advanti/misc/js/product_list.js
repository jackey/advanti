// JavaScript Document
(function(){
	window.product_list=function(options){
			var sEl={
					aDd:$('.nei_list_dd')
				};
				
			sEl.aDd.hover(function(){
					for(var str in options){
						console.log(str)
						$(this).find(options[str]).fadeIn();
					}
				},function(){
					for(var str in options){
						console.log(str)
						$(this).find(options[str]).fadeOut();
					}
				});
			
		};
})();