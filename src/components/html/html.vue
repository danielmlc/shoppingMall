
<template>
<div class="yl-html" >
    <div class="content"  v-html="html">
    </div>
    <div class="link" v-show="link.isShow" @click="_goUrl()">
        <i class="fa fa-angle-double-right"></i>
    </div>
</div>
 
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-html'
export default {
    name:COMPONENT_NAME,
    data(){
        return {
            
        }
    },
    props:{
       html:{
          type:String,
           default:''
       },
       link:{
           type:Object,
           default:function(){
               return {}
           }
       },
       item:{
              type:Object,
                default:function(){
                    return {}
                }
        }, 
    },
    methods:{
         _goUrl(url){ 
             if(this.link.linkFunc!=undefined){
                 if(this.link.linkFunc.isOn){
                     this.link.linkFunc.event(this,this.link)
                 }
             }else{
                  this.goUrl(this.link.url)  
             }
            
         },
         

    },
    beforeMount(){
    },
    mounted(){
     
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-html
    display flex
    background-color $color-white 
    font-size $fontsize-small
    align-items center
    .content
        flex 1
    .link
        width 30px
</style>
