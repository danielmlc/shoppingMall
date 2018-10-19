 
<template>
    <cube-slide ref="slide" 
        :data="options.data"
        :initialIndex="options.initialIndex" 
        :loop="options.loop" 
        :showDots="options.showDots" 
        :autoPlay="options.autoPlay" 
        :interval="options.interval"
        :direction="options.direction"
        :threshold="options.threshold"
        :options="options.options" 
        @change="_changePage">
        <cube-slide-item v-for="(item, index) in options.data" :key="index" @click.native="_clickHandler(item, index)">
            <div class="slide_item" v-html="item">
            </div>
        </cube-slide-item>
    </cube-slide>
</template>

<script type="text/babel">
export default {
    data(){
        return{
        }
    },
    props:{
        options:{
            type:Object,
            default:function(){
                return {
                    data:[],
                    initialIndex:0,
                    loop:true,
                    showDots:true,
                    autoPlay:true,
                    interval:4000,
                    direction:'horizontal',
                    threshold:0.3,
                    options:{}
                }
            },
        }
    },
    methods:{
        _changePage(index){
            this.$emit('changePage',index)
        },
        clickHandler(item, index){
             this.$emit('clickPage',item,index)
        }
    },
    mounted(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
