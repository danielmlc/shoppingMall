
<template>
<div class="yl-menu">
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
            <!-- <div class="pic">
                <img class="img" src="/static/img/eg/1.png" alt=""/>
            </div> -->
            <!-- <yl-splitline class="line"
                style="width:150px;"
                :text="currentNode.name"
            ></yl-splitline> -->
            <div class="content">
                <yl-listscroll 
                    scrollEnable
                    :listStyle="listStyle"
                    :scrollOptions="scrollOptions"
                    :infoShowOptions="infoShowOptions"
                    :data="dataList"
                    @onPullingDown="_onPullingDown"
                    @onPullingUp="_onPullingUp"
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
                    pageSize:5,
                    // pullDownRefresh: {
                    //   threshold: 60,
                    //   stop: 30,
                    //   txt: "当前页已刷新"
                    // },
                    pullUpLoad: {
                      threshold: 60,
                      txt: {
                        more: "加载更多",
                        noMore: "没有数据了"
                      }
                    }
                  }
            },
            infoShowOptions:{
                 type:"goodsCard",
                 elmentConfig:{
                     item:{},
                     width:'50%',
                     defaultProps:{
                         name:{
                             name:'v_Col14',
                         },
                         price:{
                             name:'sD_Col1',
                         }, 
                         img:{
                             name:'sV_Col8',
                         }
                     },
                     style:{
                     },
                     linkEvent:function(_this,item){
                         localStorage.setItem('currentGoods',JSON.stringify(item))
                         this.goUrl('/dynamicPage/category/goodsDetails')
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
              const toast = this.$createToast({
                time: 0,
                txt: '加载中..'
                })
              toast.show()
              let params={
                    firstKeys: "V_Col2",
                    firstValues: "#"+node.treeCode+"#",
                    procName: "Pr_CommonExecuteSql",
                    procType: 0,
                    secondKeys: "getGoodListByClass",
                    secondOperates: "",
                    secondValues: "",
              };
			  var _this=this;
              this.commonSqlExcute(params).then(
					data => {
						    this.dataList=data.items[0];
							toast.hide();
						}).catch(function (error) {
							toast.hide();
						});
          },
          _onPullingDown(node,_this,option){
          },
          _onPullingUp(node,_this,option){

          }
    },
    mounted(){
      this._getClass();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-menu
    background-color $color-white
    height calc(100% - 48px)
    display flex
    flex-direction column
    // .search
    //     height 32px
    //     padding 3px 10px
    //     border-bottom 1px $color-col-line solid
    //     .input
    //         background-color $color-background
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
