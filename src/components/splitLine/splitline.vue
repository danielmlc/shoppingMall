
<template>
<div class="splitLine">
    <div class="line"><div class="up div"></div><div class="div"></div></div>
    <div class="text">{{text}}</div>
    <div class="line"><div class="up div"></div><div class="div"></div></div>

</div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-template'
import baseMixn from '@/mixns/base.js';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    props:{
        text:{
            type:String,
            default:''
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.splitLine
    display flex
    flex-direction row
    padding  10px
    margin auto
    .line
        flex 1
        height 25px
        line-height 25px
        .div
            height 12px
        .up
            border-bottom 1px solid $color-light-grey
    .text
        font-size 14px
        height 15px
        line-height 15px
        padding 5px 10px
        width auto
</style>