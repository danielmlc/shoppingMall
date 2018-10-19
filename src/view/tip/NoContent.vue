
<template>
<div class="yl-noContent">
                <div class="content">
                    <img src="@/../static/img/Nomessage.png" alt="">
                    <div class="text">
                        <div class="tip" >{{tip}}</div>
                    </div>
                </div>
</div>
</template>

<script type="text/babel">
export default {
    data(){
        return {
        }
    },
    props:{
        tip:{
            type:String,
            default:''
        }
    },
    methods:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-noContent
    background-color $color-white
    height calc(100% - 48px)
    .content
        height 300px
        width 100%
        text-align center
        img
            padding-top 100px
            height 80px
            width  170px
        .text
            padding-top 20px
            line-height 2
            .tip
                font-size $fontsize-small
                color $color-light-grey
</style>
