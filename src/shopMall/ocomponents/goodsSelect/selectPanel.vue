
<template>
<div class="selectPanel">
      <div class="top">
          <div class="img">
              <img :src="imgUrl" alt="">
          </div>
          <div class="info">
              <!-- <div @click="_hide" class="close">
                    <i class="fa fa-close"></i>
              </div> -->
             
              <div class="price">
                    ￥{{selectModel.d_Col1}}
              </div>
              <div class="code">
                   库存 {{selectModel.d_Col2}}
              </div>
          </div>
      </div>
       <cube-scroll
            class="editor"
            ref="scroll"
            :options="options">
                
                <div class="selection">
                    <div class="item" v-for="(item,index) in attrList" :key="index">
                        <p class="name">{{item.v_Col1}}</p>
                        <span class="option" 
                                @click="selectType(item,index,i)"
                                :class="{'actvie':i.v_Col1==selectModel['v_Col'+(index+3)]}" 
                                v-for="(i,iindex) in attrValueList" :key="iindex"
                                v-if="i.o_Col2==item.id" 
                                >
                                {{i.v_Col1}}
                        </span>
                    </div>
                </div>
                <div class="num">数量
                        <yl-counter style="float:right;margin-right:10px"
                            v-model="selectNum"
                        ></yl-counter>
                </div>
                <div class="remark" v-show="selectModel.v_Col15">{{selectModel.v_Col15}}
                </div>
       </cube-scroll>
      <div class="foot">
          <cube-button primary :disabled="isBtnDisable" @click="_conSure">确认</cube-button>
      </div>
</div>
</template>
<script type="text/babel">
const COMPONENT_NAME = 'yl-template'
import baseMixn from '@/mixns/base.js';
import fetch from '@/api/fetch';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    data(){
        return {
            options:{},
            selectModel:{},
            selectNum:1,
            isBtnDisable:false
        }
    },
    computed:{
        imgUrl:{
            get(){
                return webappConfig().sysConf.baseUrl+'/Upload/'+this.selectModel.v_Col8;
            }
        }
    },
    props:{
        goodsList:{
            type:Array,
            default:function(){
                return []
            }
        },
        attrList:{
            type:Array,
            default:function(){
                return []
            }
        },
        attrValueList:{
            type:Array,
            default:function(){
                return []
            }
        },
        selectRow:{
             type:Object,
            default:function(){
                return {}
            }
         }
    },
    methods:{
       _hide(){
           this.$emit('close');
       },
       selectType(item,itemIndex,i){
           //当前选中的属性为过滤的改动属性
            let AttrName='v_Col'+(itemIndex+3);
            const model=Object.assign({},this.selectModel);
            model[AttrName]=i.v_Col1;
            this.goodsList.filter((data,index)=>{
                if(data.v_Col3==model.v_Col3&&data.v_Col4==model.v_Col4&&data.v_Col5==model.v_Col5&&data.v_Col6==model.v_Col6&&data.v_Col7==model.v_Col7){
                    this.selectModel=data;
                    this.selectNum=1;

                }
            })
       },
       _conSure(){
           this.$emit('getSelectMolde',this.selectModel,this.selectNum);
           this._hide();
       }
       
    },
    mounted(){
       this.selectModel=this.selectRow;
    },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.selectPanel
    background #ffffff
    height 460px
    .top
        display flex
        height 110px
        .img
            width 90px
            padding 10px
            img
                width 100%
                height 100%
        .info 
            flex 1
            
            font-size 16px
            color $color-light-grey
            .close
                float right
                font-size 14px
                color $color-grey
            .price
                padding-top 20px
                font-size 22px
                line-height 25px
                color $color-orange
            .code
                padding-top 10px
                font-size 12px
    .editor
        height 280px 
        overflow auto
        .selection
            font-size 14px
            border-top 1px solid $color-col-line
            border-bottom 1px solid $color-col-line
            .item
                padding 10px
                .name
                    color $color-dark-grey
                    height 22px
                .option
                    display inline-block
                    padding 8px 15px
                    background-color $color-light-grey-ss
                    margin 5px
                .actvie
                    border 2px solid $color-dark-grey
        .num
            font-size 14px
            padding 15px 10px
            color $color-dark-grey
        .remark
            border-top 1px solid $color-col-line
            color $color-yellow
            padding 15px 10px
            font-size 14px
    .foot
        height 70px 
        display flex
        padding  15px 10px
        box-sizing border-box
        border-top 1px solid $color-col-line






                

            


        
</style>
