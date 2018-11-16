
<template>
<div class="cart">
        <yl-header 
            :title="titleName" 
            theme="dark"
            ></yl-header>


        <div class="content" v-if="selectgoodsList.length==0">
            <img src="@/../static/img/loginPic/cart.png" alt="">
            <div class="text" v-if="userInfo.user.realName">
                <div class="tip" >购物车空空如也！</div>
                <div class="tip" ><cube-button :inline="true" @click="goUrl('homePage')">随便逛逛</cube-button></div>
            </div>
            <div class="text" v-else>
                 <div class="tip" >未检测到登录信息</div>
                <cube-button :inline="true" style="padding:10px" @click="goUrl('Login')">登 录</cube-button>
            </div>
        </div>      
        <div class="content" v-else>

        </div>

              
</div>
</template>

<script type="text/babel">
export default {
    data(){
        return {
            titleName:this.$route.name,
            selectgoodsList:[],
            userInfo:this.getUserInfo(),
        }
    },
    components:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.cart
    background-color $color-white
    height calc(100% - 48px)
    .content
        height 300px
        width 100%
        text-align center
        img
            padding-top 100px
            width  120px
        .text
            padding-top 20px
            line-height 2
            .tip
                font-size $fontsize-small
                color $color-light-grey
</style>
