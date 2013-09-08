/* 校园吸顶
 * @author wangyuchao
 * @version 2.0
 */
define(function(require, exports, module){
    var pageJob = require('../../components/units/pageJob');
    var checkDoms = require('../../components/action/checkDoms');
    require('../../kit/anim');


    var jobName='schoolText';
    var findoms;
    pageJob.create(jobName,{
        getDependentDoms : function(){
            return {
                aBtns:Q.$("[data-widget-ZPslideBtn=ZPslideBtn]"),
                aContents:Q.$("[data-widget-ZPslideContent=ZPslideContent]")
            };
        },
        check : function(doms){
            checkDoms(doms);
            findoms = doms;
            return true;
        },
        init : function(){
            var aBtns=findoms.aBtns;
            var aContents=findoms.aContents;
            var oherf=location.href;
            var oName=oherf.split('#')[1];
            var i;
            if(oName) {
                for(i=0;i<aContents.length;i++){
                    (function(index){
                        aContents[i].style.height=0+'px';
                        aBtns[i].innerHTML='展开';
                        if(index==oName){
                            aContents[index].style.height=aContents[index].scrollHeight+'px';
                            aBtns[index].innerHTML='收起';
                            document.body.scrollTop= Q.$(aBtns[index]).top();
                            document.documentElement.scrollTop=Q.$(aBtns[index]).top();
                        }
                    })(i);
                }
            }


            for(i=0;i<aBtns.length;i++){
                (function(index)
                {
                    aBtns[i].onclick=function()
                    {
                        if(this.innerHTML=='收起'){



                            Q.anim(Q.$(aContents[index]))
                                .duration(500)
                                .ease('Cubic')
                                .from('height',aContents[index].scrollHeight)
                                .to('height',0)
                                .go();
                            this.innerHTML='展开';
                        }
                        else{
                            var timer=null;
                            var onoff=true;
                            if(onoff){
                                onoff=false;
                            }
                            for(var i=0;i<aBtns.length;i++){
                                aBtns[i].innerHTML="展开";
                                aContents.css('height','0');
                            }
                            this.innerHTML='收起';
                            Q.anim(Q.$(aContents[index]))
                                .duration(1000)
                                .ease('Cubic')
                                .from('height',0)
                                .to('height',aContents[index].scrollHeight)
                                .go().onDone(function(){
                                onoff=true;
                                clearInterval(timer);
                            }) ;

                            timer=setInterval(function(){
                                document.body.scrollTop= Q.$(aBtns[index]).top();
                                document.documentElement.scrollTop=Q.$(aBtns[index]).top();
                            },10);
                        }




                    } ;
                })(i);


            }



        }
    });

    module.exports=jobName;
});