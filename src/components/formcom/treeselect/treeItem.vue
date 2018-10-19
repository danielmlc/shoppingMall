
<template>
    <div class="tree-item" >
        <div class="item" >
                <cube-loading  :size="14" class="loading" v-show="loading"></cube-loading>
                <div class="label" @click.stop="nodeSelect(item)">
                    <i class="fa fa-folder-o icon" v-show="!isExpend" v-if="!isLeaf"></i>
                    <i class="fa fa-folder-open-o icon" v-show="isExpend" v-if="!isLeaf"></i>
                    <i class="fa fa-file-o icon" v-show="isLeaf"></i> 
                    {{item.text}}</div>
                <div class="expend" @click.stop="nodeExpend(item)" v-if="!isLeaf">
                    <i class="fa fa-angle-right icon" v-show="!isExpend"></i>
                    <i class="fa fa-angle-down icon" v-show="isExpend"></i>
                </div>
        </div>
        <div class="children" v-show="isExpend">
                 <tree-item v-for="(i,index) in treeData" :key="index"
                    :stepByOne="stepByOne"
                    :item="i"
                    :level="Level"
                    :nodeClick="nodeClick"
                    >
                </tree-item>
        </div>
  </div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'tree-item'
import baseMixn from '@/mixns/base.js';
import treeItem from './treeItem';
import { mapGetters,mapActions } from 'vuex';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    data(){
        return {
            treeData:[],
            Level:0,
            loading:false,
            isExpend:false,
            isLeaf:false,
            isLoad:false,
        }
    },
    props:{
        stepByOne:{
          type:Boolean,
          default:true,
        },
        item:{
            type:Object,
            default:function(){
                return {}
            }
        },
        defaultData:{ 
          //默认根节点
          type:Object,
          default:function(){
              return {}
          },
        },
        nodeClick:{
            type:Function
        },
        level:{
            type:Number
        },
    },
    computed:{
         ...mapGetters([ 'getcurrentNode','getcurrentEvent']),
    },
    methods:{
         ...mapActions(['setcurrentNode','setcurrentEvent',]),
        nodeExpend(node){
            this.isExpend=!this.isExpend;
            if(!this.isLoad){
                 this.getData(node);
            }
            this.setcurrentEvent('nodeExpend_'+this.utilObject.newGuid());
            this.setcurrentNode(node);
        },
        nodeSelect(node){
            this.setcurrentEvent('nodeSelect_'+this.utilObject.newGuid());
            this.setcurrentNode(node);
        },
        getData(node){
            if(this.stepByOne){
               this.loading=true;
               this.nodeClick(node,this);
            }else{
            }
        },
        reload(){
            // const toast = this.$createToast({
            //     txt: '刷新中...',
            //     type: 'loading',
            //     mask:true
            // })
            // toast.show()
            //  this.getData(this.defaultData);
            //  this.Level=1;
        },
       init(){
           if(this.level===0){
               this.nodeExpend(this.item);
           }
           this.Level=this.level+1;
       }
    },
    components:{
        treeItem
    },
    mounted(){
        this.init();
    },
    watch:{
        treeData:function(n,o){
            this.loading=false;
            this.isLoad=true;
            n.length>0?this.isLeaf=false:this.isLeaf=true;
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.tree-item
    height auto 
    width 100%
    .item
        height 25px
        line-height 25px
        padding 5px
        padding-left 10px
        border-bottom 1px solid $color-col-line
        color $color-dark-grey
        box-sizing content-box
        display flex
        align-items center
        .loading
            width 20px
        .label
            flex 1
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .expend
            width 30px
            text-align center
    .children
        height auto 
        padding-left 10px
    
        
    .icon
        color $color-blue
</style>
