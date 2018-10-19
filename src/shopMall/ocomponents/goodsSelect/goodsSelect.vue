
<template>
<div class="goodsSelect">
    <div class="selectBar">
        <div class="label">选择</div>
        <div class="content">
            {{selectText}}
        </div>
        <div class="btn" @click="showPopup('selectPopup',true)">
            <i class="fa fa-ellipsis-h"></i>  
        </div>
    </div>
    <cube-popup 
        type="select-popup" 
        :mask="true" 
        :position="'bottom'"
        :mask-closable="true"
        ref="selectPopup">
            <selectPanel v-if="isShow"
                :selectRow="selectRow"
                :attrList="goodsInfo.attrList"
                :goodsList="goodsInfo.goodsList"
                :attrValueList="goodsInfo.attrValueList"
                @getSelectMolde="_getSelectMolde"
                @close="showPopup('selectPopup',false)"
            ></selectPanel>
      
    </cube-popup>
</div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-template'
import baseMixn from '@/mixns/base.js';
import selectPanel from './selectPanel';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    data(){
        return {
            selectRow:{},
            selectText:'',
            isShow:false
        }
    },
    props:{
        goodsInfo:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },
    methods:{
        showPopup(refId,state) {
            const component = this.$refs[refId];
            this.isShow=state;
            if(state){
                component.show();
            }else{
                component.hide();
            }
      },
      getSelect(){
          let Arr=[];
          this.goodsInfo.goodsList.map(data=>{
              if(data.b_Col1){
                  Arr.push(data);
              }
          });
          this.selectRow=Arr[0];
          this._renderText();
         
      },
      _renderText(){
           this.selectText='';
            let i=0;
            for (let index = 3; index < 8; index++) {
              if(this.selectRow['v_Col'+index]){
                  this.selectText=this.selectText+' '+this.goodsInfo.attrList[i].v_Col1+'  ['+this.selectRow['v_Col'+index]+']';
                  i+=1;
              }
           }
      },
      _getSelectMolde(node,num){
          console.log(num)
          this.selectRow=node;
          this._renderText();
      }
    },
    components:{
        selectPanel
    },
    mounted(){
    },
    watch:{
        goodsInfo:function(n,o){
            this.getSelect()
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.selectBar
    display flex
    background $color-white
    padding 10px 
    font-size $fontsize-small
    align-items center
    .label
        color $color-light-grey
        width 40px
    .content
        flex 1
        line-height 18px
    .btn
        width 40px
        color $color-light-grey
        text-align center
</style>
