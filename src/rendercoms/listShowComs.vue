
<template>
   
    <yl-infolistcard  ref="card"
        v-if="option.type==='card'" 
        :schema="option.elmentConfig.schema"
        :style="option.elmentConfig.style"
        :item="item"
        ></yl-infolistcard>

    <!-- <yl-infolisttable  ref="table"
        v-else-if="option.type==='table'" 
        :schema="option.elmentConfig.schema"
        :style="option.elmentConfig.style"
        :item="item"
        ></yl-infolisttable> -->
 
    
    <yl-infolistreport  ref="report"
        v-else-if="option.type==='report'" 
        :schema="option.elmentConfig.schema"
        :style="option.elmentConfig.style"
        :item="item"
        >
    </yl-infolistreport>
     

      <!-- html展示组件 -->
    <yl-html ref="html"
        v-else-if="option.type==='html'" 
        :html="option.elmentConfig.html"
        :link="option.elmentConfig.link"
        :style="option.elmentConfig.style"
        :item="item"
    >
    </yl-html>

     <!--goodsCard展示组件 -->
    <yl-goodsCard ref="goodsCard"
        v-else-if="option.type==='goodsCard'" 
        :width="option.elmentConfig.width"
        :defaultProps="option.elmentConfig.defaultProps"
        :style="option.elmentConfig.style"
        :linkEvent="option.elmentConfig.linkEvent"
        :item="item"
    >
    </yl-goodsCard>

</template>

<script type="text/babel">
import baseMixn from '@/mixns/base.js';
import goodsCard from '../shopMall/ocomponents/card/goodsCard';
export default {
    mixins: [baseMixn],
    data(){
        return  {
        }
    },
    components:{
        "yl-goodsCard":goodsCard
    },
    props:{
       option:{
            type:Object,
            require:true,
            default:function(){
                return {}
            }
       },
       item:{
            type:Object,
            require:true,
            default:function(){
                return {}
            } 
        }
    },
    methods:{
       _initComs(){
            let _this=this;
            if(_this.option.eventConf!=undefined){
                let eventConf=_this.option.eventConf;
                    if(eventConf!=undefined){
                        if(eventConf.isOn){
                            eventConf.init(_this);
                        }
                    }  
            }
        },
    },
    created(){
    },
    mounted(){
        this._initComs()
    },
    

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>