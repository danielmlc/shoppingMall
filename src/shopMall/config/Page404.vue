
<template>
<div class="yl-404">
            <yl-header 
                :title="titleName" 
                theme="light"
                @leftEvent="_goBack"
                ></yl-header> 
                <div class="content">
                    <img src="@/../static/img/loginPic/404.png" alt="">
                    <div class="text">
                        <div class="title">Opps！你访问的页面不存在。</div>
                        <div class="tip" @click="_goUrl()">返回首页？</div>
                    </div>
                </div>
</div>
</template>

<script type="text/babel">
export default {
    data(){
        return {
            titleName:this.$route.name,
           
        }
    },
    methods:{
        _goUrl(){
             this.$router.push({path:'/homePage'})
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-404
    background-color #F6F6F6
    height 100% 
    .content
        height 400px
        width 100%
        text-align center
        img
            padding-right 20px
            width  100%
        .text
            padding-top 20px
            line-height 2
            .title
                font-size $fontsize-large
            .tip
                font-size $fontsize-small
                color $color-light-orange
</style>
