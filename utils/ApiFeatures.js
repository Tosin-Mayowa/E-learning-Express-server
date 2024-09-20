class ApiFeatures{
    constructor(queryModel,queryString){
        this.queryModel=queryModel;
        this.queryString=queryString
    }
    buildQuery(queryParams){
        const filterOptions={};
        for(let key in queryParams){
            if(typeof queryParams[key]==='object'){
                for(let operator in queryParams[key]){
                    if(operator==='lte'){
                        filterOptions[key]={...filterOptions[key],$lte:queryParams[key][operator]}
                    }else if(operator==='lt'){
                        filterOptions[key]={...filterOptions[key],$lt:queryParams[key][operator]} 
                    }else if(operator==='gt'){
                        filterOptions[key]={...filterOptions[key],$gt:queryParams[key][operator]} 
                    }else{
                        filterOptions[key]={...filterOptions[key],$gte:queryParams[key][operator]} 
                    }
                }
            }else{
                filterOptions[key]=queryParams[key]
            }
        }
        return filterOptions;
    }
    filter(){
        let queryFilterOptions=this.buildQuery(this.queryString);
        this.queryModel=this.queryModel.find(queryFilterOptions);
        return this;
    }
    sort(){
        let sortFields=this.queryString.sort.split(',');
        let sortOptions={};
        sortFields.forEach(field=>{
          if(field.startsWith("-")){
             sortOptions[field.slice(1)] =-1;
          }else{
              sortOptions[field]=1;
          }
        });
  
       this.queryModel=this.queryModel.sort(sortOptions);
       return this;
    }
    limitField(){
        const fields=this.queryString
    }
}


module.exports=ApiFeatures;