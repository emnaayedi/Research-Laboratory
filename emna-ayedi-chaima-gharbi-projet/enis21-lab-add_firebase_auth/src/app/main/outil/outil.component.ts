import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { OutilService } from '../../../services/outil.service';


@Component({
  selector: 'app-outil',
  templateUrl: './outil.component.html',
  styleUrls: ['./outil.component.css']
})
export class OutilComponent implements OnInit {
  isLoggedIn: boolean;
  user: any;  outilForms : FormArray = this.fb.array([]);
  outilList= [];
  notification = null;

  constructor(  private fb: FormBuilder , private outilService : OutilService) { }

  ngOnInit(){
    
    this.outilService.getOutilList().then(  
      
      data => {   (data['_embedded']['outils']).forEach((outil: any) => {
        this.outilForms.push(this.fb.group({
         id : [outil.id],
         source : [outil.source ],
         date : [outil.date],
    }));
  



});}); 
  }
  addOutilForms(){
    this.outilForms.push(this.fb.group({
      id:[0],
      date:["dd/mm/yyyy, hh:mm",Validators.required],
      source: ['',Validators.required]
    }));
  }

  recordSubmit(fg : FormGroup){
    if (fg.value.id == 0){


      this.outilService.PostOutilList(fg.value)
             .then((res : any) => {
               console.log(res);
                 fg.patchValue({id :res['id']});
                 this.showNotification('insert');
                 console.log("fg.value", fg.value);
 
             });}
     else{
     this.outilService.PutOutilList(fg.value).then((res: any) => {
      console.log(res);
         this.showNotification('update');
       }); }
  
  }

  onDelete(id, i) {
    if (id== 0)
      this.outilForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.outilService.deleteOutilList(id).then(
       (res: any)=> {
         console.log(res);
          this.outilForms.removeAt(i);
          this.showNotification('delete');
        });
   }

  showNotification(category) {
    switch (category) {
      case 'insert':
        this.notification = { class: 'text-success', message: 'saved!' };
        break;
      case 'update':
        this.notification = { class: 'text-primary', message: 'updated!' };
        break;
      case 'delete':
        this.notification = { class: 'text-danger', message: 'deleted!' };
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

}