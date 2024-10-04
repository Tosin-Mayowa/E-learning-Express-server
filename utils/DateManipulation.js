class DateManipulation {
    constructor(dateOfBirth=new Date(),dueDate=new Date()){
    this.dateOfBirth=new Date(dateOfBirth);
    this.dueDate=new Date(dueDate);
    this.months=['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'];
    this.monthDays30=['Apr','Jun','Sep','Nov'];
    this.monthDays31=['Jan','Mar','May','July','Aug','Oct','Dec']
    }

    calculateAge(){
        let currentDate=new Date();
        const birthYear = this.dateOfBirth.getFullYear();
        const birthMonth = this.dateOfBirth.getMonth();
        const birthDay = this.dateOfBirth.getDate();
        let age = currentDate.getFullYear() - birthYear;
        if (currentDate.getMonth() < birthMonth || (currentDate.getMonth() === birthMonth && currentDate.getDate() < birthDay)) {
            age--;
        }


        this.age = age; 
     
    }
    dueDateCalc(param,param1,n=1){
      let day=new Date(param).getDate()+param1+1;
      let year=new Date(param).getFullYear();
      let month=new Date(param).getMonth();
      
    let monthName=this.months[month];
    console.log(monthName);

    
       if(day>30 && this.monthDays30.includes(monthName)){
           day=day-(30*n);
           month +=(n+1);
             if(month>12){
               month-=12;
               year+=1;
                this.dueDate=new Date(`${year}-${month}-${day}`);
           }
           this.dueDate=new Date(`${year}-${month}-${day}`);
       }
         if(day>30 && this.monthDays31.includes(monthName)){
           day=day-(31*n);
           month +=(1+n);
           if(month>12){
               month-=12;
               year+=1;
                this.dueDate=new Date(`${year}-${month}-${day}`);
           }
          }
           if(day>28 && !this.monthDays31.includes(monthName)&&!this.monthDays30.includes(monthName)){
           day=day-(28 +((n-1)*30));``
            month +=(1+n);
            if(month>12){
                month-=12;
                year+=1;
                 this.dueDate=new Date(`${year}-${month}-${day}`);
            }
           this.dueDate=new Date(`${year}-${month}-${day}`);
       }
   this.dueDate=new Date(`${year}-${month}-${day}`);
   console.log(this.dueDate,"due");
   return this;
    }

    increaseByTwoWeeks(param){
       
        this.dueDateCalc(param,14);  
        return this.dueDate;
    }
      increaseByOneMonth(param){
        this.dueDateCalc(param,30);  
         return this.dueDate;
    }
    increaseByTwoMonths(param){
      this.dueDateCalc(param,60,2);  
         return this.dueDate;
    }
   
    increaseByThreeMonths(param){
      this.dueDateCalc(param,90,3);  
         return this.dueDate;
    }
    increaseByFourMonths(param){
      this.dueDateCalc(param,120,4);  
         return this.dueDate;
    }
    increaseByFiveMonths(param){
      this.dueDateCalc(param,150,5);  
         return this.dueDate;
    }
    increaseBySixMonths(param){
      this.dueDateCalc(param,180,6);  
         return this.dueDate;
    }
}

module.exports=DateManipulation;