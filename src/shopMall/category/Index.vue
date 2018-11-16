
<template>
<div class="yl-category">
    <!-- <div class="search">
        <cube-input class="input" v-model="searchVal" placeholder="搜索商品关键字"></cube-input>
    </div> -->
     <yl-header 
            title="商品分类"
            theme="light"
            >
    </yl-header> 
    <div class="side-list">
        <div class="side">
            <div class="menuitem" 
                v-for="(item,index) in menuList" :key="index"
            >
                <div class="menuh" >{{item.name}}</div>
                <div class="item" v-for="(i,itemindex) in item.children" :key="itemindex" 
                    @click="_getGoodListByClass(i)"
                >
                    <div class="text" :class="{ 'active-item': currentNode.treeCode==i.treeCode }">
                            {{i.name}}
                    </div>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="content">
                <yl-listscroll 
                    scrollEnable
                    :listStyle="listStyle"
                    :scrollOptions="scrollOptions"
                    :infoShowOptions="infoShowOptions"
                    :data="dataList"
                >
                </yl-listscroll>
            </div>
                
        </div>
    </div>
</div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-category'
import baseMixn from '@/mixns/base.js';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    data(){
        return {
            searchVal:'',
            currentNode:{},
            menuList:[],
            scrollOptions:{
                options: {
                    click: true,
                  }
            },
            infoShowOptions:{
                 type:"goodsCard",
                 elmentConfig:{
                     item:{},
                     width:'33.3333%',
                     defaultProps:{
                         name:{
                             name:'name',
                             style:{
                                 textAlign:"center"
                             }
                         },
                         img:{
                             name:'extensionTwo',
                         }
                     },
                     style:{
                     },
                     linkEvent:function(_this,item){
                         this.goUrl('/goodsList?classCode='+item.treeCode)
                     }
                 }
            },
            listStyle:{
                display:'flex',
                alignItems:'center',
                flexWrap:'wrap',
            },
            dataList:[]
            
        }
    },
    props:{

    },
    methods:{
         _getClass(){
              const toast = this.$createToast({
                time: 0,
                txt: '加载中..'
                })
              toast.show()
              let params={};
              params.queryConditionItem=[];
              params.sorting='',
              params.draw=1,
              params.maxResultCount=10000
              params.skipCount=0
			  var _this=this;
              this.fetchObject(
                  {
                    url:'/api/services/app/tsingletable01/getMainPageList',
                    method:'post',
                    data:params
                  }
                    ).then(
					data => {
							if(data.success){
                                this.menuList=this.utilObject.returnDatabyTree(data.result.data,this.utilObject.newGuid(true));
                                if(this.menuList.length){
                                    this.currentNode=this.menuList[0].children[0];
                                    this._getGoodListByClass(this.currentNode)
                                }
                               
                            } 
							toast.hide();
						}).catch(function (error) {
							toast.hide();
						});
          },
          _getGoodListByClass(node){
              this.currentNode=node;
              if(node.children){
                  this.dataList=node.children;
              }else{
                  this.dataList=[];
              }
          },
    },
    mounted(){
      this._getClass();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-category
    background-color $color-white
    height calc(100% - 48px)
    display flex
    flex-direction column
    .side-list
        flex 1
        display flex
        align-items center
        .side
            width 95px
            height 100%
            overflow auto
            border-right 1px $color-col-line solid
            padding-top 5px
            padding-left 5px
            box-sizing border-box
            .menuitem
                text-align left
                line-height 25px
                font-size $fontsize-small
                .menuh
                    color $color-light-grey
                .item
                    text-align left
                    color $color-dark-grey 
                    font-size $fontsize-small
                    .text
                        padding-left 8px
                        margin 20px 0px
                    .active-item
                        color $color-dark-orange
                        border-left 3px $color-dark-orange solid
                    
        .list
            flex 1
            height 100%
            display flex
            flex-direction column
            // .pic
            //     box-sizing border-box
            //     height 110px
            //     padding 10px
            //     .img
            //         width 100%
            .line
                height 30px
            .content
                flex 1
                overflow auto




</style>
