

import Vue from 'vue'
import moment from 'moment';
import fetch from  '@/api/fetch';
import util from '@/common/js/util';
import router from '@/router';
//获取用户信息
Vue.prototype.getUserInfo=function(){
    let value=util.getCookie('userInfo');
    if(value==''){
          return {
                user: {
                      realName: "",   //用户姓名
                      gender: "", //性别
                      userName: "", //用户账号
                      emailAddress: "", //用户邮箱地址
                      manageOrgId: "", //组织机构主键
                      manageOrgName: "", //组织机构名称
                      companyId:"", //管理单位主键
                      companyName:"",  //管理单位名称
                      roleId: "", //角色主键
                      roleName: "", // 角色名称
                      realOrgId:"" ,//如果是项目部工区 该值为项目部主键
                      lastLoginTime: "", //上次登录时间
                      id:"" //用户主键
                  },
                  userDataRanges:[],
                  userRoles:[]
          }
    }
    return JSON.parse(value);
}

//日期格式化
Vue.prototype.formatDate= function (value,option){
      return moment(value).format(option); 
}



//获取通用函数
//参数模板
// let params={
//       firstKeys: "V_Col2 ",
//       firstValues: "#V_Col2#",
//       procName: "Pr_CommonExecuteSql",
//       procType: 0,
//       secondKeys: "getGoodListByClass",
//       secondOperates: "",
//       secondValues: "",
// };
Vue.prototype.commonSqlExcute=function (params){
      return new Promise(function (resolve, reject) {
           fetch({ 
                 url: '/api/services/app/sqlExecute/ExecuteSqlAndProcCommand',
                 method: 'post',
                 data:params
           }).then((data)=>{
                 if(data.success){
                       resolve(data.result);
                 }else{
                        reject(new Error('请求信息失败！'+err))
                 }
                  
           }).catch((err)=>{
                  reject(new Error('请求信息异常！'+err))
           });
       }); 
} 

//获取越权函数
Vue.prototype.forceSqlExcute=function (params){

      return new Promise(function (resolve, reject) {
           fetch({ 
                 url: '/api/services/app/apiManager/YlHttpV8',
                 method: 'post',
                 data:{
                       baseUrl:params.baseUrl,
                       url:params.url,
                       verbType:params.method,
                       parasJson:JSON.stringify(params.data),
                       paras:[
                        {name: "client_id", value: webappConfig().sysConf.clientId},
                        {name: "client_secret", value: webappConfig().sysConf.clientSecret}
                       ]
                 }
           }).then((data)=>{
                 if(data.success){
                       resolve(data.result);
                 }else{
                        reject(new Error('请求信息失败！'+err))
                 }
                  
           }).catch((err)=>{
                  reject(new Error('请求信息异常！'+err))
           });
       }); 
} 

//封装的异步请求
Vue.prototype.asyncFunc=function (apiConf,errText=''){
    
      return new Promise(function (resolve, reject) {
            fetch(apiConf).then((data)=>{
                  if(data.success){
                        resolve(data.result)
                  }else{
                      reject(new Error(errText+'获取失败！'))
                  }
                  
            }).catch((err)=>{
                   reject(new Error(errText+'获取异常！'+err))
            });
      }); 

  
}

//路由跳转
Vue.prototype.goUrl=function (url='',type=0){
      if(type===0){
            router.push({path:url})     
      }else if(type===1){
            router.replace(url)
      }else if(type==3){
            router.go(-1)
      }
     
}


//获取当前OrgID
  
Vue.prototype.getLocalOrgId=function (){
      let localOrg=util.getCookie('localOrg');
      if(localOrg){
            return  JSON.parse(localOrg).id;
      }
      else{
            let userinfo=util.getCookie('userInfo');  
            return  JSON.parse(userinfo).user.manageOrgId;
      }     
     
}

