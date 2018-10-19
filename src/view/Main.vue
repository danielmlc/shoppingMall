
<template>
<div class="main">
    <transition name="fade" >
        <!-- <keep-alive :include="includedComponents"> -->
            <router-view></router-view>
        <!-- </keep-alive> -->
    </transition>
    <div class="bottom">

    </div>
    <div class="menu">
        <div @click="_goUrl('/home')" class="menu-item" :class="_isActive('主页')">
            <i class="fa fa-home" ></i>  
            <span class="menu-item-text">主页</span>
        </div>
        <div @click="_goUrl('/menu')" class="menu-item" :class="_isActive('菜单')">
            <i class="fa fa-th-large" ></i>  
            <span class="menu-item-text" >菜单</span>
        </div>
        <div @click="_goUrl('/message')" class="menu-item" :class="_isActive('消息')">
             <i class="fa fa-bell" ></i>  
            <span class="menu-item-text">消息</span>
        </div>
        <div @click="_goUrl('/user')" class="menu-item" :class="_isActive('我的')">
             <i class="fa fa-user" ></i>  
            <span class="menu-item-text">我的</span>
        </div>
    </div>
</div>
</template>

<script type="text/babel">
export default {
    data(){
        return {
            activeName:''
        }
    },
    methods:{
        _goUrl(url){
            this.$router.push({path:url})
        },
        _isActive(value){
            if(value===this.activeName){
                return 'menu-item-hover'
            }
        }
    },
    mounted(){
         this.activeName=this.$route.name
    },
    watch:{
        $route:function(n,o){
            this.activeName=n.name
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.main
    height 100%
    width  100%
.menu
    width 100%
    height 48px
    line-height 1
    display flex
    padding 3px 10px
    box-sizing border-box
    white-space nowrap 
    text-align center
    position fixed
    bottom 0
    left 0
    right 0
    border-top 1px solid $color-light-grey-sss
    background-color #ffffff
    z-index 1000
    .menu-item
        flex 1
        color $color-light-grey-s
        i 
            display block 
            font-size $fontsize-large
            height 30px
            line-height 30px
        .menu-item-text
            display block 
            height 12px
            line-height 12px
            font-size $fontsize-small-s
    .menu-item-hover
        color $color-regular-blue
        i 
            font-size $fontsize-large-x
        .menu-item-text
            font-size $fontsize-small
.bottom
    height 48px
    width 100%
.fade-enter-active 
	animation fade-in 0s

.fade-leave-active 
    animation fade-out 0s

</style>