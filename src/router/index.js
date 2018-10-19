import Vue from 'vue'
import Router from 'vue-router'


//account
const Login = resolve => require(['../view/account/Login.vue'], resolve);
const Registered = resolve => require(['../view/account/Registered.vue'], resolve);
const RetrievePwd = resolve => require(['../view/account/RetrievePwd.vue'], resolve);
const RegisteredConfim = resolve => require(['../view/account/RegisteredConfim.vue'], resolve);
const Demo = resolve => require(['../view/Demo.vue'], resolve);
//main
const Main = resolve => require(['../view/Main.vue'], resolve);
//home
const Home = resolve => require(['../view/Home'], resolve);

//menu
const Menu = resolve => require(['../view/menu'], resolve);
const MenuItem = resolve => require(['../view/menu/MenuItem.vue'], resolve);
//message
const Message = resolve => require(['../view/message'], resolve);

//user
const User = resolve => require(['../view/user'], resolve);

//tip
const Page404 = resolve => require(['../view/tip/Page404.vue'], resolve);
const blank = resolve => require(['../view/tip/blank.vue'], resolve);

//config
const dynamicPage = resolve => require(['../view/config/dynamicPage.vue'], resolve);
const trunRole = resolve => require(['../view/config/trunRole.vue'], resolve);

//other
const videoShow = resolve => require(['../view/nonconfpage/videoShow/videoShow.vue'], resolve);

//shopMallPage
const shopMain = resolve => require(['../shopMall/ShopMain.vue'], resolve);
const homePage = resolve => require(['../shopMall/homePage'], resolve);
const category = resolve => require(['../shopMall/category'], resolve);
const cart = resolve => require(['../shopMall/cart'], resolve);
const userInfo = resolve => require(['../shopMall/userInfo'], resolve);
const SLogin = resolve => require(['../shopMall/account/Login.vue'], resolve);
const SRegistered = resolve => require(['../shopMall/account/Registered.vue'], resolve);
const SRetrievePwd = resolve => require(['../shopMall/account/RetrievePwd.vue'], resolve);
const SRegisteredConfim = resolve => require(['../shopMall/account/RegisteredConfim.vue'], resolve);

Vue.use(Router)

export default new Router({
  mode:"hash",
  routes: [

    //account  
    
    // {path: '/Login', component: Login, name: '登录' },
    // {path: '/Registered', component: Registered },
    // {path: '/RegisteredConfim', component: RegisteredConfim },

    // {path: '/RetrievePwd', component: RetrievePwd },

    // {
    //   path: '/',  
    //   component: Main,
    //   redirect: 'Home',
    //   name: '',
    //   children: [
    //     { path: '/Home', component: Home, name: '主页'  },
    //     { path: '/Menu', component: Menu, name: '菜单'  },
    //     { path: '/Message', component: Message, name: '消息'  },
    //     { path: '/User', component: User, name: '我的'  },
    //   ]
    // },
    // {path: '/Demo', component: Demo },
    // { path: '/MenuItem', component: MenuItem, name: 'MenuItem'  },
    // {path: '/videoShow',component: videoShow,name: '视频监控'},
    


    //===================shopMallPage===============
    {path: '/Login', component: SLogin, name: '登录' },
    {path: '/Registered', component: SRegistered },
    {path: '/RegisteredConfim', component: SRegisteredConfim },
    {path: '/RetrievePwd', component: SRetrievePwd },
    {
      path: '/',  
      component: shopMain,
      redirect: 'homePage',
      name: '',
      children: [
        { path: '/homePage', component: homePage, name: '首页'  },
        { path: '/category', component: category, name: '分类'  },
        { path: '/cart', component: cart, name: '购物车'  },
        { path: '/userInfo', component: userInfo, name: '我的'  },
      ]
    },

    //==================================

    //通用页面
    { path: '/trunRole', component: trunRole, name: '转化角色'  },
    { path: '/dynamicPage/:menuCode/:pageName', component: dynamicPage, name: '独立动态页面'  },
    //tip
    {path: '/blank',component: blank,name: '暂无内容'},
    {path: '*',component: Page404,name: '404页面'} 

   
  ]
})
