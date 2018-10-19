import des from './des'
import router from '@/router';
import fetch from '@/api/fetch';
import {
  encode,
  decode
} from './base64';

export default {
  getDefaultToken: function () {
    return "Basic " + encode(webappConfig().sysConf.clientId + ":" + webappConfig().sysConf.clientSecret);
  },
  resetLogin:function () {
    this.clearAllCookie();
    this.clearLocalStorage();
  },
  setLogin: function (token) {
    this.setCookie('Authorization', "Bearer " + token, 1);
    this.setCookie('loginStatus', "on", 1);
  },
  //判断权限
  isAuth: function (url) {
    //鉴权
    let noPermissionUrl = [
        '/login',
        '/outquerymobile',
        'homePage'
      ],
    ispermissionUrl = noPermissionUrl.includes(url);
    if (!ispermissionUrl) {
      //鉴权
      let value = this.getCookie('Authorization');
      if (!value) {
        //获取token
        let newid=this.newGuid(false);
        fetch(
            {
                url:'/Token',
                method:'post',
                data:{
                    loginType:0,
                    ylClientId:newid,
                    grant_type:'client_credentials'
                }
            },
            {
                baseURL:'',
                authorization:this.getDefaultToken(),
                formatData:true
            }
        ).then((result)=>{
            if(result.access_token!==""){
              this.setLogin(result.access_token);
              return true;
            }
        })
        
      }
      return true;
    }
    return true;
  },


  //操作cookie
  setCookie: function (name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate;
  },
  //删除所有cookie
  clearAllCookie: function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  },
  getCookie: function (name) {
    var arr = document.cookie.split('; ');
    var i = 0;
    for (i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=');
      if (arr2[0] == name) {
        var getC = decodeURIComponent(arr2[1]);
        return getC;
      }
    }
    return '';
  },
  removeCookie: function (name) {
    this.setCookie(name, '1', -1);
  },


  //添加LocalStorage
  setLocalStorage: function (name, value) {
    localStorage.setItem(name, encode(value));
  },
  //读取LocalStorage
  getLocalStorage: function (name) {
    let value = localStorage.getItem(name);
    if (value === null) {
      return '';
    } else {
      return JSON.parse(decode(value), this.dealFunction);
    }
  },
  //删除指定localStorage
  removeLocalStorage: function (name) {
    localStorage.removeItem(name);
  },

  //清楚所有
  clearLocalStorage: function () {
    localStorage.clear();
  },

  newGuid: function (isnull = false) {
    var guid = "";
    if (!isnull) {
      for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
          guid += "-";
      }
    } else {
      guid = "00000000-0000-0000-0000-000000000000";
    }
    return guid;
  },

  dealFunction: function (k, v) {
    let _this = this;
    if(v===null){ return v;}
    if (v.indexOf && v.indexOf('function') > -1) {
      return eval("(function(){ return " + v + " })()")
    }
    return v;
  },
  base64Decrypt: function (value) {
    return decode(value);
  },
  base64Encrypt: function (value) {
    return encode(value);
  },
  jsDecrypt: function (value) {
    return des.jsdecrypt('ylrj', value);
  },
  jsEncrypt: function (value) {
    return des.jsencrypt('ylrj', value);
  },
  // 深拷贝
  deepCopy: function (o) {
    // return  JSON.parse(JSON.stringify(o))
    if (o instanceof Array) {
      var n = [];
      for (var i = 0; i < o.length; ++i) {
        n[i] = this.deepCopy(o[i]);
      }
      return n;
    } else if (o instanceof Function) {
      var n = new Function("return " + o.toString())();
      return n
    } else if (o instanceof Object) {
      var n = {}
      for (var i in o) {
        n[i] = this.deepCopy(o[i]);
      }
      return n;
    } else {
      return o;
    }
  },
  //将平行数据根据子父节点处理为树形数据
  returnDatabyTree:function fn(data,pid){
    let result = [] , temp;
    for(let i in data){
        if(data[i].parentId==pid){
            result.push(data[i]);
            temp = fn(data,data[i].id);           
            if(temp.length>0){
                data[i].children=temp;
            }           
        }       
    }
    return result;
},

}
