import { LightningElement, wire, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';


export default class CloneSelect extends LightningElement {
    @api objectApiName;
    @api recordId;
   
    showSelect = true;
    showCreateForm = false;
    showViewForm = false;
    selectedFields = [];
    newRecordId;
    
     
     //get the objectInfo data   
    @wire(getObjectInfo, { objectApiName: '$objectApiName' }) objectInfo;
     

      
    //get the selected Fields from the checkbox group component
    handleChange(event) {
              
        this.selectedFields =event.detail.value;

    }
    
    //show the create form and hide the select template
    handleClickClone() {
        
        this.showSelect = false;
        this.showCreateForm = true;
    }
    //show the Viewform component and hide the createform template
    handleCreated(event) {
        this.newRecordId = event.detail;
        this.showCreateForm = false;
        this.showViewForm = true;

    }
    handleCloseViewForm() {
        this.showViewForm = false;
        this.showSelect = true;
        this.selectedFields = [];
    }
     //get the returned fields names with their objectApiName from the objectInfo 
    get options() {

        if(this.objectInfo.data) {
            let result = this.objectInfo.data.fields;
         
         //push only the creatable fields  
        let createableFields = [];
        
        for (let key in result ) {
            
            if(result[key].createable == true) {
               
                createableFields.push({label : result[key].label, value : this.objectApiName + '.' + key });

            }
         
           
        }
      
        return createableFields;
        }

        else return null;
        
    }
    
    
}
