  
<template>
<div class="goodsHandleBar">
          <div class="shouC common" @click="_shouC"><i class="fa fa-star-o"></i></div>
          <div class="cartList common" @click="_showCartList"><i class="fa fa-opencart"></i></div>
          <div class="buyNow btn" @click="_buyNow">立即购买</div>
          <div class="pushCart btn" @click="_pushCart">加入购物车</div>
</div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-goodsHandleBar'
import baseMixn from '@/mixns/base.js';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    methods:{
        _shouC(){

       },
       _showCartList(){
           this.$router.push({path:'/cart'})
       },
       _buyNow(){
           this.$parent.refList.goodsSelect.goodsSelect.showPopup('selectPopup',true)
       },
       _pushCart(){
            this.$parent.refList.goodsSelect.goodsSelect.showPopup('selectPopup',true)
       }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.goodsHandleBar
    height 55px 
    line-height 55px
    display flex
    font-size 18px
    box-sizing border-box
    background-color #fff
    border-top 1px solid $color-col-line
    padding 3px 
    .shouC
        width 45px
    .cartList
        width 45px
    .buyNow
        background $color-blue
    .pushCart
        background $color-orange
    .btn
        flex 1
        color #fff
        margin 5px 10px
        border-radius 2px
        font-size 16px
        text-align center
        line-height 40px
    .common
        text-align center
        line-height 55px
</style>
