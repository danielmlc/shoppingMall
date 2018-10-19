
<template>
<div  class="yl-header" 
     :class="headerClass">
  <div class="left" @click="_leftEvent"><i :class="left.icon"></i>{{left.text}}</div>
  <h1> {{title}}</h1>
  <div class="right" @click="_rightEvent" v-if="!right.isOrg">{{right.text}}<i :class="right.icon"></i></div>
  <div class="right" @click="showPopup('treeSelPopup',true)"  v-else-if="right.isOrg"><i :class="right.icon"></i></div>
  <cube-popup 
        type="tree-popup" 
        :mask="true" 
        :position="'left'"
        :mask-closable="true"
        ref="treeSelPopup">
       <yl-treepanel  
           :defaultData="defaultData"
           :nodeClick="nodeClick"
           :currentText="inputText"
           @nodeSelect="_nodeSelect"
           @close="showPopup('treeSelPopup',false)">
       </yl-treepanel>
  </cube-popup>
</div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-header'
import baseMixn from '@/mixns/base.js';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    data(){
        return{
            nodeClick:function(node,_this){
                _this.fetchObject(
                    {
                        url:'api/services/app/organize/GetOrganizeTreeListByParent?node='+node.id,
                        method:'post'
                    }).then(function(data){
                        if(data.success){
                            _this.treeData=data.result;
                            }
                    })
            }
        }
    },
    props:{
        title:{
            type:String,
            default:'',
            required:false,
        },
        theme:{
            type:String,
            default:'light',  
            required:false,
        },
        left:{
            type:Object,
            default:function(){
                return {
                            text:'',
                            icon:''
                        }
            },
            required:false,
        },
        right:{
            type:Object,
            default:function(){
                return {
                            text:'',
                            icon:'',
                            isOrg:false
                        }
            },
            required:false,
        },
    },
    computed:{
      headerClass() {
         if(this.theme==='light') {
            return 'yl-header-light';
        }else  if(this.theme==='dark'){
             return 'yl-header-dark';
        }
      },
      defaultData:{
          get(){
             return {
                    id:this.getUserInfo().user.manageOrgId,
                    text:this.getUserInfo().user.manageOrgName,
                    code:this.getUserInfo().user.orgCode
                }
          }
      },
      inputText:{
           get(){
               let localOrg=this.utilObject.getCookie('localOrg');
               if(localOrg){
                    return JSON.parse(localOrg).text;
               }
               return ''
          }
      }
    },
    methods:{
        _leftEvent(e){
            this.$emit('leftEvent',e)
        },
        _rightEvent(e){
            this.$emit('rightEvent',e)
        },
        _nodeSelect(node){
             this.utilObject.setCookie('localOrg',JSON.stringify(node)); 
             //跳转
              window.location = webappConfig().sysConf.baseUrl+'/api/Rediect/rediect?url='+location.href;
        },
        showPopup(refId,state) {
            const component = this.$refs[refId];
            if(state){
                component.show();
            }else{
                component.hide();
            }
      },
    },
    mounted(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-header
    position relative
    box-sizing border-box
    text-align center
    white-space nowrap 
    padding 0px 10px
    display flex
    height 40px
    font-size $fontsize-medium
    h1
        flex 1
        overflow hidden
        text-overflow ellipsis
        line-height 40px
    .left
        flex 0.5
        text-align left
        line-height 40px
    .right 
        flex 0.5
        text-align right
        line-height 40px

.yl-header-light
    background-color $color-white
    color $color-grey
.yl-header-dark
    background-color $color-regular-blue
    color $color-white
i
    padding 0px 5px
</style>
