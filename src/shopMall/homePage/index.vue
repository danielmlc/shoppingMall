<template>
    <div class="yl-config-page ">
		<div class="yl-config-loading" v-if="!isRender" >
            <div class="loading">
                <img  src="@/../static/img/loading.gif" alt="">
                <p>页面构建中，请稍后...</p>
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
			moduleType:""
		}
	},
	computed:{
	},
	methods:{ 
			init(){
				this.isRender=false;
				// const toast = this.$createToast({
                // time: 0,
                // txt: '配置数据读取中..'
                // })
              	// toast.show()
				let route=this.$route.params;
				let inputArr=[
					{dataField:"MenuCode", op:'EQ', dataValue:'category'},
					{dataField:"PageName", op:'EQ', dataValue:'index'},
					{dataField:"IsEnable", op:'EQ', dataValue:1},
					{dataField:"VersionNum", op:'EQ', dataValue:webappConfig().sysConf.version}
					],params={};
				params.queryConditionItem=inputArr;
				
				if(this.$route.params.menuCode==="outquerymobile"){
					//越权
					 this.forceSqlExcute({
						 	baseUrl:webappConfig().sysConf.baseUrl,
							url: '/api/services/app/mobilePageConf/GetMobilePageConfByKey',
							method: 'post',
							data: params
						}).then((data)=>{
							let result=JSON.parse(data);
							if(result.success){
								if(result.result.order){
										this.mConfigs=JSON.parse(result.result.order.pageConf,this.utilObject.dealFunction).PageConf;
										this.moduleType=result.result.order.extensionTwo;
										this.isRender=true;
									}else{
										this.$router.push({ path:'/Page404'});
									}
									//toast.hide()
							} 
							else {
								this.$message.error('失败！'+result.error.message);
								//toast.hide()
							}
						});	
				}else{
					 this.fetchObject({
							url: '/api/services/app/mobilePageConf/GetMobilePageConfByKey',
							method: 'post',
							data: params
						}).then((data)=>{
							if(data.success){
								if(data.result.order!=null){
										this.mConfigs=JSON.parse(data.result.order.pageConf,this.utilObject.dealFunction).PageConf;
										this.moduleType=data.result.order.extensionTwo;
										this.isRender=true;
									}else{
										this.$router.push({ path:'/Page404'});
									}
									//toast.hide()
							} 
							else {
								this.$message.error('失败！'+data.error.message);
								//toast.hide()
							}
						});	
				}
				
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
							this.$router.push({ path:'/Login'});
						}
					})
			}
	},
	beforeMount(){
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
.yl-config-page{height:100%;width:100%}
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
