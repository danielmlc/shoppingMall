
<template>
<div class="yl-form">
    <div class="from-item" 
         v-for="(item,index) in formConf.formItemList"
                :key="index"
        >
        <label 
         :for="item.name"
         class="input-label" 
         v-if="item.title">
            {{item.title}}
        </label>
        <div class="input-warper">
            <yl-formComs 
                :option="item"
                :model="formModel"
                @clickEvent="_click"
                @blurEvent="_blur"
                @changeEvent="_change"
                @method1="_method1"
                @method2="_method2"
                @init="_initComs"
                >
            </yl-formComs> 
            <cube-validator
                v-if="item.validConf" 
                v-model="item.validConf.valid" 
                :model="formModel[item.name]" 
                :rules="item.validConf.rules" >
            </cube-validator>
       </div>
    </div>
</div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-form'
import baseMixn from '@/mixns/base.js';
export default {
    mixins: [baseMixn],
    name:COMPONENT_NAME,
    data(){
        return {
            formModel:{},
            formConf:{},
        }
    },
    props:{
        options:{
            type:Object,
            default:function(){
                return {
                    
                }
            }
        },
        model:{
              type:Object,
                default:function(){
                    return {
                        
                    }
                }
        },
    },
    methods:{
            _initComs(_coms){
                let _this=this,option=_coms.option;
                if(option.eventConf!=undefined){
                    if(option.eventConf.isOn){
                        if(option.eventConf.init!=undefined){
                                //存储过滤变量
                                option.eventConf.init(_this,option);
                        }
                    }  
                }
            },
            _change(node,_coms){
					let _this=this,option=_coms.option;
					let eventConf=option.eventConf;
					if(eventConf!=undefined){
						if(eventConf.isOn){
							if(eventConf.change!=undefined){
									eventConf.change(node,_this,option);
							}
						}
					}
            },
            _click(node,_coms){
					let _this=this,option=_coms.option;
					let eventConf=option.eventConf;
					if(eventConf!=undefined){
						if(eventConf.isOn){
							if(eventConf.click!=undefined){
									eventConf.click(node,_this,option);
							}
						}
					}
			},
             _blur(node,_coms){
					let _this=this,option=_coms.option;
					let eventConf=option.eventConf;
					if(eventConf!=undefined){
						if(eventConf.isOn){
							if(eventConf.blur!=undefined){
									eventConf.blur(node,_this,option);
							}
						}
					}
			},
        	_method1(node,_coms){
					let _this=this,option=_coms.option;
					let eventConf=option.eventConf;
					if(eventConf!=undefined){
						if(eventConf.isOn){
							if(eventConf.method1!=undefined){
									eventConf.method1(node,_this,option);
							}
						}
					}
			},
			_method2(node,_coms){
						let _this=this,option=_coms.option;
						let eventConf=option.eventConf;
						if(eventConf!=undefined){
						if(eventConf.isOn){
							if(eventConf.method2!=undefined){
								eventConf.method2(node,_this,option);
							}
						}
					}
			},
		    _reload(){
                this.$emit('reload',this);
            }
    },
     created(){
        this.formConf=this.options;
        this.formModel=this.model;
    },
    mounted(){
    
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-form
    display block 
    .from-item
        display flex
        align-items center
        .input-label
            font-size $fontsize-small
            color $color-dark-grey
            padding 0px 10px
            width 80px
        .input-warper
            flex 1

</style>