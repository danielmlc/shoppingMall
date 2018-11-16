
<template>
<div class="user-info">
        <yl-header 
            title="个人中心" 
            theme="dark"
           
            ></yl-header>  
        <div class="user-card">
            <div class="portrait">
                <img src="@/common/img/boy.png" alt="" v-if="getSrc()">
                 <img src="@/common/img/girl.png" alt="" v-else>
            </div> 
            <div class="info">
                    <p class="name" v-if="userInfo.user.realName">{{userInfo.user.realName}}</p>
                    <p class="name" v-else @click="_goUrl('Login')">登录/注册></p>
                </div>      
        </div>

        <div class="user-content"  >
            <yl-cell v-for="(i,index) in listConf" :key="index"
                :icon=i.icon
                :title=i.title
                :isLink=i.isLink 
                :content=i.content
                :styleConf=i.styleConf
                @linkTo="_goUrl(i.url)"
            ></yl-cell>
            <cube-button :primary="true" class="logout" @click="loginOut()" v-if="userInfo.user.realName">退出账号</cube-button>
            <cube-button :primary="true" class="logout" @click="goUrl('Login')"  v-else>登录账号</cube-button>
           
        </div>

</div>
</template>

<script type="text/babel">
import baseMixn from '@/mixns/base.js';
export default {
    mixins: [baseMixn],
    data(){
        return {
            userInfo:this.getUserInfo(),
            listConf:[
                {
                    icon:{
                        value:"fa fa-file-text-o",
                        show:true,
                        color:'#ffba42'
                    },
                    title:{
                        algin:'left',
                        color:'',
                        show:true,
                        text:'我的订单'
                    },
                    content:{
                        algin:'left',
                        html:'',
                        show:true,
                    },
                    isLink:true,
                    url:'/homePage',
                    styleConf:{
                        padding:'top'
                    }
                },
                {
                    icon:{
                        value:"fa fa-gift",
                        show:true,
                        color:'#ffba42'
                    },
                    title:{
                        algin:'left',
                        color:'',
                        show:true,
                        text:'优惠卷'
                    },
                    content:{
                        algin:'left',
                        html:'',
                        show:true,
                    },
                    isLink:true,
                    url:'/homePage',
                    styleConf:{
                        padding:'top'
                    }
                },
                 {
                    icon:{
                        value:"fa fa-map-o",
                        show:true,
                        color:'#ffba42'
                    },
                    title:{
                        algin:'left',
                        color:'',
                        show:true,
                        text:'收货地址'
                    },
                    content:{
                        algin:'left',
                        html:'',
                        show:true,
                    },
                    isLink:true,
                    url:'/homePage',
                    styleConf:{
                        padding:'top'
                    }
                },
                 {
                    icon:{
                        value:"fa fa-users",
                        show:true,
                        color:'#ffba42'
                    },
                    title:{
                        algin:'left',
                        color:'',
                        show:true,
                        text:'关于我们'
                    },
                    content:{
                        algin:'left',
                        html:'',
                        show:true,
                    },
                    isLink:true,
                    url:'/homePage',
                    styleConf:{
                        padding:'alone'
                    }
                },
                {
                    icon:{
                        value:"fa fa-cog",
                        show:true,
                        color:'#2973a2'
                    },
                    title:{
                        algin:'left',
                        color:'',
                        show:true,
                        text:'设  置'
                    },
                    content:{
                        algin:'left',
                        html:'',
                        show:true,
                    },
                    isLink:true,
                    url:'/homePage',
                    styleConf:{
                        padding:'alone'
                    }
                },
            ]
        }
    },
    methods:{
        getSrc(){
            if(this.userInfo.user.gender!=='女'){
                return true
            }else{
                return  false
            }
        },

        _goUrl(url){
            if(this.userInfo.user.realName){
                this.$router.push({path:url})
            }else{
                const toast = this.$createToast({
                                    time: 1000,
                                    type:'warn',
                                    txt: '请登录...'
                                    })
                toast.show()
            }
            
        },
        loginOut(){
                this.$createDialog({
                    type: 'confirm',
                    icon: 'cubeic-alert',
                    title: '提示',
                    content: '确认退出系统吗?',
                    confirmBtn: {
                    text: '确定',
                    },
                    cancelBtn: {
                    text: '取消',
                    },
                    onConfirm: () => {
                        //清空 localstorage、cookie
                        
                        this.utilObject.resetLogin();
                        this.$router.replace('/login');
                    },
                    onCancel: () => {
                    }
                }).show()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.user-info
    background-color $color-background
    height calc(100% - 48px)
    display flex
    flex-direction column
    .user-card
        height 90px
        background-color $color-blue
        background-size 100% 100%
        display flex
        .portrait
            width 120px
            img 
                padding-left 50px
                padding-top 15px
                height 60px
                width 60px
        .info
            flex 1
            padding-top 35px
            color $color-white
            line-height 25px
            .name
                font-size $fontsize-medium
    .user-content
        flex 1
        overflow auto
                

    
</style>
