
<template>
<div class="message">
                <yl-header 
                    :title="titleName" 
                    theme="dark"
                    ></yl-header>
                <yl-nocontent tip='暂时没有通知消息!'></yl-nocontent>


              
</div>
</template>

<script type="text/babel">
import NoContent from '@/view/tip/NoContent';
export default {
    data(){
        return {
            titleName:this.$route.name,
        }
    },
    components:{
        'yl-nocontent':NoContent
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.message
    background-color $color-white
    height calc(100% - 48px)
</style>
