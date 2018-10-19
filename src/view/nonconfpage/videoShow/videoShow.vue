
<template>
      
    <div class="main">
        <yl-header 
            :left="left"
            :title="titleName" 
            theme="dark"
            @leftEvent="_leftEvent"
            ></yl-header>   
        <div class="info">
           <p class="name">项目名称：{{itemData.v_Col6}}</p>
            <p class="name">设备名称：{{itemData.v_Col10}}</p>
            <p class="name">设备序号：{{itemData.v_Col11}}</p>
            <p class="name">设备通道：{{itemData.v_Col12}}</p>
        </div>
        <video :id="itemData.id" class="video" poster="" controls playsInline webkit-playsinline autoplay>
                <source :src="itemData.v_Col8" type="rtmp/flv" />
                <source :src="itemData.v_Col9" type="application/x-mpegURL" />
        </video>
                 
    </div>
</template>

<script type="text/babel">
import { mapGetters,mapActions } from 'vuex';
import ezuikit from '@/../static/plugin/ezuikit1.4/ezuikit'
export default {
    data(){
        return {
            titleName:this.$route.name,
            OrgName:"",
            itemData:{},
            left:{
                text:'返回',
                icon:'fa  fa-chevron-left'
            },
        }
    },
    props:{

    },
    computed:{
         ...mapGetters([ 'getGlobObject1','getGlobObject2','getGlobString1','getGlobString2','getGlobArray1']),
    },
    methods:{
        ...mapActions(['setGlobObject1','setGlobObject2','setGlobString1','setGlobString2','setGlobalArray1']),
        _leftEvent(){
            this.$router.go(-1)
        },
    },
    beforeMount(){
        this.itemData=this.getGlobObject1;
    },
    mounted(){
        new ezuikit(this.itemData.id);
    },
    components:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.main
    .video
        width 100%
    .info
        color $color-green
        padding 10px
        margin 10px
        background-color rgba($color-green,0.3)
        font-size $fontsize-small
        line-height 20px

</style>


