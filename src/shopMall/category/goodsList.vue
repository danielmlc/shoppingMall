
<template>
<div class="yl-goodslist">
    <div class="search">
        <div class="searchBtn" @click="_goUrl('/category')">
            <i class="fa fa-th-large" ></i>  </div> 
        <cube-input class="input" v-model="searchVal" placeholder="搜索商品关键字"></cube-input>
        <div class="searchBtn" @click="_getGoodListByClass()">  查找 </div>  
    </div>
    <div class="fliter">
        <div class="tag">综合查询</div> 
        <div class="option">价格  <i class="fa fa-sort" ></i> </div> 
        <div class="option">销量 <i class="fa fa-sort" ></i></div> 
        <div class="option">商品编码 <i class="fa fa-sort" ></i></div>   
    </div>
    <div class="list">
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
         _goUrl(url){
                this.$router.push({path:url})
            },
          _getGoodListByClass(){
              let params=this.$route.query;
              console.log(this.$route)
              if(params.goodsName){
                   this.searchVal=params.goodsName;
              }
              let firstKeysArr=[],firstValuesArr=[]
              if(params.classCode){
                  //编码不为空
                  firstKeysArr.push("V_Col2");
                  firstValuesArr.push("$"+params.classCode+"$");
              }else{
                  firstKeysArr.push("V_Col2");
                  firstValuesArr.push("$00$");
              }
               //物资名称不为空
                firstKeysArr.push("V_Col14");
                firstValuesArr.push("$"+this.searchVal+"$");
              const toast = this.$createToast({
                time: 0,
                txt: '加载中..'
                })
              toast.show()
              let dataParams={
                    firstKeys:firstKeysArr.join(','),
                    firstValues:firstValuesArr.join(','),
                    procName: "Pr_CommonExecuteSql",
                    procType: 0,
                    secondKeys: "getGoodListByClass",
                    secondOperates: "",
                    secondValues: "",
              };
			  var _this=this;
              this.commonSqlExcute(dataParams).then(
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

        this._getGoodListByClass()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-goodslist
    background-color $color-white
    display flex
    flex-direction column
    .search
        height 42px
        padding 5px
        box-sizing border-box
        border-bottom 1px $color-col-line solid
        background-color $color-blue
        display flex
        .input
            background-color #FFF
            flex 1
        .searchBtn
            width 40px
            height 32px
            font-size $fontsize-small
            line-height 32px
            text-align center
            color #ffffff
    .fliter
        height 42px
        padding 5px
        box-sizing border-box
        border-bottom 1px $color-col-line solid
        display flex
        font-size $fontsize-small
        line-height 32px
        text-align center 
        .tag
            color $color-orange
            width   75px
        .option
            flex 1
            color $color-grey
    .list
        flex 1
        height 100%
        display flex
        flex-direction column
        padding 5px
</style>
