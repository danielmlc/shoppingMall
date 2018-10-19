
<template>
<div class='login'>
    <yl-header 
        theme="light"
        ></yl-header>   
    <div class="logo">
        <img src="../../../static/img/logo.png" alt="" class="logo-img">
        <p class="title">{{titleName}}</p>
    </div>
    <div class="yl-form">
        
        <div class="item">
            <div class="label">用户名</div>
            <div class="input">
                <cube-input v-model="model.userName" 
                    clearable 
                    focus
                    ></cube-input>
            </div>
        </div>
        <div class="item">
            <div class="label">密  码</div>
            <div class="input">
                <cube-input v-model="model.passWord"
                    clearable
                    type="password" 
                    :eye="eye">
                </cube-input>
                
            </div>
        </div>
        <div class="item btn">
             <cube-button @click="submitHandler">登 录</cube-button>
        </div>
    </div>
    <div class="bottom">
        <p>
            <!-- <span class="zhuce" @click="goUrl('/Registered')">注册账号</span>
            <span class="wangji" @click="goUrl('/RetrievePwd')">忘记密码？</span> -->
        </p>
    </div>
</div>  
</template>

<script type="text/babel">
import baseMixn from '@/mixns/base.js';
export default {
    mixins: [baseMixn],
    data(){
        return {
            titleName:webappConfig().sysConf.titleName,
            model:{
                userName: '',
                passWord: '',
            },
            eye:{
                    'open':false,
                    "reverse":false
                }
        }
    },
    methods:{
         _initlogin(){
					 if(this.utilObject.getCookie('ylClientId')===''){
						this.utilObject.setCookie('ylClientId',this.utilObject.newGuid(false),1);
					 }
		},
        submitHandler(e){
            //执行登录方法
            if(this.model.userName===''){
                 this.Console('warn','用户名不能为空！');
                return false
            }
            if(this.model.passWord===''){
                 this.Console('warn','密码不能为空！');
                 return false
            }
            let _this=this;
            let LoginForm={
                userName: this.model.userName,
                passWord: '',
                grant_type:'password',
                ylClientId:'',
                loginType:0
            }
            const toast = this.$createToast({
                time: 0,
                txt: '登录中..'
            })
            toast.show()
            LoginForm.ylClientId=this.utilObject.getCookie('ylClientId');
            LoginForm.passWord=this.utilObject.jsEncrypt(this.model.passWord);
            this.fetchObject({
                url:"/Token",
                method:"post",
                data:LoginForm
            },{
                baseURL:'',authorization:this.utilObject.getDefaultToken(),formatData:true
            }).then(data => {
                let result=data;
                if(result.error!==undefined){
                    if(result.error==="InvalidUserName"){
                        this.Console('warn','用户名输入有误！');
                    }else if(result.error==="InvalidPassword"){
                         this.Console('warn','密码输入有误！');
                    }else if(result.error==="InvalidOrgId"){
                         this.Console('warn','用户没有授权权限范围！');
                    }else if(result.error==="InvalidRoleId"){
                         this.Console('warn','用户没有授权角色！');
                    }else{
                         this.Console('error','登录有误');
                    }
                    LoginForm.passWord='';
                }else{
                    if(result.access_token!==""){
                        this.utilObject.setLogin(result.access_token);
                        this.fetchObject({ 
                                url: '/api/services/app/session/GetCurrentLoginInformations',
                                method: 'post',
                                data: ''
                            }).then(
                                data=>{
                                    if(data.success){
                                        this.utilObject.setCookie('userInfo',JSON.stringify(data.result),1);
                                        this.Console('success','登录成功，欢迎您！');
                                        this.$router.replace('/Home');
                                    }
                        });
                    } else {
                       this.Console('error','登录失败！');
                        LoginForm.passWord='';
                    }
                }
                 toast.hide()
            }).catch(function(err){
                LoginForm.passWord='';
                toast.hide()
            })
        },
        validateHandler(result){
        }
    },
    mounted(){
        this._initlogin()
       
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.logo
    text-align center 
    .logo-img
        height 85px
        wight 85px
        padding-top 50px
    .title
        font-size $fontsize-medium
        color $color-blue
        font-weight 500
.yl-form
    padding 45px 25px 0px 25px 
    font-size $fontsize-medium
    color $color-grey
    .item
        display flex
        margin-top 10px
        align-items center 
        .label
            width 65px
            text-align right 
            padding-right 10px
        .input
            flex 1
    .btn
        padding 0px
.bottom
    margin-top 40px
    font-size $fontsize-small-s
    color $color-grey
    text-align center
    p>.wangji
        padding-left 15px


</style>