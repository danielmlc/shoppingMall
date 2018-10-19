import fetch from '@/api/fetch';
import util from '@/common/js/util';
import { mapGetters,mapActions } from 'vuex';
export default {
props:{
},
computed:{
    fetchObject:{
        get(){
            return fetch;
        }
    },
    utilObject:{
        get(){
            return util;
        }
    },
    ...mapGetters([ 'getGlobObject1','getGlobObject2','getGlobString1','getGlobString2','getGlobArray1' ]),
},
methods:{ 
...mapActions(['setGlobObject1','setGlobObject2','setGlobString1','setGlobString2','setGlobalArray1']),

    Console(type,text){
        this.$createToast({ txt:text,time:1000,type: type}, false).show();
    }
}
};
