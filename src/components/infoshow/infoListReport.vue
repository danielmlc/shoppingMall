
<template>
<div class="yl-list-report">
    <div class="head">
        <div class="title" v-if="schema.head">
            <span class="name"><i :class="schema.head.icon.class" :style="schema.head.icon.style"></i>{{item[schema.head.name]}}</span>
            <span class="subtitle">{{item[schema.head.subtitle]}}</span>
        </div>
    </div>
    <div class="body">
        <div class="title" v-if="schema.title.html">
            <div class="name" v-html="html()"></div>
        </div>
         <div class="title" v-if="schema.title.name">
            <p class="name"><i :class="schema.title.icon.class" :style="schema.title.icon.style"></i>{{item[schema.title.name]}}</p>
            <p class="subtitle">{{item[schema.title.subtitle]}}</p>
        </div>
        <div class="main" v-if="schema.main">
            <div class="item-warper" v-for="(i,index) in schema.main" :key="index" :style="{ 'width':i.width}"  >
                <div class="piont" v-if="i.color">
                    <div class="yl-point" :style="{ 'background':i.color}"></div>
                </div>
                <div class="item" >
                    <div class="text"  v-html="format(i)"></div>
                    <div class="label"  >{{i.label}}</div>
                </div>
            </div>
         </div>
        <div class="show" v-if="schema.more.length" @click.prevent="_show()">
            <i :class="showIcon"></i>
        </div>
    </div>
    <div class="more" v-show="isShow" v-if="schema.more">
        <div class="yl-list-more">
            <div class="list-item" 
                v-for="(i,index) in schema.more" :key="index" :style="{ 'width':i.width}">
                <div class="label">{{i.label}}</div>
                <div class="text" v-html="format(i)"></div>
            </div>  
        </div> 
    </div>
    <div class="foot"  v-if="schema.foot" >
        <div class="sumblock"  v-if="schema.foot.sumBlok">
            <div class="item" v-for="(i,index) in schema.foot.sumBlok" :key="index" :style="{ 'width':i.width}">
                    <div class="text"  v-html="format(i)"></div>
                    <div class="label"  >{{i.label}}</div>
             </div>
        </div>
        <div class="linklist"  v-if="schema.foot.linkLsit">
             <cube-button v-for="(i,index) in schema.foot.linkLsit" :key="index"
                class="link" 
                :inline="true" 
                light
                @click.prevent="_linkto(i)"> 
                {{i.text}}
                <i :class="i.icon"></i>
          </cube-button>
        </div>
    </div>
</div>
</template>

<script type="text/babel">
import baseMixn from '@/mixns/base.js';
export default {
    mixins: [baseMixn],
     data(){
        return  {
            isShow:false,
            showIcon:'fa fa-angle-double-down'
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
         format(i){
                if(i.format!==undefined){
                    return i.format(this.item[i.name],this.item)
                }else{
                    return this.item[i.name]
                }
            },
         html(){
             if(this.schema.title.html){
                 return this.schema.title.html(this);
             }
         },
        _linkto(i){ 
            if(i.link){
                   i.link(i,this);
            }
        },
        _show(){
            if(this.isShow){
                this.isShow=false;
                this.showIcon='fa fa-angle-double-down';
            }else{
                this.isShow=true;
                 this.showIcon='fa fa-angle-double-up'
            }
        }
    },
    created(){
    },
    mounted(){
        if(this.schema.isExpend){
            this.isShow=true;
            this.showIcon='fa fa-angle-double-up'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-list-report
    padding 10px
    background-color $color-white 
    font-size $fontsize-small
    border-bottom $color-light-grey-sss solid 1px
    .head
        .title
            text-align left
            padding 3px 5px
            line-height 25px
            background rgba($color-light-grey,0.2)
            .name
                font-size $fontsize-medium
                color $color-blue
            .subtitle
                font-size $fontsize-small-s
                color $color-light-grey
                padding-top 5px
    .body
        display flex
        align-items center
        .title
            text-align center
            padding-right 5px
            flex 1
            .name
                font-size $fontsize-medium
            .subtitle
                font-size $fontsize-small-s
                color $color-light-grey
                padding-top 5px
        .main
            flex 2
            display flex
            flex-wrap wrap
            padding 5px
            .item-warper
                display flex
                box-sizing border-box
                align-items center
                width 50%
                height 40px
                .piont 
                    width 20px
                    text-align right
                .item
                    flex 1  
                    .label
                        font-size $fontsize-small-s
                        color $color-light-grey
                        padding-top 5px
                        white-space nowrap
                    .text
                        white-space normal
                        word-break break-word

        .show
            width 30px
            text-align center
            padding 5px 0px
    .more
        display flex
        background-color $color-white 
        font-size $fontsize-small
        align-items center
        border-top $color-light-grey-sss dotted  1px
        .yl-list-more
            flex 1
            display flex
            box-sizing border-box
            padding 10px
            flex-direction row
            flex-wrap wrap
            .list-item
                box-sizing border-box
                width 100%
                display flex
                min-height 20px
                line-height 20px
                .label
                    width 30%
                    font-size $fontsize-small-s
                    color $color-light-grey
                    white-space nowrap
                .text
                    flex 1
                    padding-left 10px
                    white-space normal
                    word-break break-word
    .foot
        border-top $color-light-grey-sss solid 1px
        display flex
        align-items center
        padding 5px 
        padding-bottom 0px 
        .sumblock
            flex 1
            display flex
            box-sizing border-box
            flex-direction row
            flex-wrap wrap
            .item
                box-sizing border-box
                flex-wrap nowrap
                align-items center
                text-align center
                padding 5px 0px
                .label
                    font-size $fontsize-small-s
                    color $color-light-grey
                    padding-top 3px
        .linklist
            text-align right
            .link
                margin 0px 5px
            
            
</style>