
<template>
<div class="yl-div" :style="styleConf">
    <slot >
    </slot>
</div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-div'
export default {
    name:COMPONENT_NAME,
    data(){
        return {
        }
    },
    props:{
       styleConf:{
           type:Object,
           default:function(){
               return {}
           }
       }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
