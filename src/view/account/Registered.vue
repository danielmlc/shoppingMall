
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
            <div class="label">手机号码</div>
            <div class="input">
                <cube-input v-model="model.phoneNum" 
                    clearable 
                    focus
                    ></cube-input>
            </div>
        </div>
        <div class="item">
            <div class="label">验证码</div>
            <div class="input" style="display:flex">
                <cube-input v-model="model.code" style="width:55%;flex:1"
                    clearable>
                </cube-input>
                <cube-button 
                    :inline="true" 
                    :disabled="codeBtn.disabled"  
                    :light="true" 
                    @click="_getCode">{{codeBtn.text}}
                </cube-button>
            </div>
        </div>
        <div class="item btn">
             <cube-button @click="submitHandler">下一步</cube-button>
        </div>
    </div>
    <div class="bottom">
        <p>
            <span class="zhuce" @click="goUrl('/Login')">已有账号 直接登录</span>
        </p>
    </div>
</div>  
</template>

<script type="text/babel">
import baseMixn from '@/mixns/base.js';
import axios from 'axios';
import qs from 'qs';
export default {
    mixins: [baseMixn],
    data(){
        return {
            titleName:webappConfig().sysConf.titleName,
            model:{
                phoneNum: '',
                code: '',
            },
            codeBtn:{
                text:"获取验证码",
                disabled:false
            },
            codeV:""
        }
    },
    methods:{
        _getCode(){
            let _this=this;
           if(this.model.phoneNum===''){
                 this.Console('warn','手机号不能为空！');
                return false
            }
            var  reg = /^1\d{10}$/;
            if(!reg.test(this.model.phoneNum)){
                this.Console('warn','手机号格式不正确！');
                return false
            }

            //开始计数
            this.codeBtn.disabled=true;
            var time = 120;   
            var timer = setInterval(fade, 1000); 
            function fade(){
                time--;
                if(time>=0) {
                    _this.codeBtn.text = time + "s后重新发送";
                }else{
                    _this.codeBtn.text = "重新发送验证码";
                    _this.codeBtn.disabled = false;    //倒计时结束能够重新点击发送的按钮
                    clearTimeout(timer);    //清除定时器
                    time = 120;   //设置循环重新开始条件
                }
            }
            //生成随机码
            let codeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            let length = 6;
            for (let i = 0; i < length; i++) {
                let randomI = Math.floor(Math.random() *10);
                this.codeV += codeArr[randomI];
            }
             //调用短信验证接口
             let params={
                 mobile:this.model.phoneNum,
                 paras:this.codeV+",2",
                 sign:"消息通",
                 tpid:"009"
             };
            const instance = axios.create({
                baseURL: 'http://cowsms.market.alicloudapi.com',
                headers: { 'Authorization':'APPCODE ca8325768b294e01aa5b74a6dddea06a'}
            });
            params=qs.stringify(params)   
            instance({
                url:"/intf/smsapi?"+params,
                method:"get"
             }).then(function(data){
             })

        },
         _initlogin(){
					 if(this.utilObject.getCookie('ylClientId')===''){
						this.utilObject.setCookie('ylClientId',this.utilObject.newGuid(false),1);
					 }
		},
        submitHandler(e){
            //执行登录方法
            if(this.model.phoneNum===''){
                 this.Console('warn','手机号不能为空！');
                return false
            }
            var  reg = /^1\d{10}$/;
            if(!reg.test(this.model.phoneNum)){
                this.Console('warn','手机号格式不正确！');
                return false
            }
            if(this.model.code===''){
                 this.Console('warn','验证码不能为空！');
                 return false
            }
            if(this.codeV!==this.model.code){
                this.Console('warn','验证码输入有误！');
                 return false
            }
            let _this=this;
            _this.goUrl('/RegisteredConfim?phoneNum='+this.model.phoneNum);
        },
        _getSonSysInfo(orgid){
            //获取子系统信息
            let _this=this;
            _this.fetchObject({
                url:'/api/services/app/singleTable75/getMainObjectForEdit',
                method:'post',
                data:{
                    queryConditionItem:[
                        {   dataField:'OrgId',
                            op:'EQ',
                            dataValue:orgid
                        }
                    ]
                 }
             }).then(data=>{
                 if(data.success){
                     if(data.result.order){
                          _this.utilObject.setCookie('sonSysIP',data.result.order.v_Col7);
                         let params={queryConditionItem:[{dataField:'Name',op:'EQ',dataValue:'IO_v8'}]};
                         _this.forceSqlExcute({
                                    baseUrl:data.result.order.v_Col7,
                                    url:'/api/services/app/globConfig/getMainObjectForEdit',
                                    method:"post",
                                    data:params
                             }).then(data=>{
                                    let result=JSON.parse(data);
                                    _this.utilObject.setCookie('sonSysOrgId',result.result.globConfig.sO_Col16);
                             }).catch(err=>{
                                    console.log(err);
                             })
                     }else{
                        _this.utilObject.removeCookie('sonSysIP');
                        _this.utilObject.removeCookie('sonSysOrgId');
                     }
                 }
             }).catch(err=>{
                 console.log(err);
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