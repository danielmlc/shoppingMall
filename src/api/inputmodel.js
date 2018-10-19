

export class inputModel {
    constructor(maxResultCount=10,draw = 1,sorting="",skipCount=0,queryConditionItem=[]) {
        this.inputModel = {};
        this.inputModel.maxResultCount=maxResultCount,//总条目数
        this.inputModel.draw=draw,
        this.inputModel.sorting=sorting,
        this.inputModel.skipCount=skipCount,  //每页行数
        this.inputModel.queryConditionItem=queryConditionItem
    }
    queryConditionType(type){
        switch(type)
            {
                case 'EQ':  return 'EQ';  break;
                case 'NEQ':  return 'NEQ';  break;
                case 'GT':  return 'GT';  break;
                case 'GTE':  return 'GTE';  break;
                case 'LT':  return 'LT';  break;
                case 'LTE':  return 'LTE';  break;
                case 'LIKE':  return 'LIKE';  break;
                case 'LIKEL':  return 'LIKEL';  break;
                case 'LIKER':  return 'LIKER';  break;
                case 'TreeLeft':  return 'TreeLeft';  break;
                case 'BGT':  return 'BGT';  break;
                case 'SGT':  return 'SGT';  break;
            }
    }
    addqueryConditionItem(items){
            let _this=this;
            _this.inputModel.queryConditionItem=[];
            items.map(function(item,index,arr){
                 var QueryConditionItem={dataField: '', op:"EQ", dataValue:''};
                 QueryConditionItem.dataField=item.key;
                 QueryConditionItem.op=_this.queryConditionType(item.op);
                 QueryConditionItem.dataValue=item.value;
                 QueryConditionItem.DataFieldTwo=item.DataFieldTwo||'';
                 QueryConditionItem.TwoFieldRelation =item.TwoFieldRelation||'';
                 QueryConditionItem.relation=item.relation||'and';
                 _this.inputModel.queryConditionItem.push(QueryConditionItem);  
              })
    }   
}
 
