export default{
    data(){
        return {
            refList:{}
        }
    },
    props: {
        options:{
            type:Array,
            default:function(){
                return []
            }
        },
        constPrams:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },
    methods:{
            renderItem(conf){
                    return conf.map((itemData,index)=>{
                        if(itemData.isLeaf){
                            //子节点
                            if(itemData.panel===undefined){
                            return  <yl-div  styleConf={itemData.style}>
                                        <yl-renderComs    
                                            option={itemData.option}
                                            outParams={itemData.outParams}
                                            constPrams={this.constPrams}
                                            refList={this.refList}
                                        >
                                        </yl-renderComs>
                                    </yl-div>
                            }else{
                                return <yl-div  styleConf={itemData.style}>
                                                <yl-panel 
                                                    titleConf={itemData.panel.titleConf} 
                                                    styleConf={itemData.panel.style} 
                                                >
                                                    <slot>
                                                        <yl-renderComs     
                                                            option={itemData.option}
                                                            outParams={itemData.outParams}
                                                            constPrams={this.constPrams}
                                                            refList={this.refList}
                                                        >
                                                        </yl-renderComs>
                                                    </slot>
                                               </yl-panel>
                                    </yl-div>
                            }
                        }else{
                            if(itemData.scroll!==undefined){
                                return    <yl-div  styleConf={itemData.style}>
                                                <cube-scroll 
                                                    ref={itemData.scroll.ref}
                                                    options={itemData.scroll.options}
                                                    direction={itemData.scroll.direction}
                                                >
                                                    {
                                                        this.renderItem(itemData.childContent)
                                                    }
                                                </cube-scroll>
                                            </yl-div>
                            }
                            else{
                                return  <yl-div  styleConf={itemData.style}>
                                        {
                                            this.renderItem(itemData.childContent)
                                        }
                                        </yl-div>
                            }
                        }
                    })  
         },
        _method1(node,_this){
            this.$emit('method1',node,_this);
        },
        _method2(node,_this){
            this.$emit('method2',node,_this);
        },
        _method3(node,_this){
            this.$emit('method3',node,_this);
        },
        _method4(node,_this){
            this.$emit('method4',node,_this);
        },
    },
    computed:{
       
    },
    components:{
    },
    mounted(){
    },
    render: function(h){
        let conf=this.options;
        if(conf.length>0){
          return  <yl-div style="width:100%;height:100%"> 
                     { 
                          this.renderItem(conf)
                     }
                 </yl-div>
        }
    }
}