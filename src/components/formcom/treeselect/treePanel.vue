<template>
    <div class="yl-treepanel">
            <div class="none"></div>
            <div class="header">
                <i class="fa fa-th"></i>
                <span class="title">{{Title}}</span>
               
                <cube-button :inline="true" light class="float" style="margin-right:10px"   @click="_hide"> <i class="fa fa-close"></i></cube-button>
                <!-- <cube-button :inline="true" light class="float" style="margin-right:10px"  @click="_reload"> <i class="fa fa-refresh"></i></cube-button> -->
            </div>
            <div class="content">
                <tree-item  ref="treeItem"
                    v-for="(i,index) in treeData" :key="index"
                    :stepByOne="stepByOne"
                    :item="i"
                    :level=0
                    :defaultData="defaultData"
                    :nodeClick="nodeClick"
                >
                </tree-item>
            </div>
    </div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-treepanel'
import baseMixn from '@/mixns/base.js';
import treeItem from './treeItem';
import { mapGetters,mapActions } from 'vuex';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    data(){
        return {
            treeData:[],
            Title:'',

        }
    },
    props:{
      stepByOne:{
          type:Boolean,
          default:true,
      },
      isExpend:{
           type:Boolean,
           default:false,
      },
      defaultData:{ 
          //默认根节点
          type:Object,
          default:function(){
              return {}
          },
      },
      currentText:[String],
      nodeClick:{
            type:Function
        },
    },
    computed:{
         ...mapGetters([ 'getcurrentNode','getcurrentEvent']),
    },
    methods:{
        ...mapActions(['setcurrentNode','setcurrentEvent',]),
       _hide(){
           this.$emit('close');
       },
       _nodeExpend(){
           this.$emit('nodeExpend',this.getcurrentNode)
       },
       _nodeSelect(){
           this.$emit('nodeSelect',this.getcurrentNode);
           this.Title=this.getcurrentNode.text;
           this._hide();
       },
       _reload(){
          // this.$refs.treeItem[0].reload(this.treeData);
       },
       init(){
            if(this.defaultData.id){
               let arr=[];
               arr.push(this.defaultData)
               this.treeData=arr;
            }     
          
        }
    },
    components:{
        treeItem
    },
    beforeMount(){
          this.Title=this.currentText;
    },
    mounted(){
        this.init();
    },
    watch:{
        getcurrentEvent:function(n,o){
            let code=n.split('_')[0];
            if(code==='nodeExpend'){
               this._nodeExpend();
            }else if(code==='nodeSelect'){
                this._nodeSelect();
            }
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-treepanel
    width  100%
    height 100%
    background-color #fff
    font-size $fontsize-small
    text-align left
    .none
        width 600px
        height 0px
    .header
        height 25px
        line-height 25px
        padding 5px
        border-bottom 1px solid $color-col-line
        color $color-blue
        box-sizing content-box
        background-color $color-grey-opacity
        .float
            float right 
            padding-right 10px
            padding-top 5px
    .content
        max-height 600px
        overflow auto

</style>
