
<template>
    <table  class="yl-table">
        <thead>
             <th  v-for="(i,index) in schema.header" :key="index">
                  {{i.label}}
             </th>
        </thead>
        <tbody>
            <tr>
                <th>Month</th>
                <th>Savings</th>
            </tr>
        </tbody>
     </table>
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
             this.goUrl(url)  
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
            height 20px
            line-height 20px
            .label
                width 120px
                color $color-dark-grey-opacity
            .text
                flex 1
                padding-left 10px
                border-left $color-light-grey-sss solid 1px
                overflow hidden
                text-overflow ellipsis
            .link
                width 120px
    .yl-link
        width 30px

</style>