import Vue from 'vue'

//滴滴库组件
import Cube from 'cube-ui'
Vue.use(Cube)


import renderComs from '../rendercoms/renderComs.vue';
import formComs from '../rendercoms/formComs.vue';
import listshowcoms from '../rendercoms/listShowComs.vue';
import Container from './container/Container.vue';
import filterContanier from './container/filterContanier.vue';
import form from './form/form.vue';
import ECharts from './chart';


//自定义组件库
import timebar from './formcom/timebar';
import div from './layout/div.vue';
import html from './html/html.vue';
import panel from './panel/panel.vue';
import header from './header/header.vue';
import cell from './cell/cell.vue';
import grid from './grid/grid.vue';
import linkblock from './linkBlock/linkblock';

import infoListCard from './infoshow/infoListCard.vue';
import infoListReport from './infoshow/infoListReport.vue';
import infoListTable from './infoshow/infoListTable.vue';
import listscroll from './infoshow/listScroll.vue';
import slide from './slide/slide.vue';
import treeselect from './formcom/treeselect/treeSelect.vue';
import treepanel from './formcom/treeselect/treePanel.vue';

import splitline from './splitLine/splitline.vue';
import counter from './formcom/counter/counter.vue';

Vue.component('yl-counter',counter)
Vue.component('yl-renderComs',renderComs)
Vue.component('yl-formComs',formComs)
Vue.component('yl-listshowcoms',listshowcoms)
Vue.component('yl-Container',Container)
Vue.component('yl-filter',filterContanier)
Vue.component('yl-form',form)
Vue.component('yl-echarts',ECharts)
Vue.component('yl-div',div)
Vue.component('yl-html',html)
Vue.component('yl-panel',panel)
Vue.component('yl-header',header)
Vue.component('yl-cell',cell)
Vue.component('yl-grid',grid)
Vue.component('yl-infolistcard',infoListCard)
Vue.component('yl-infolistreport',infoListReport)
Vue.component('yl-infolisttable',infoListTable)
Vue.component('yl-listscroll',listscroll)
Vue.component('yl-timebar',timebar)
Vue.component('yl-slide',slide)
Vue.component('yl-linkblock',linkblock)
Vue.component('yl-treeselect',treeselect)
Vue.component('yl-treepanel',treepanel)
Vue.component('yl-splitline',splitline)