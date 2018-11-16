<template>
        <div class="item" :style="{ 'width':width}" @click="_link">
            <div class="pic">
                <img :src="baseUrl+'/'+item[defaultProps.img.name]"  onerror="onerror=null;src='/static/img/nopic.png'" >
            </div>
            <div class="name"  v-if="defaultProps.name" :style="defaultProps.name.style">{{item[defaultProps.name.name]}}</div>
            <div class="price"  v-if="defaultProps.price" :style="defaultProps.price.style">￥ {{item[defaultProps.price.name]}}
                <s class="disCount" v-if="defaultProps.disCount" :style="defaultProps.disCount.style">￥ {{item[defaultProps.discount.name]}}</s>
            </div>
        </div> 
</template>

<script type="text/babel">
const COMPONENT_NAME = 'goodscard'
import baseMixn from '@/mixns/base.js';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    data(){
        return {
                 baseUrl:webappConfig().sysConf.baseUrl+'/Upload'
              }
    },
    props:{
        item:{
            type:Object,
            default:function(){
                return {}
            }
        },
        width:{
            type:String,
            default:'50%'
        },
        defaultProps:{
            type:Object,
            default:function(){
                return {
                    img:'img',
                    name:'name',
                    price:'price', 
                    discounts:'disPrice',
                    discounts:'discounts',
                    subName:'subName'
                }
            }
        },
        linkEvent:{
            type:Function
        }
    },
    methods:{
        _link(){
            if(this.linkEvent){
                this.linkEvent(this,this.item);
            }
            
        }
    },
    mounted(){
        
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.item
    padding 5px
    box-sizing border-box
    font-size 14px
    .pic
        width 100%
        img
            width 100%
    .name
        padding 8px 2px
        font-size 14px
        line-height 22px
        height 16px
        overflow hidden
        color $color-grey
    .price
        font-size 16px
        padding 5px 2px
        color $color-dark-orange
        .disCount
            color $color-grey
            padding-left 5px
        
</style>