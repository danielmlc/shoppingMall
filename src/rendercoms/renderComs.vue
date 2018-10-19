<template>
     <!--头部组件-->
   <yl-header  ref="header"
        v-if="option.type==='header'" 
        :title="option.elmentConfig.title"
        :left="option.elmentConfig.left"
        :right="option.elmentConfig.right"
        :theme="option.elmentConfig.theme"
        @leftEvent="_method1"
        @rightEvent="_method2"
   >
   </yl-header>

    <!--菜单组件-->
   <yl-grid ref="grid"
        v-else-if="option.type==='grid'" 
        :itemList="option.elmentConfig.itemList"
        :columnNum="option.elmentConfig.columnNum"
        :border="option.elmentConfig.border"
        :style="option.elmentConfig.style"
   >
   </yl-grid>
  
      <!--工具条组件-->
   <yl-cell ref="cell"
        v-else-if="option.type==='cell'" 
        :icon="option.elmentConfig.icon"
        :title="option.elmentConfig.title"
        :content="option.elmentConfig.content"
        :isLink="option.elmentConfig.isLink"
        :styleConf="option.elmentConfig.styleConf"
        :style="option.elmentConfig.style"
        @linkTo="_method1"
   >
   </yl-cell>

   <!-- 图表展示组件 -->
    <yl-echarts ref="echarts"
        v-else-if="option.type==='echarts'" 
        :options="option.elmentConfig.options"
        :autoResize="option.elmentConfig.autoResize"
        :initOptions="option.elmentConfig.initOptions"
        :group="option.elmentConfig.group"
        :watchShallow="option.elmentConfig.watchShallow"
        :style="option.elmentConfig.style"
   >
   </yl-echarts>

   <!-- html展示组件 -->
    <yl-html ref="html"
        v-else-if="option.type==='html'" 
        :html="option.elmentConfig.html"
        :link="option.elmentConfig.link"
        :style="option.elmentConfig.style"
   >
   </yl-html>
   

     <!-- filter过滤器组件 -->
    <yl-filter ref="filter"
        v-else-if="option.type==='filter'" 
        :filterConf="option.elmentConfig.filterConf" 
        :searchModel="option.elmentConfig.searchModel"
        :style="option.elmentConfig.style"
   >
   </yl-filter>


    <!-- form表单组件 -->
    <yl-form ref="form"
        v-else-if="option.type==='form'" 
        :options="option.elmentConfig.options"
        :style="option.elmentConfig.style"
        @reload="_method1"
   >
   </yl-form>

    <!-- 信息列表展示渲染器 -->
    <yl-listscroll ref="listscroll"
        v-else-if="option.type==='listscroll'" 
        :scrollEnable="option.elmentConfig.scrollEnable"
        :scrollOptions="option.elmentConfig.scrollOptions"
        :infoShowOptions="option.elmentConfig.infoShowOptions"
        :isAdvancePaging="option.elmentConfig.isAdvancePaging"
        :pageSize="option.elmentConfig.pageSize"
        :data="option.elmentConfig.data"
        :style="option.elmentConfig.style"
        @onPullingDown="_method1"
        @onPullingUp="_method2"
        >
    </yl-listscroll>


    <!-- 信息块展示 -->
    <yl-infolistcard  ref="infolistcard"
        v-else-if="option.type==='infolistcard'" 
        :schema="option.elmentConfig.schema"
        :style="option.elmentConfig.style"
        :item="option.elmentConfig.item"
    ></yl-infolistcard>

 

    <yl-infolistreport  ref="infolistreport"
        v-else-if="option.type==='infolistreport'" 
        :schema="option.elmentConfig.schema"
        :style="option.elmentConfig.style"
        :item="option.elmentConfig.item"
    ></yl-infolistreport>


    <!-- 轮播容器 -->
    <yl-slide  ref="slide"
        v-else-if="option.type==='slide'" 
        :options="option.elmentConfig.options"
        :style="option.elmentConfig.style"
        @changePage="_method1"
        @clickPage="_method2"
    ></yl-slide>

     <!-- 链接块 -->
    <yl-linkblock  ref="linkblock"
        v-else-if="option.type==='linkblock'" 
        :confList="option.elmentConfig.confList"
        :style="option.elmentConfig.style"
    ></yl-linkblock>

    <!-- 物资选择项 -->
    <yl-goodsSelect  ref="goodsSelect"
        v-else-if="option.type==='goodsSelect'" 
        :goodsInfo="option.elmentConfig.goodsInfo"
        :style="option.elmentConfig.style"
    ></yl-goodsSelect>

     <!-- 商品处理工具栏 -->
    <yl-goodsHandleBar  ref="goodsHandleBar"
        v-else-if="option.type==='goodsHandleBar'" 
        :style="option.elmentConfig.style"
    ></yl-goodsHandleBar>

 </template>

<script type="text/babel">
import baseMixn from '@/mixns/base.js';
import goodsSelect from '../shopMall/ocomponents/goodsSelect/goodsSelect';
import goodsHandleBar from '../shopMall/ocomponents/goodsHandleBar/goodsHandleBar';
export default {
    mixins: [baseMixn],
    data(){
        return{
        }
    },
    props:{
         option:{
            type:Object,
            require:true,
            default:function(){
                return {}
            }
        },
        outParams:{
            type:Object,
            require:false,
            default:function(){
                return {}
            }
        },
        constPrams:{
            type:Object,
            default:function(){
                return {}
            }
        },
        refList:{
            type:Object,
            require:false,
            default:function(){
                return {}
            }
        },
    },
    computed:{
    },
    methods:{
        _initComs(){
            let _this=this;
            if(_this.option.InterceptEvent!=undefined){
                let eventConf=_this.option.InterceptEvent.init;
                    if(eventConf!=undefined){
                        if(eventConf.isOn){
                            eventConf.event(_this);
                        }
                    }  
            }
        },
        _watchConstParams(n){
            let _this=this;
            if(_this.option.WatchEvent!=undefined){
                let eventConf=_this.option.WatchEvent.constPrams;
                 if(eventConf!=undefined){
                        if(eventConf.isOn){
                            eventConf.event(_this,n);
                        }
                    }  
            }
        },
        _watchGlobParams(n){
            let _this=this;
            if(_this.option.WatchEvent!=undefined){
                let eventConf=_this.option.WatchEvent.getGlobString2;
                 if(eventConf!=undefined){
                        if(eventConf.isOn){
                            eventConf.event(_this,n);
                        }
                    }  
            }
        },
        _method1(node,_coms){
					let _this=this
					let eventConf=this.option.eventConf;
					if(eventConf!=undefined){
						if(eventConf.isOn){
							if(eventConf.method1!=undefined){
									eventConf.method1(node,_this,this.option);
							}
						}
					}
        },
        _method2(node,_coms){
                    let _this=this
					let eventConf=this.option.eventConf;
                    if(eventConf!=undefined){
                    if(eventConf.isOn){
                        if(eventConf.method2!=undefined){
                            eventConf.method2(node,_this,this.option);
                        }
                    }
                }
        },
        _method3(node,_coms){
                let _this=this
				let eventConf=this.option.eventConf;
                if(eventConf!=undefined){
                if(eventConf.isOn){
                    if(eventConf.method3!=undefined){
                            eventConf.method3(node,_this,this.option);
                    }
                }
                }
        },
        _method4(node,_coms){
                let _this=this
				let eventConf=this.option.eventConf;
                if(eventConf!=undefined){
                if(eventConf.isOn){
                    if(eventConf.method4!=undefined){
                        eventConf.method4(node,_this,this.option);
                    }
                }
            }
        },
        collect(){
             let name='';
             if(this.option.name){
                 name=this.option.name
             }else{
                 name=this.option.type
             }
            this.refList[name]=this.$refs;
        }
    },
    components:{
        "yl-goodsSelect":goodsSelect,
        "yl-goodsHandleBar":goodsHandleBar,
        
    },
    beforeMount(){
       this._initComs();   
    },
    mounted(){
        this.collect();
    },
    watch:{
       constPrams:{
            handler(n,o){
                this._watchConstParams(n);
            },
        },
        getGlobString2:{
             handler(n,o){
                this._watchGlobParams(n);
            },   
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
