
<template>
    <cube-scroll  v-if="scrollEnable"
        ref="scrollList"
        :data="showDataList"
        :options="scrollOptions.options"
        :direction="scrollOptions.direction"
        :scrollEvents="scrollOptions.scrollEvents"
        :refreshDelay="scrollOptions.refreshDelay"
        @pulling-down="_onPullingDown"
        @pulling-up="_onPullingUp">
            <div class="listwarper" :style="listStyle">
                <yl-listshowcoms 
                    v-for="(item,index) in showDataList" 
                    :key="index"
                    :option="infoShowOptions"
                    :item="item">
                </yl-listshowcoms> 

                 <div v-if="_hasData()" class="nodata">暂无数据</div> 
            </div>
    </cube-scroll>

    <div class="listwarper" :style="listStyle"  v-else-if="!scrollEnable">
                 <yl-listshowcoms 
                    v-for="(item,index) in dataList" :key="index"
                    :option="infoShowOptions"
                    :item="item">
                </yl-listshowcoms> 

                <div v-if="_hasData()" class="nodata">暂无数据</div> 
    </div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-scrollList'
import baseMixn from '@/mixns/base.js';
export default {
    name:COMPONENT_NAME,
    data(){
        return  {
            dataList:[],
            showDataList:[],
            draw:1,
        }
    },
    mixins: [baseMixn],
    computed:{
       
    },
    props:{
        listStyle:{},
        isAdvancePaging:{
            type:Boolean,
            default:false
        },
        pageSize:{
            type:Number,
            default:10
        },
        scrollEnable:{
            type:Boolean,
            default:true
        },
        scrollOptions:{
                type:Object,
                default:function(){
                    return {
                            options:{},
                            direction:'vertical',
                            scrollEvents:[],
                            refreshDelay:20
                        }
                }
            },
        infoShowOptions:{
              type:Object,
                default:function(){
                    return {
                    }
                }
        },
        data:{
            type:Array,
                default:function(){
                    return []
                }
        }    
    },
    methods:{
        _hasData(){
            if(this.scrollEnable){
                 return this.showDataList.length==0;
            }else{
                 return this.dataList.length==0;
            }
        },
        _onPullingDown(){
             if(this.isAdvancePaging){
                //分页加载情况
               let filterParams=this.getGlobObject2;
               if(filterParams.draw){
                   filterParams.draw=1;
                   filterParams.skipCount=0;
                   this.showDataList=[];
                   this.setGlobObject2(filterParams);
               };
             }
             this.$emit('onPullingDown');
        },
        _onPullingUp(){
            if(this.isAdvancePaging){
                //分页加载情况
                let filterParams=this.getGlobObject2;
                if(filterParams.draw){
                    filterParams.draw=filterParams.draw+1;
                    filterParams.skipCount=(filterParams.draw-1)*filterParams.maxResultCount;
                    this.setGlobObject2(filterParams);
                };
                this.$emit('onPullingUp');
            }else{
                //后置分页
                this.PageChange();
            }
        },
        forceUpdate(){
           this.$refs.scrollList.forceUpdate();
        },
        PageChange(){
                let startIndex=(this.draw-1)*this.pageSize;
                let endIndex=startIndex+this.pageSize;
                let pageData=[];
                if(this.dataList.length>0){
                    pageData= this.dataList.slice(startIndex,endIndex);
                     if(pageData.length==0||this.showDataList.length==this.dataList.length){
                        this.forceUpdate();
                     }else{
                       this.draw=this.draw+1;
                     }
                }
                this.showDataList.push(...pageData);
        },
        //分页加载
    },
    created(){
    },
    mounted(){
    },
    watch:{
        data:function(n,o){
            this.dataList=n;
            if(this.isAdvancePaging){
                //前置分页
                    if(this.dataList.length==0){
                        let filterParams=this.getGlobObject2;
                            if(filterParams.draw<=1){
                                this.showDataList=[];
                            }
                     this.forceUpdate();
                }else{
                     this.showDataList.push(...this.dataList);
                }
              
            }else{
                //后置分页
                this.draw=1;
                this.showDataList=[];
                this.PageChange();
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.nodata
    height 200px
    text-align center 
    font-size 12px
    color $color-dark-grey
    padding-top 80px
    width 100%

</style>