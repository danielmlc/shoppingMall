
<template>
<div class="yl-card">
    <div class="yl-list-card">
        <div class="list-item" 
            v-for="(i,index) in schema.header" :key="index">
            <div class="label">{{i.label}}</div>
            <div class="text">{{item[i.name]}}</div>
        </div>
    </div>
    <div class="link" v-show="schema.link.isShow" @click="_goUrl()">
        <i class="fa fa-caret-right"></i>
    </div>
</div>
</template>

<script type="text/babel">
export default {
    data(){
        return  {
            items:[]
        }
    },
    props:{
        schema:{
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
             if(this.schema.link.linkFunc!=undefined){
                 if(this.schema.link.linkFunc.isOn){
                     this.schema.link.linkFunc.event(this,this.schema.link)
                 }
             }else{
                  this.goUrl(this.schema.link.url)  
             }
            
        },
    },
    created(){
    },
    mounted(){

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-card
    display flex
    padding 10px
    background-color $color-white 
    font-size $fontsize-small
    border-bottom $color-light-grey-sss solid 1px
    align-items center
    .yl-list-card
        flex 1
        display flex
        box-sizing border-box
        flex-direction row
        flex-wrap wrap
        .list-item
            box-sizing border-box
            width 100%
            display flex
            flex-wrap nowrap
            min-height 20px
            line-height 20px
            .label
                width 120px
                color $color-dark-grey-opacity
            .text
                flex 1
                padding-left 10px
                border-left $color-light-grey-sss solid 1px
            .link
                width 120px
    .yl-link
        width 30px

</style>