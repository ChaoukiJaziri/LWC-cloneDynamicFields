import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FormClone extends LightningElement {
    @api objectapiname;
    @api recordid;
    @api fields;
      

   
    //get all the record data
    @wire(getRecord, {recordId : '$recordid', fields: '$fields'}) record ;

    //get the selectedFields data from the record
    get clonedFields() {
                 
        // check result
        if(this.record.data) {
            //define an array key, value to be sent 
            let clonedFields = [];
           
            for (let i=0; i< this.fields.length; i++) {
               //extract the short fieldName from the full name to be sent to the lightning-form component
               const tmpArray = this.fields[i].split(".");
             
               let fieldName = tmpArray[1];
              // get the value of each field
               let fieldValue = getFieldValue(this.record.data, this.fields[i]);
              //push fieldName and fieldValue for each field
               clonedFields.push({key : fieldName, value : fieldValue });
            }
           
            return clonedFields;
            }
            else return null;
        
           }
       
           //display a success message when created and send the new record Id created so far
           handleSuccess(event) {
           
           this.dispatchEvent( new ShowToastEvent({title: 'Success', message: 'New record created successfully', variant: 'success'  }));
           this.dispatchEvent(  new CustomEvent('created', {   detail: event.detail.id}));
               
          
        
        }
    }

