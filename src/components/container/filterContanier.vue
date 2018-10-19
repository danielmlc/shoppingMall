
<template>
<div class="yl-filter">
    <div class="filter-form" v-show="isexpend">
        <div class="filter-item" >
            <!--timeBar时间段选择器-->
                <yl-timebar  ref="timeBar"
                    v-if="filterConf.timebar" 
                    :format="filterConf.timebar.format"
                    :btnItems="filterConf.timebar.btnItems"
                    :currentValue="filterConf.timebar.currentValue"
                    @click="_timeBarEvent"
                    @init="_timeBarInit"
                >
                </yl-timebar>
        </div>
        <div class="filter-item" 
             v-for="(item,index) in filterConf.formConfig"
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
                    :refList="refList"
                    :model="searchModel"
                    @clickEvent="_click"
                    @blurEvent="_blur"
                    @changeEvent="_change"
                    @method1="_method1"
                    @method2="_method2"
                    @init="_initComs"
                    >
                </yl-formComs> 
            </div>
        </div>
        <div class="filter-item" >
            <cube-button  primary @click="_loadData">查 找</cube-button>
        </div>
    </div>
    <div class="filter-tool">
            <span class="tip" v-show="!isexpend">筛选</span>
            <span @click="isexpend=!isexpend" class="spanbtn">
                <i :class="isexpend?'fa fa-angle-double-up':'fa fa-filter'"></i>
            </span>
    </div>
</div>
</template>
<script type="text/babel">
const COMPONENT_NAME = 'yl-filter'
import baseMixn from '@/mixns/base.js';
import {inputModel} from '@/api/inputmodel';
export default {
    mixins: [baseMixn],
    name:COMPONENT_NAME,
    data(){
        return {
            mainInput:new inputModel(),
            refList:{},
            timeNode:{},
            inputParams:{
                    firstKeys:[],
                    firstValues:[]
                },
            inputParams1:[],
            isexpend:true,
        }
    },
    props:{
        filterConf:{
            type:Object,
            default:function(){
                 return []
            }
        },
        searchModel:{
              type:Object,
                default:function(){
                    return {
                    }
                }
        },
    },
    methods:{
            _loadData(){
                this._getParams();
                this.setGlobString2('reload_'+Math.round(Math.random()*100000));
            },
            _getParams(){ 
                //该方法重置数据集
                if(this.filterConf.type==='report'){
                    //报表情形
                    let inputArr={};
                    inputArr.firstKeys=[];
                    inputArr.firstValues=[];
                    if(this.filterConf.formConfig.length>0){
                        this.filterConf.formConfig.map((i)=>{
                            if(i.name!=''){
                                inputArr.firstKeys.push(i.name);
                                inputArr.firstValues.push(i.op+this.searchModel[i.name]+i.op);
                            }
                        })
                    };
                    //inputArr
                    if(this.inputParams.firstKeys!==undefined){
                        inputArr.firstKeys.push(...this.inputParams.firstKeys);
                        inputArr.firstValues.push(...this.inputParams.firstValues);
                    }
                    //添加时间过滤
                    if(this.timeNode.beginDate!=undefined){
                        this.timeNode=this.$refs.timeBar.getDate();
                        inputArr.firstKeys.push(...['BeginDate','EndDate']);
                        let op=this.filterConf.timebar.op?this.filterConf.timebar.op:"#";
                        inputArr.firstValues.push(op+this.timeNode.beginDate+op);
                        inputArr.firstValues.push(op+this.timeNode.endDate+op);
                    }
                    let params={};     
                    params.firstKeys=inputArr.firstKeys.join(",");  
                    params.firstValues=inputArr.firstValues.join(",");
                    this.setGlobObject2(params);

                }else{
                    //针对非存储过程
                        let inputArray=[];
                        if(this.filterConf.formConfig.length>0){
                            this.filterConf.formConfig.map((i)=>{
                                if(!(i.op==="EQ"&&this.searchModel[i.name]==="")){
                                    let obj={};
                                    obj.key=i.name;
                                    obj.op=i.op;
                                    obj.DataFieldTwo=i.DataFieldTwo;
                                    obj.TwoFieldRelation=i.TwoFieldRelation;
                                    obj.value=this.searchModel[i.name];
                                    inputArray.push(obj)
                                }
                            })
                         }
                        //添加时间过滤
                        if(this.timeNode.beginDate!=undefined){
                            this.timeNode=this.$refs.timeBar.getDate();
                            inputArray.push({key:this.filterConf.timebar.beginDate,op:"BGT",value:this.timeNode.beginDate}); 
                            inputArray.push({key:this.filterConf.timebar.endDate,op:"SGT",value:this.timeNode.endDate}); 
                        }

                         //inputArr
                        inputArray.push(...this.inputParams1);
                        this.mainInput.addqueryConditionItem(inputArray);
                        if(this.filterConf.sorting){
                            this.mainInput.inputModel.sorting=this.filterConf.sorting;
                        }
                        if(this.filterConf.pageSize){
                            this.mainInput.inputModel.maxResultCount=this.filterConf.pageSize;
                        }
                        this.setGlobObject2(this.mainInput.inputModel);

                }
            },
            _inputArrInit(){
                if(this.filterConf.type==='report'){
                    this.filterConf.inputArr.forEach(item=>{
                        let _this=this;
                        if(item.eventConf!=undefined){
                            if(item.eventConf.isOn){
                                if(item.eventConf.init!=undefined){
                                    item.eventConf.init(item,_this);
                                }
                            }
                        }
                        this.inputParams.firstKeys.push(item.key);
                        this.inputParams.firstValues.push(item.op+item.value+item.op);
                    });
                }else{
                    this.filterConf.inputArr.forEach(item=>{
                        let _this=this;
                        if(item.eventConf!=undefined){
                            if(item.eventConf.isOn){
                                if(item.eventConf.init!=undefined){
                                    item.eventConf.init(item,_this);
                                }
                            }
                        }
                        if(!(item.op==="EQ"&&item.value==="")){
                            this.inputParams1.push(item);
                        }
                    });
                }
            },
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
             //时间工具条
            _timeBarEvent(node){
                let _this=this;
                if(this.filterConf.timebar!=undefined){
                    this.timeNode=node;
                    let eventConf=this.filterConf.timebar.eventConf;
                    if(eventConf!=undefined){
                        if(eventConf.isOn){
                            eventConf.click(node,_this);
                        }
                    }
                }
            },
            _timeBarInit(node){
                let _this=this;
                if(this.filterConf.timebar!=undefined){
                    this.timeNode=node;
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
    },
    mounted(){
         this._inputArrInit(); 
         this._getParams();   
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-filter
    display block 
    .filter-form
        .filter-item
            display flex
            align-items center
            padding 2px 0px 
            .input-label
                font-size $fontsize-small-s
                color $color-dark-grey
                padding 0px 5px
                width 80px
            .input-warper
                flex 1
                font-size $fontsize-small
    .filter-tool
        height 25px
        text-align right 
        padding-right 20px
        font-size $fontsize-small-s
        color $color-regular-blue
        line-height 25px
        .tip
            padding-right 5px
        .spanbtn
            padding 5px 8px
            

    

</style>