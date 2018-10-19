<template>
	<renderContainerLay
		:options="options.content"
		:constPrams="constPrams"
	>
	</renderContainerLay>	
</template>

<script type="text/babel">
import renderContainerLay from '@/components/layout/renderContainerLay'
import baseMixn from '@/mixns/base.js';
export default {
    mixins: [baseMixn],
	data(){
		return {
			constPrams:{}
		}
	},
	props:{
		options:{
			type:Object,
			default:function(){
				return {}
			}
		},
		isinit:{
			type:Boolean,
			default:true
		}
	},
	computed:{
	},
	methods:{ 
			_initEvent(){
				let _this=this,option=this.options;
				if(option.InterceptEvent!=undefined){
					let eventConf=option.InterceptEvent.init;
					if(eventConf!=undefined){
							if(eventConf.isOn){
								let filterParams=this.getGlobObject2;
								eventConf.event(_this,option,filterParams);
							}
						}
				}
		   },
		   init(){
				this._initEvent();
		   }
	},
	mounted(){
		 if(this.isinit){
				this.init();
		 }
    },
	components:{
		renderContainerLay
	},
	watch:{
		getGlobString2:function(n,o){
			   if(n.substring(0,6)==='reload'){
				   this.init();
			   }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
