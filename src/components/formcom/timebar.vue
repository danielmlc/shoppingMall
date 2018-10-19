<template>
<div class="yl-timebar">
    <div class="text">
        <div class="date">
            <i class="fa fa-clock-o"></i> 
            <span class="spandate">{{beginDate}}</span>&nbsp;-&nbsp;
            <i class="fa fa-clock-o"></i> 
            <span class="spandate">{{endDate}}</span>
        </div>
        <div class="btn">
            <cube-button primary :inline="true" @click="showDateSegmentPicker">选择日期</cube-button>
        </div>
    </div>
    <div class="tool">
        <cube-button primary :inline="true" v-if="btnItems.day" @click="_getDate('day')">本日</cube-button>
        <cube-button primary :inline="true" v-if="btnItems.week" @click="_getDate('week')">本周</cube-button>
        <cube-button primary :inline="true" v-if="btnItems.month" @click="_getDate('month')">本月</cube-button>
        <cube-button primary :inline="true" v-if="btnItems.quarter" @click="_getDate('quarter')">本季</cube-button>
        <cube-button primary :inline="true" v-if="btnItems.year" @click="_getDate('year')">本年</cube-button>
        <cube-button primary :inline="true" v-if="btnItems.all" @click="_getDate('all')">开累</cube-button>
        <span class="currentValue">选项:{{selectiton}}</span>    
    </div>
    
</div>
</template>

<script type="text/babel">
import moment from 'moment';
export default {
    data(){
        return {
            beginDate:'',
            endDate:'',
            selectiton:'',
            dateSegmentData:[
                        {
                            is: 'cube-date-picker',
                            title: '开始时间',
                            min: new Date(1990,0, 1),
                            max: new Date(2030, 11, 31),
                            value: new Date()
                        },
                        {
                            is: 'cube-date-picker',
                            title: '结束时间',
                            min: new Date(1990,0, 1),
                            max: new Date(2030, 11, 31)
                        }
                   ]
        }
    },
    props:{
        btnItems:{
            type:Object,
            default:function(){
                return  {
                    day:true,
                    week:true,
                    month:true,
                    quarter:true,
                    year:true,
                    all:true
                }
            }
        },
        currentValue:{
            type:String,
            default:'month'
        },
        format:{
            type:String,
            default:'YYYY-MM-DD'
        }
    },
    methods:{
        showDateSegmentPicker() {
            this._initSegmentPicker();
            this.dateSegmentPicker.show()
        },
        getDate(){
            this.beginDate=moment(this.beginDate).format(this.format);
            this.endDate=moment(this.endDate).format(this.format);
            return {beginDate:this.beginDate,endDate:this.endDate}
        },
        setDate(beginDate,endDate){
            this.beginDate=moment(beginDate).format(this.format);
            this.endDate=moment(endDate).format(this.format);
        },
        _getDate(type){
            this._initDate(type);
            this.$emit('click',{beginDate:this.beginDate,endDate:this.endDate})
        },
        _initDate(type){
            if(type==='day'){
                 this.selectiton='日';
                 this.beginDate=moment().format('YYYY-MM-DD');
            }else if(type==='week'){
                 this.selectiton='周';
                let weekOfday = moment().format('E');
                this.beginDate= moment().subtract(weekOfday-1, 'days');
            }else if(type==='month'){
                 this.selectiton='月';
                 this.beginDate= moment().format('YYYY-MM')+'-01';
            }else if(type==='quarter'){
                 this.selectiton='季';
                 if(moment().format('Q')==1){
                     this.beginDate= moment().format('YYYY')+'-01-01';
                 }else if(moment().format('Q')==2){
                     this.beginDate= moment().format('YYYY')+'-04-01';
                 }else if(moment().format('Q')==3){
                     this.beginDate= moment().format('YYYY')+'-07-01';
                 }else if(moment().format('Q')==4){
                     this.beginDate= moment().format('YYYY')+'-10-01';
                 }
            }else if(type==='year'){
                 this.selectiton='年';
                  this.beginDate= moment().format('YYYY')+'-01-01';
            }
            else if(type==='all'){
                  this.selectiton='开累';
                  this.beginDate='1900-01-01';
            }
            this.beginDate=moment(this.beginDate).format(this.format);
            this.endDate=moment().format(this.format);
        },
        _initSegmentPicker(){
             this.dateSegmentPicker = this.$createSegmentPicker({
                data: this.dateSegmentData,
                onSelect: (selectedDates, selectedVals, selectedTexts) => {
                    this.beginDate=moment(selectedDates[0]).format(this.format);
                    this.endDate=moment(selectedDates[1]).format(this.format);
                },
                onNext: (i, selectedDate, selectedValue, selectedText) => {
                    this.dateSegmentData[1].min = selectedDate
                    if (i === 0) {
                        this.dateSegmentPicker.$updateProps({
                            data:this.dateSegmentData
                        })
                    }
                }
            })
        },
        init(){
            this._initDate(this.currentValue)
            this.$emit('init',{beginDate:this.beginDate,endDate:this.endDate})
        }

    },
    mounted(){
        this.init();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.yl-timebar
    height 70px
    background $color-white
    font-size $fontsize-small-s
    color $color-grey 
    flex 1
    .tool
        height 40px
        line-height 40px
        padding 0px 5px
        text-align left
        .currentValue
            padding-left 10px
            color $color-blue
    .text
        display flex
        height 30px
        line-height 30px
        padding 0px 5px
        border-bottom 1px solid $color-light-grey-sss
        .date
            flex 1
            font-size $fontsize-small-s
            text-align center
            i
                padding 0px 2px
            .spandate 
                display inline-block
        .btn
            width 60px
            
            
            

</style>
