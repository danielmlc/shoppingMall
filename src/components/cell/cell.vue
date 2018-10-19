
<template>
<div  class="yl-cell" @click="_linkTo()" :class="getClass()">
    <div class="icon" v-if="icon.show"><i :class="icon.value" :style="{ 'color': icon.color}"></i> </div>
    <div class="title" v-if="title.show" :style="{ 'color': title.color,'algin-text':title.algin}">{{title.text}}</div>
    <div class="content" v-if="content.show"  :style="{ 'algin-text':content.algin}" v-html="content.html"></div>
    <div class="link" v-if="isLink"><i class="fa fa-chevron-right"></i></div>
</div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-cell'
export default {
    name:COMPONENT_NAME,
    data(){
        return{
        }
    },
    props:{
        icon:{
            type:Object,
            default:function(){
                return {
                    value:"fa fa-cog",
                    show:true,
                    color:''
                }
            },
            required:false,
        },
        title:{
            type:Object,
            default:function(){
                return {
                    algin:'left',
                    color:'',
                    show:true,
                    text:''
                }
            },
            required:false,
        },
        content:{
            type:Object,
            default:{
                    algin:'right',
                    default:function(){
                        return {
                            algin:'left',
                            show:true,
                            html:''
                        }
                    },
                    show:true,
            },
            required:false,
        },
        isLink:{
            type:Boolean,
            default:false,
            required:false,
        },
        styleConf:{
            type:Object,
            default:function(){
                return {
                    padding:'middle', //top middle bottom alone
                }
            },
            required:false,
        }
    },
    computed:{
     
    },
    methods:{
       _linkTo(){
           this.$emit('linkTo');
       },
       getClass(){
           if(this.styleConf.padding==='top'){return 'cell-top'}
           else if(this.styleConf.padding==='bottom'){return 'cell-bottom'}
           else if(this.styleConf.padding==='alone'){return 'cell-top cell-bottom'}
           else if(this.styleConf.padding==='middle'){return ''}
       }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-cell    
    display flex
    color $color-grey
    background-color $color-white
    height 45px
    line-height 45px
    font-size $fontsize-small
    border-bottom 1px solid $color-light-grey-sss 
    .icon
        flex 1
        text-align right
        font-size $fontsize-large
        padding-right 5px
    .title
        flex 2
    .content
        flex 4
        color $color-light-grey
    .link
        flex 1
.cell-top
    margin-top 10px
.cell-bottom
    margin-bottom 10px       
</style>
