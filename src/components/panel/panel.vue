
<template>
<div class="panel" :style="styleConf">
    <div class="header" v-if="titleConf">
        <div class="title" v-if="titleConf.title"> 
            <i :class="titleConf.title.icon"></i>{{titleConf.title.text}}
         </div>
        <div class="subtitle"  v-if="titleConf.subtitle">{{titleConf.subtitle.text}}</div>
        
          <div class="tool" v-if="titleConf.tool">
            	<a  v-if="titleConf.tool.link" @click="_linkUrl"><i :class="titleConf.tool.link.icon"></i></a>
          </div>
    </div>
    <div class="content">
        <slot>
        </slot>
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
        styleConf:{
            type:Object,
            default:function(){
               return {}
           }
        },
        titleConf:{
            type:Object,
            default:function(){
                return {
                    title:{
                        text:'',
                        icon:''
                    },
                    subtitle:{
                        text:'',
                    },
                    tool:{
                        link:{
                            icon:'fa  fa-chevron-right',
                            url:''
                        }
                    }
                }
            }
        }
    },
     methods:{
         _linkUrl(){
              this.goUrl(titleConf.tool.link.url)  
         }
         
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.panel
    background $color-white
    box-shadow 0px 5px 6px rgba(0, 0, 0, .1)
    display flex
    flex-direction column
    box-sizing border-box
    .header
        height 30px
        padding 0 10px
        box-sizing border-box
        border-bottom 1px  $color-light-grey-ss solid
        line-height 30px
        text-align left 
        font-size $fontsize-small-s
        color $color-light-grey-s
        display flex
        .title
            font-size $fontsize-small
            color $color-dark-grey
            flex 2
        .subtitle
            overflow hidden
            text-overflow ellipsis
            flex 6
        .tool
            flex 1
            text-align right
    .content
        flex 1
        width 100%
        overflow auto



</style>
