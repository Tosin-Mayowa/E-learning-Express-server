class ApiFeatures{
    constructor(queryModel,queryString){
        this.queryModel=queryModel;
        this.queryString=queryString
    }
    buildQuery(queryParams){

        let filterOptions={};
    
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
    filter() {
        let queryFilterOptions = this.buildQuery(this.queryString);
        if(queryFilterOptions.sort||queryFilterOptions.fields||queryFilterOptions.limit||queryFilterOptions.page){
            const {sort,page,limit,fields,...rest}=queryFilterOptions ;
            console.log({rest});
            
            this.queryModel = this.queryModel.find({...rest});  
        }else{
            this.queryModel = this.queryModel.find(queryFilterOptions);
        }
        
        return this;
    }

    sort(){
        let sortOptions={};
        console.log(this.queryString.sort);
        
       if(this.queryString.sort){
        if(this.queryString.sort.includes(",")){
            let sortFields=this.queryString.sort.split(',');
       
        sortFields.forEach(field=>{
          if(field.startsWith("-")){
             sortOptions[field.substring(1)] =-1;
          }else{
              sortOptions[field]=1;
          }
        });
        }else{
if(this.queryString.sort.startsWith("-")){
    sortOptions[this.queryString.sort.slice(1)]=-1;
    console.log(sortOptions);
}else{
    sortOptions[this.queryString.sort]=1;
    console.log(sortOptions,2);
}
        }
        console.log(sortOptions,3);
       this.queryModel=this.queryModel.sort(sortOptions);
       }else{
this.queryModel=this.queryModel.sort({createdAt:-1});
       }
       return this;
    }
    limitField(){
        if(this.queryString.fields){
            const fields=this.queryString.fields.split(",").join(" ");
        this.queryModel=this.queryModel.select(fields);
        }else{
            this.queryModel=this.queryModel.select("-__v"); 
        }
        return this;
    }
 pagination(){
    
        let page=parseInt(this.queryString.page)||1;
        let limit=parseInt(this.queryString.limit)||10;
        let skip=(page-1)*limit;
        this.queryModel=this.queryModel.limit(limit).skip(skip);
    //     if(this.queryString.page){

    // }
    return this;
 }

}


module.exports=ApiFeatures;





























































































































