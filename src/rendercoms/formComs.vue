<template>
     <!--input输入框-->
   <cube-input ref="input"
        v-if="option.type==='input'" 
        v-model="model[option.name]" 
        :placeholder="option.elmentConfig.placeholder"
        :type="option.elmentConfig.type"
        :maxlength="option.elmentConfig.maxlength"
        :readonly="option.elmentConfig.readonly"
        :disabled="option.elmentConfig.disabled"
        :autofocus="option.elmentConfig.autofocus"
        :autocomplete="option.elmentConfig.autocomplete"
        :clearable="option.elmentConfig.clearable"
        :eye="option.elmentConfig.eye"
        @blur="_blur"
        @focus="_method1"
        ></cube-input>

    <!--textarea输入框-->
    <cube-textarea  ref="textarea"
        v-else-if="option.type==='textarea'" 
        v-model="model[option.name]" 
        :placeholder="option.elmentConfig.placeholder"
        :maxlength="option.elmentConfig.maxlength"
        :readonly="option.elmentConfig.readonly"
        :disabled="option.elmentConfig.disabled"
        :autofocus="option.elmentConfig.autofocus"
        @blur="_blur"
        @focus="_method1"
        ></cube-textarea >
   
      <!--select选择框-->
    <cube-select  ref="select"
        v-else-if="option.type==='select'" 
        v-model="model[option.name]" 
        :placeholder="option.elmentConfig.placeholder"
        :auto-pop="option.elmentConfig.autoPop"
        :disabled="option.elmentConfig.disabled"
        :title="option.elmentConfig.title"
        :cancelTxt="option.elmentConfig.cancelTxt"
        :confirmTxt="option.elmentConfig.confirmTxt"
        :options="option.elmentConfig.options"
        @change="_change"
        @picker-show="_method1"
        @picker-hide="_method2"
        >
    </cube-select >

    <!--Switch状态组件-->
    <cube-switch ref="switch"
        v-else-if="option.type==='switch'" 
        v-model="model[option.name]" 
        :disabled="option.elmentConfig.disabled"
        @change="_change"
        >
      
    </cube-switch>

     <cube-checkbox  ref="checkbox"  style="padding:0px"
        v-else-if="option.type==='checkbox'" 
        v-model="model[option.name]" 
        :shape="option.elmentConfig.shape"
        :hollowStyle="option.elmentConfig.hollowStyle"
        :position="option.elmentConfig.position"
        :option="option.elmentConfig.option"
        @change="_change"
        >
    </cube-checkbox>

    <!--button-->
    <cube-button ref="button"
        v-else-if="option.type==='button'" 
        :active="option.elmentConfig.active"
        :type="option.elmentConfig.type"
        :disabled="option.elmentConfig.disabled"
        :light="option.elmentConfig.light"
        :inline="option.elmentConfig.inline"
        :outline="option.elmentConfig.outline"
        :primary="option.elmentConfig.primary"
        @click="_click"
    >
        <i :class="option.elmentConfig.icon"></i>{{option.elmentConfig.text}}
    </cube-button >
  
     <!--input输入框-->
      <yl-treeselect ref="treeselect"
            v-else-if="option.type==='treeselect'" 
            v-model="model[option.name]" 
            :placeholder="option.elmentConfig.placeholder"
            :disabled="option.elmentConfig.disabled"
            :clearable="option.elmentConfig.clearable"
            :stepByOne="option.elmentConfig.stepByOne"
            :isExpend="option.elmentConfig.isExpend"
            :defaultData="option.elmentConfig.defaultData"
            :textOnly="option.elmentConfig.textOnly"
            :nodeClick="option.elmentConfig.nodeClick"
            @nodeExpend="_method1"
            @nodeSelect="_method2"
            >
      </yl-treeselect>

 </template>

<script type="text/babel">
import baseMixn from '@/mixns/base.js';
export default {
    mixins: [baseMixn],
    data(){
        return{
        }
    },
    props:{
         option:{
            type:Object,
            require:true,
            default:function(){
                return {}
            }
        },
        model:{
            type:Object,
            require:false
        },
        refList:{
            type:Object,
            require:false,
            default:function(){
                return {}
            }
        },
    },
    computed:{
        
    },
    methods:{
        _method1(node){
            this.$emit('method1',node,this);
        },
        _method2(node){
            this.$emit('method2',node,this);
        },
        _click(node){
            this.$emit('clickEvent',node,this);
        },
        _change(node){
            this.$emit('changeEvent',node,this);
        },
        _blur(node){
            this.$emit('blurEvent',node,this);
        },
        _initComs(){
          this.$emit('init',this);
        },
    },
    components:{
    },
    beforeMount(){
       this._initComs();   
    },
    mounted(){
         this.refList[this.option.name]=this.$refs;
    },
    watch:{
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
