
<template>
<div class="yl-menu">
                <yl-header 
                    :title="titleName" 
                    theme="light"
                    ></yl-header> 
                <div class="banner">
                    <div class="content">
                        {{sysName.titleName}}
                    </div>
                </div>
                <div class="menu">
                    <cube-scroll  :options="options" >
                        <div class="menu-warp">
                                <div class="menu-item"  v-for="(i,index) in  menuList" :key="index" @click="_goUrl(i)">
                                        <div class="icon-warp" >
                                            <img class="icon" :src="getimgUrl(i.icon)" >
                                        </div>
                                        <p class="label">
                                            <span>{{i.name}}</span>
                                        </p>
                                </div>
                        </div> 
                    </cube-scroll>
                </div>
</div>
</template>

<script type="text/babel">
import util from '@/common/js/util';
import fetch from '@/api/fetch';
import qs from 'qs';
export default {
    data(){
        return {
            sysName:webappConfig().sysConf,
            titleName:this.$route.name,
            menuList:[],
            options: {
            }
        }
    },
    methods:{
            getimgUrl(name){
            if(!name){
                name='grid-img.png'; 
            }
            return  '@/../static/img/'+name;
        },
        //获取菜单列表
		  _getMenu(){
			  let params={};
              const toast = this.$createToast({
                time: 0,
                txt: '加载中..'
                })
              toast.show()
			  params.appCode=webappConfig().sysConf.appCode;
			  var _this=this;
              fetch({url:'/api/services/app/usermenu/GetUserMenu?'+qs.stringify(params),
                    method:'post'}).then(
					data => {
							if(data.success){
								this.menuList=data.result.userMenu.items;
							} 
							toast.hide();
						}).catch(function (error) {
							toast.hide();
						});
          },
          _goUrl(i){
            this.$router.push({name:'MenuItem',params:i})     
        },
    },
    mounted(){
        this._getMenu();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-menu
    background-color $color-background
    height calc(100% - 48px)
    .banner
        width 100% 
        height 120px
        background url(/static/img/banner.jpg)  no-repeat
        background-size  cover
        .content
            position absolute
            top 75px
            left 180px
            color $color-white
            font-size $fontsize-small-s
    .menu
        height calc(100% - 160px)
        .menu-warp
            width 100%
            height auto
            overflow hidden
            display flex
            flex-wrap wrap
            padding 20px 15px 5px 15px
            box-sizing border-box
            .menu-item
                box-sizing border-box
                width 95px
                height 95px
                background-color $color-white
                margin 10px
                border-radius 0px
                box-shadow 0px 5px 6px rgba(0, 0, 0, .1)
                .icon-warp
                    width 100%
                    height 35px
                    padding-top 20px
                    text-align center
                    .icon 
                        width 35px
                        height 35px
                .label
                    text-align center
                    margin-top 10px
                    font-size $fontsize-small-s
            .menu-item:hover
                background-color $color-white
            
</style>
