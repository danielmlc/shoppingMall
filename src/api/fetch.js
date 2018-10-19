import axios from 'axios';
import qs from 'qs';
import util from '@/common/js/util';
import router from '@/router';

axios.defaults.timeout=webappConfig().sysConf.timeout; 
let sysbaseURL=webappConfig().sysConf.baseUrl;
export default function fetch(options,axiosConfig={baseURL:'',authorization:'',formatData:false}) {
  return new Promise((resolve, reject) => {
    if(axiosConfig.baseURL!=''){
            axios.defaults.baseURL=axiosConfig.baseURL;
    }else{
            axios.defaults.baseURL=sysbaseURL;
    }
    let author='';
    if(axiosConfig.authorization!=''){
            author=axiosConfig.authorization;
    }else{
           author=util.getCookie('Authorization');
    }  
    //实例化的对象
    const instance = axios.create(author==='none'?{}:{
        headers: { 'Authorization':author}
    });
    // 添加请求拦截器     
    instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
          if (axiosConfig.formatData) {
                config.data= qs.stringify(config.data);
          }
          return config;

        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });
    //添加响应拦截器 
     instance.interceptors.response.use((response)=> {
        //console.log('response_start...');
        let data=response.data;
            if(data.success==false){
                if(data.error.code===400){
                    router.replace('/login')
                }
            }
        return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    //初始化配置
    instance(options)
                   .then(response => {
                    const res = response.data;
                    if (response.status!== 200) {
                            console.log(res.error); // for debug
                        reject(res);
                    }
                         resolve(res);
                    })
                    .catch(error => {
                       console.log(error); // for debug
                       reject(error);
                    });
    });
}


