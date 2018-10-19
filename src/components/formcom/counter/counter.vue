<template>
<div class="yl-counter">
    <div class="minus btn">
        <cube-button inline light @click="_minus"><i class="fa fa-minus"></i></cube-button>
    </div>
    <div class="inputwarper">
        <input class="input" v-model.number="currentValue" @change="_change" />
    </div>
    <div class="plus btn">
         <cube-button inline light @click="_plus"><i class="fa fa-plus"></i></cube-button>
    </div>
</div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-counter'
import baseMixn from '@/mixns/base.js';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    data(){
        return {
            currentValue:this.value
        }
    },
    props:{
        value:{
            type:Number,
            default:0
        }
    },
    methods:{
        _minus(){
            if(this.currentValue>0){
                this.currentValue-=1;
                this.$emit('input',this.currentValue);
                this.$emit('change',this.currentValue);
            }
        },
        _plus(){
            this.currentValue+=1;
             this.$emit('input',this.currentValue);
             this.$emit('change',this.currentValue);
        },
        _change(){
             if(typeof(this.currentValue)!='number'){
                 this.currentValue='';
             }
             this.$emit('input',this.currentValue);
             this.$emit('change',this.currentValue);
        }
    },
    mounted(){
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-counter
    display flex
    color $color-dark-grey
    width 120px
    .btn
        width 30px
        height 25px
        font-size 20px
        i 
            margin 0px 5px
    .inputwarper
        flex 1
        .input
            width 100%
            height 25px
            text-align center
        
    
</style>
