
<template>
<div>
     <yl-header 
                :left="left"
                :title="titleName" 
                theme="dark"
                @leftEvent="_goUrl()"
    ></yl-header>
 <yl-nocontent tip='暂无内容!'></yl-nocontent>
</div>
</template>

<script type="text/babel">
import NoContent from '@/view/tip/NoContent';
export default {
    data(){
        return {
            titleName:this.$route.name,
            left:{
                text:'',
                icon:'fa fa-home'
            }
        }
    },
    methods:{
        _goUrl(){
            this.goUrl('/home');
        }
    },
    components:{
        'yl-nocontent':NoContent
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
