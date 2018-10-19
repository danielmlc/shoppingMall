<template>
<div class="yl-treeselect">
    <cube-input
        :value="currentValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :clearable="clearable"
        @click.native="showPopup('treePopup',true)"
    >
    </cube-input>
    <cube-popup 
        type="tree-popup" 
        :mask="true" 
        :position="'left'"
        :mask-closable="true"
        ref="treePopup">
       <yl-treepanel  
           :defaultData="defaultData"
           :nodeClick="nodeClick"
           :currentText="inputText"
           @nodeSelect="_nodeSelect"
           @nodeExpend="_nodeExpend"
           @close="showPopup('treePopup',false)">
       </yl-treepanel>
    </cube-popup>
</div>

</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-treeselect'
import baseMixn from '@/mixns/base.js';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    data(){
        return {
             readonly:true,
             inputText:'',
             selectNode:{}
        }
    },
    props:{
        placeholder:{
            type:String,
            default:""
        },
        disabled:{
            type:Boolean,
            default:false
        },
        clearable:{
            type:Boolean,
            default:false
        },
        textOnly:{
            type:Boolean,
            default:false
        },
        stepByOne:{
          type:Boolean,
          default:true,
        },
        isExpend:{
            type:Boolean,
            default:false,
        },
        defaultData:{ //默认根节点
          type:Object,
          default:function(){
              return {}
          },
        },
        nodeClick:{
            type:Function
        },
        value:[String],
    },
    computed:{
        currentValue:{
            get(){
                if(this.stepByOne){
                    if(this.textOnly){
                        //只使用文本时显示文本信息
                        this.inputText=this.value;
                    }else{
                         //异步赋值时，显示名称为传进来的值
                        if(this.selectNode.id==undefined){
                            this.inputText=this.defaultData.text;
                            this.$emit('input',this.defaultData.id);
                        }
                        else{
                            this.inputText=this.selectNode.text;
                            this.$emit('input',this.selectNode.id);
                        }
                    }
                }else{
                    //一次加载
                }
                 return this.inputText;
            },
        },
    },
    methods:{
       showPopup(refId,state) {
            const component = this.$refs[refId];
            if(state){
                component.show();
            }else{
                component.hide();
            }
      },
       _nodeExpend(node){
           this.$emit('nodeExpend',node)
       },
       _nodeSelect(node){
             this.selectNode=node;  
             if(this.textOnly){ 
                 this.$emit('input',node.text);
                }
            else{ 
                 this.$emit('input',node.id);
                }
           this.$emit('nodeSelect',node)
       },
    },
    mounted(){
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
