
<template>
<div class="yl-assemblePage">
      <yl-header v-if="options.header"
        :title="options.header.elmentConfig.title" 
        :theme="options.header.elmentConfig.theme"
        :left="options.header.elmentConfig.left"
        :right="options.header.elmentConfig.right"
        @leftEvent="_leftEvent"
        @rightEvent="_rightEvent"
        >
      </yl-header>
  <cube-tab-bar 
        class="cube-tab-bar" 
                v-model="selectedLabel" 
                :showSlider="options.tabBarConf.showSlider"
                :inline="options.tabBarConf.inline"
                @change="tabPageChange">
                <cube-tab v-for="(item,index) in options.tabBarConf.tabs" 
                        :icon="item.icon" 
                        :label="item.label" 
                        :key="index">
                </cube-tab>
        </cube-tab-bar>
    <cube-slide class="cube-slide" 
                @change="slidePageChange" 
                :initial-index="sindex"
                :loop="options.slidePanelConf.loop"
                :autoPlay="options.slidePanelConf.autoPlay"
                :interval="options.slidePanelConf.interval"
                :threshold="options.slidePanelConf.threshold"
                :speed="options.slidePanelConf.speed"
                :show-dots="false"
                :options="options.slidePanelConf.options"
                >
                <cube-slide-item v-for="(item, index) in options.panelList" :key="index" >
                    <yl-Container :ref="getRef(index)"
                        :options="item"
                        :isinit="false"
                    >
                    </yl-Container>
                </cube-slide-item>
                
    </cube-slide>
</div>
</template>

<script type="text/babel">
const COMPONENT_NAME = 'yl-assemblePage'
import baseMixn from '@/mixns/base.js';
export default {
    name:COMPONENT_NAME,
    mixins: [baseMixn],
    data () {
        return {
            titleName:this.$route.name,
            selectedLabel:'',
            sindex:0,
            isTrue:false
        }
    },
    props:{
		options:{
			type:Object,
			default:function(){
				return {}
			}
		}
	},
    methods:{
        getRef(i){
            return 'container'+i;
        },
        slidePageChange(i){
           this.selectedLabel=this.options.tabBarConf.tabs[i].label;
            //初始化
            if(!this.isTrue){
                    let refname=this.getRef(i);
                    this.$refs[refname][0].init();
            }
        },
        tabPageChange(i){
             this.options.tabBarConf.tabs.map((data,index)=>{
                if(data.label==i){
                    this.sindex=index;
                    //初始化
                    if(this.isTrue){
                        let refname=this.getRef(index);
                        this.$refs[refname][0].init();
                    }
                }
            })
        },
        _leftEvent(){
					let _this=this
					let eventConf=this.options.header.eventConf;
					if(eventConf!=undefined){
						if(eventConf.isOn){
							if(eventConf.leftEvent!=undefined){
									eventConf.leftEvent(_this);
							}
						}
					}
        },
        _rightEvent(){
                    let _this=this
					let eventConf=this.options.header.eventConf;
                    if(eventConf!=undefined){
                    if(eventConf.isOn){
                        if(eventConf.rightEvent!=undefined){
                            eventConf.rightEvent(_this);
                        }
                    }
                }
        },
    },
    mounted(){
          this.selectedLabel=this.options.tabBarConf.selectedLabel;
          this.isTrue=true;
          this.tabPageChange(this.selectedLabel);
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-assemblePage
     height 100%
     display flex
     flex-direction column
     .cube-tab-bar
         height 40px
         font-size $fontsize-small
     .cube-slide
         flex 1
         width 100%
         overflow hidden

</style>
