<template>
    <div class="yl-config-page ">
		<div class="yl-config-loading" v-if="!isRender" >
            <div class="loading">
                <img  src="@/../static/img/loading.gif" alt="">
                <p>加载中，请稍后...</p>
            </div>
        </div>
		 <div class="yl-config-body" v-if="isRender">
			<yl-Container
				v-if="moduleType=='dynamicPage'" 
				:options="mConfigs"
			>
			</yl-Container>
			<yl-assemblePage
				 v-else-if="moduleType==='assemblePage'"
				:options="mConfigs"
			>
			</yl-assemblePage>
		 </div>	
	</div>
</template>

<script type="text/babel">
import baseMixn from '@/mixns/base.js';
import assemblePage from '@/components/assemblePage/assemblePage';
export default {
    mixins: [baseMixn],
	data(){
		return {
			type:0,
			isRender:false,
			mConfigs:{},
			moduleType:"",
			roleId:''
		}
	},
	computed:{
	},
	methods:{ 
			init(){
				this.isRender=false;
				let inputArr=[
                    {dataField:"RoleId", op:'EQ', dataValue:this.roleId},
					{dataField:"IsEnable", op:'EQ', dataValue:1},
					{dataField:"HomeType", op:'EQ', dataValue:1},
					{dataField:"VersionNum", op:'EQ', dataValue:webappConfig().sysConf.version}
					],params={};
				params.queryConditionItem=inputArr;
                this.fetchObject({
                     url: '/api/services/app/homePageConf/GetHomePageConfByKey',
                     method: 'post',
                     data: params
                }).then((data)=>{
                      if(data.success){
						  if(data.result.order!=null){
							 let homeconfig=JSON.parse(data.result.order.homePageConf,this.utilObject.dealFunction);
                               if(homeconfig.homeType===0){
                                   this.$router.push({ path:homeconfig.modulePage.routerUrl});
                               }else{
								   this.mConfigs=homeconfig.configPage;
								   this.moduleType=data.result.order.extensionTwo;
                               }
								this.isRender=true;
							}else{
								//跳转至默认门户
								let Arr=[
									{dataField:"RoleId", op:'EQ', dataValue:this.utilObject.newGuid(true)},
									{dataField:"IsEnable", op:'EQ', dataValue:1},
									{dataField:"HomeType", op:'EQ', dataValue:1},
									{dataField:"VersionNum", op:'EQ', dataValue:webappConfig().sysConf.version}
									],Params={};
								Params.queryConditionItem=Arr;
								this.fetchObject({
									url: '/api/services/app/homePageConf/getMainObjectForEdit',
									method: 'post',
									data: Params
								}).then(Data=>{
									if(Data.result.order){
										   this.mConfigs=JSON.parse(Data.result.order.homePageConf,this.utilObject.dealFunction).configPage;
										   this.moduleType=Data.result.order.extensionTwo;
									}else{
										this.$router.push({ path:'/Page404'});
									}
									this.isRender=true;
								})
							}
                      } 
                      else {
						  this.$message.error('失败！'+data.error.message);
                      }
				});
			},
			initWithToken(){
				let params={
					grant_type:'client_credentials'
				}
				this.fetchObject({
					url:"/Token",
					method:"post",
					data:params
				},{
					baseURL:'',
					authorization:this.utilObject.getDefaultToken(),
					formatData:true
				}).then(data=>{
						if(data.access_token){
							this.utilObject.setLogin(data.access_token);
							this.init()
						}else{
							this.$router.push({ path:'/Page404'});
						}
					})
			}
	},
	beforeMount(){
		this.roleId=this.getUserInfo().user.roleId;
	},
	mounted(){
		this.initWithToken();
    },
	components:{
		'yl-assemblePage':assemblePage
	},
	watch:{
          "$route": "init"
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" rel="stylesheet/css" scoped>
.yl-config-page{height:calc(100% - 48px);width:100%}
.yl-config-body{height:100%;width:100%}
.yl-config-loading{height:100%;width:100%;background-color:#fff}
.loading{
            height:100px;
            width:300px;
            text-align:center;
            color:#4388C9;
            font-size:14px;
            margin: 0 auto;
            padding-top:200px;
        }
</style>
