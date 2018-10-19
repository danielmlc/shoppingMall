
<template>
<div class="trunRole">
    <yl-header 
            :left="left"
            :title="titleName" 
            theme="dark"
            @leftEvent="_goUrl()"
    ></yl-header>
    <div class="yl-form">
        <cube-select class="item"
            v-model="formModel.orgId"
            placeholder="请选择权限范围"
            title='权限范围'
            :options="orgList">
        </cube-select>
        <cube-select class="item"
            v-model="formModel.roleId"
            placeholder="请选择角色"
            title='角色'
            :options="roleList">
        </cube-select>
        <cube-button class="item"
         @click="_goSystem"
         primary
         > <i class="fa fa-retweet"></i>
         转化</cube-button>
    </div>
</div>
</template>

<script type="text/babel">
import baseMixn from '@/mixns/base.js';
export default {
    mixins: [baseMixn],
     data(){
        return {
            roleList:[],
            orgList:[],
            titleName:this.$route.name,
            left:{
                text:'返回',
                icon:'fa fa-chevron-left'
            },
            formModel:{
                orgId:"",
                roleId:""
            },
        }
    },
    computed:{
			userInfo:{
				get(){
					 return this.getUserInfo();
				}
			}
    },
    methods:{
        _goUrl(){
            this.goUrl('',3);
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
        _goSystem(item){
              let _this=this;
               let params={};
               const toast = this.$createToast({
                time: 0,
                txt: '角色转化中...'
                });
                toast.show();
                    params=this.formModel;
                    this.fetchObject({
                        url:'/api/services/app/session/UpdateCurrentUserInfo',
                        method:'post',
                        data:params
                    }).then(data=>{
                         if(data.success){
                             this.fetchObject({
                                            url:'/api/services/app/session/GetCurrentLoginInformations',
                                            method:'post',
                                            data:{}
                                        }).then( 
                                            data=>{
                                                if(data.success){
                                                    toast.hide();
                                                    //this._getSonSysInfo(data.result.user.manageOrgId);
                                                    this.Console('success','转化成功！');
                                                    this.utilObject.setCookie('userInfo',JSON.stringify(data.result),1);
                                                    this.$router.push({ path:'/home'});
                                                    
                                                }
                                         })
                         }
                         else {
                            toast.hide();
                            this.Console('error','转化角色失败！');
                         }
                         toast.hide();
                    }).catch(function(error){
                        toast.hide();
                         this.Console('error','转化角色异常！'+error);
                    })
             
          },
          init(){
                this.roleList=this.userInfo.userRoles.map(i=>{return {text:i.text,value:i.id}});
                this.orgList=this.userInfo.userDataRanges.map(i=>{return {text:i.text,value:i.id}});
                this.formModel.roleId=this.userInfo.user.roleId;
                this.formModel.orgId=this.userInfo.user.manageOrgId;
          }
    },
    mounted(){
        this.init();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-form
    padding 10px
    .item
        margin-top 10px
</style>
