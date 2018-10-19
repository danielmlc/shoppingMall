
<template>
<div class="grid"
>
    <div class="grid-item "  :class="getborder()"  :style="{ 'width':width}"  
         v-for="(i,index) in  itemList" :key="index"
        @click="_goUrl(i.url)"
    >
        <div class="icon-warp" >
            <img class="icon" :src="getimgUrl(i.imgUrl)" :alt="i.title" >
         </div>
         <p class="label">
             <span>{{i.title}}</span>
         </p>
    </div>
</div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-grid'
export default {
    name:COMPONENT_NAME,
    data(){
        return {

        }
    },
    computed:{
        width:{
            get(){
                if(this.columnNum<=0){
                    this.columnNum=1;
                }
                return 100/this.columnNum+'%'
            }
        }
    },
    props:{
        itemList:{
            type:Array,
            default:function(){
                return [
                  
                ]
            },
        },
        border:{
                type:Boolean,
                default:false
        },
        columnNum:{
            type:Number,
            default:1,
            required:false,
        }
    },
    methods:{
        getimgUrl(name){
            if(!name){
                name='grid-img.png'; 
            }
           return  '@/../static/img/'+name;
        },
        _goUrl(url){ 
             this.goUrl(url)  
        },
        getborder(){
           return this.border?'grid-item-border':''
        }

    },
    mounted(){

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.grid
    background-color $color-white
    position relative
    width 100%
    height auto
    overflow hidden
    display flex
    flex-wrap wrap
    padding 5px
    box-sizing border-box
    .grid-item
        box-sizing border-box
        padding 10px
        .icon-warp
            width 100%
            height 35px
            text-align center
            .icon 
                width 35px
                height 35px
        .label
            text-align center
            margin-top 10px
            font-size $fontsize-small-s
    .grid-item:hover
        background-color $color-background
    .grid-item-border
        border-bottom 1px solid $color-light-grey-sss
            
</style>