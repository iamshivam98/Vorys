import { api, LightningElement, track, wire } from 'lwc';
import getEmployeeList from '@salesforce/apex/getEmployeeInvestment.EmployeeList';


export default class DisplayContactsOnAccountName extends LightningElement{

    @track accData=[];
    @track errorAccData;
		@track singleEmp={};
 
    @track columnTable =[
        {label:' Name',fieldName:'Name',type:'text'},
        {label:'Department',fieldName:'Department__c',type:'Picklist'},
        {label:'Designation',fieldName:'Designation__c',type:'text'},
        {label:'Investment Amount',fieldName:'Investment_Amount',type:'currency'},
        
    ];
 
    @wire(getEmployeeList)    
    dataTableAcc({data, error}){ 
      console.log(data);
         if(data){
            for(let emp in data){
				var samp = Object.create(data[emp]);
			    samp.Name=data[emp].Name_of_Employee__r.Name;
				samp.Department__c=data[emp].Name_of_Employee__r.Department__c;
				samp.Designation__c=data[emp].Name_of_Employee__r.Designation__c;
				samp.Investment_Amount=data[emp].Investment_Amount__c;
				this.accData.push(samp);
            }
			this.accData=JSON.parse(JSON.stringify(this.accData));
        }
        else if(error){ 
          console.log(error);
          this.errorAccData = error; 
        }
 
    }
}