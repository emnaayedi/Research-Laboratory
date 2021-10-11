
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { FiliereService } from '../../../services/filiere.service';
import { Filiere } from './filiere';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.css']
})
export class FiliereComponent implements OnInit {
  
  filierForms : FormArray = this.fb.array([]);
  filiereList:Filiere[];  
  classe: string[];  
  notification = null;
  notificationG = null;

  niveau: string[];  
  groupe: string[]; 
  static nomGroup:string;
  static idGroup:number;
  static niveau:number;
  static valueN:number;
  classForms : FormArray = this.fb.array([]);
  static fil:number;
   open:boolean =false;
  static select:boolean =false;
  static  val:number;
  FiliereComponent=FiliereComponent;
  static clickAdd:boolean=false;
x:boolean=false;
y:boolean=false;
test:string;
  constructor(private fb: FormBuilder,
     private filiereService : FiliereService,private router: Router) { 
      this.router.routeReuseStrategy.shouldDetach(undefined);
}
   

  ngOnInit() {
   
    this.filiereService.getFiliereList()
    .subscribe(res => {
     if (res == [])
          this.addFiliereForms();
     else {
       //generate formarray as per the data received from Filiere table
       (res as []).forEach((filiere: any) => {
         this.filierForms.push(this.fb.group({
           CodeFil : [filiere.codeFil],
           NomFil : [filiere.nomFil,Validators.required]
         }));
       });
     }
   }
 );  

 

    this.getListFil(); 

  }

  public getListFil() {
    this.filiereService.getFil()
        .subscribe(
            users => {
             this.filiereList = users;
             console.log(this.filiereList);
              
            },
           
            err => {
                  
                })
              }

 
  
  addFiliereForms(){
    this.filierForms.push(this.fb.group({
      CodeFil : [0],
      NomFil : ['',Validators.required]
    }));
  }

  

  recordSubmit(fg : FormGroup){
    if (fg.value.CodeFil == 0){

     this.filiereService.PostFiliereList(fg.value)
            .subscribe((res : any) => {
                fg.patchValue({CodeFil :res.codeFil})
                this.showNotification('insert');

            }); 
          } 
    else
    this.filiereService.PutFiliereList(fg.value).subscribe(
      (res: any) => {
        this.showNotification('update');
      });
  }

  onDelete(CodeFil, i) {
    if (CodeFil == 0)
      this.filierForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.filiereService.deleteFiliereList(CodeFil).subscribe(
        res => {
          this.filierForms.removeAt(i);
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

  showNotificationG(category) {
    switch (category) {
      case 'insert':
        this.notificationG = { class: 'text-success', message: 'saved!' };
        break;
      case 'update':
        this.notificationG = { class: 'text-primary', message: 'updated!' };
        break;
      case 'delete':
        this.notificationG = { class: 'text-danger', message: 'deleted!' };
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.notificationG = null;
    }, 3000);
  }



 
 
  

 
 

}