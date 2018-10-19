
<template>
<div class="user-info">
        <yl-header 
            :title="titleName" 
            theme="dark"
            ></yl-header>  
        <div class="user-card">
            <div class="portrait">
                <img src="@/common/img/boy.png" alt="" v-if="getSrc()">
                 <img src="@/common/img/girl.png" alt="" v-else>
            </div> 
            <div class="info">
                <p class="name">{{userInfo.user.realName}}</p>
                <p class="role">{{userInfo.user.roleName}}</p>
                <p class="org"><span>{{userInfo.user.manageOrgName}}</span></p>
                </div>      
        </div>

        <div class="user-content">
            <yl-cell v-for="(i,index) in listConf" :key="index"
                :icon=i.icon
                :title=i.title
                :isLink=i.isLink 
                :content=i.content
                :styleConf=i.styleConf
                @linkTo="_goUrl(i.url)"
            ></yl-cell>
            <cube-button :primary="true" class="logout" @click="loginOut()">退出登录</cube-button>
           
        </div>

</div>
</template>

<script type="text/babel">
import baseMixn from '@/mixns/base.js';
export default {
    mixins: [baseMixn],
    data(){
        return {
            titleName:this.$route.name,
            userInfo:this.getUserInfo(),
            listConf:[
                {
                    icon:{
                        value:"fa fa-user-circle",
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
                    url:'/blank',
                    styleConf:{
                        padding:'top'
                    }
                },
                {
                    icon:{
                        value:"fa fa-envelope-o",
                        show:true,
                        color:'#a0b751'
                    },
                    title:{
                        algin:'left',
                        color:'',
                        show:true,
                        text:'反馈意见'
                    },
                    content:{
                        algin:'left',
                        html:'',
                        show:true,
                    },
                    isLink:true,
                    url:'/blank',
                    styleConf:{
                        padding:'top'
                    }
                },
                 {
                    icon:{
                        value:"fa fa-users",
                        show:true,
                        color:'#ff7878'
                    },
                    title:{
                        algin:'left',
                        color:'',
                        show:true,
                        text:'切换角色'
                    },
                    content:{
                        algin:'left',
                        html:'',
                        show:true,
                    },
                    isLink:true,
                    url:'/trunRole',
                    styleConf:{
                        padding:'top'
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
                    url:'/blank',
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
            this.$router.push({path:url})
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
    .user-card
        height 130px
        background-image url(../../common/img/jy.png)
        background-color $color-blue
        background-size 100% 100%
        display flex
        .portrait
            width 120px
            img 
                padding-left 20px
                padding-top 15px
                height 80px
                width 80px
        .info
            flex 1
            padding-top 35px
            color $color-white
            line-height 25px
            .name
                font-size $fontsize-medium
            .role
                font-size $fontsize-small-s
            .org
                font-size $fontsize-small-ss
                span
                    overflow hidden
                    text-overflow ellipsis
                    border 1px $color-background solid
                    padding 2px 

                

    
</style>
