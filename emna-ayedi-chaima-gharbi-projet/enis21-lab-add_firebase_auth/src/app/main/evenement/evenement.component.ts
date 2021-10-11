import { Component, OnInit, Input } from '@angular/core';

import {MatDialogModule, MatDialog,MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EvenementService } from '../../../services/evenement.service';
import { CalendarOptions, diffWholeWeeks } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment'
import * as moment from 'moment';

import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Color } from 'angular-bootstrap-md';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Evenement } from 'src/models/evenement';



@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit{
  cheminImage:any = "../images/s42.jpg";
  email: string;
  x:number =0;
  y:number=0;
  z:number=0;
  today: Date;
  today7: Date;
  d11: number;
  today0: Date;
  div1:boolean=false;
  classeForms : FormArray = this.fb.array([]);

  evenementForms : FormArray = this.fb.array([]);
  evenementList= [];
  notification = null;
  public dateTimeRange: any;
  posts = [];
  niveau: string[];  
    groupe: string[]; 
    classe: string[];  
    filiere: string[];  
    evenement: string[];
    matiere:string[];
    enseignant:string[];
    salle:string[];
    static nom:string;
    static code:number;
    static nomGroup:string;
    static idGroup:number;
    static niveau:number;
    static valueN:number;
    static nomEns:string;
    static codeEns:number;
   private event:Evenement;
static is:boolean=false;
    EvenementComponent = EvenementComponent;
    
  calendarOptions: CalendarOptions = {
  expandRows:true
  
  }
  grp: boolean=false;
  ens: boolean=false;
  back: any;
  handleDateClick(arg) {
    alert('date click! ' + arg.date);
    console.log(arg);
  }
  
     
    
  
    
  constructor(private router: Router,private dialog: MatDialog, private fb: FormBuilder ,private evenementService : EvenementService){ 
 
    this.router.routeReuseStrategy.shouldDetach(undefined);
    
  }
  
  
  ngOnInit() { 
    
  
   
    this.evenementService.getEvenementList().then(  
      
      data => {   (data['_embedded']['evenements']).forEach((evenement: any) => {
        this.evenementForms.push(this.fb.group({
         id : [evenement.id],
         titre : [evenement.titre],
         lieu : [evenement.lieu ],
        dateDebut : [evenement.dateDebut ],
        dateFin : [evenement.dateFin ],

    }));
  
    
  
 setTimeout(() => {
  this.notification = null;
}, 1000);


});});
this.ss();
this.sa();
}

addEvenementForms(){
  this.evenementForms.push(this.fb.group({
    id : [0],
    titre : ['',Validators.required],
   lieu : ['',Validators.required],
   dateDebut : ['',Validators.required],
   dateFin : ['',Validators.required],  }));
}
openModal(id: string) {
  this.evenementService.open(id);
}

closeModal(id: string) {
  this.evenementService.close(id);
  window.location.reload();
}
openDialog(): void {
  const dialogRef = this.dialog.open(EvenementComponent, {
    width: '1200px',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    this.email = result;
  });
}
sa(){    
  setTimeout(() => {
   this.calendarOptions = {

    initialView: 'timeGridWeek',
    slotDuration: '02:00',slotMinTime:'08:00:00',slotMaxTime:'19:00:00'
  ,
  slotMinWidth:100,
 

 
  contentHeight: 700,
  hiddenDays:[0],

  //dayHeaderFormat: this.dayHeaderFormatUsingMoment,
  dateClick: this.handleDateClick.bind(this),


  
 expandRows:true,
 aspectRatio: 1.5,
 events:this.posts,

 
  };
  }, 3000);

  }
 

  recordSubmit(fg : FormGroup){
    if (fg.value.id == 0){


      this.evenementService.PostEvenementList(fg.value)
             .then((res : any) => {
               console.log(res);
                 fg.patchValue({id :res['id']});
                 this.showNotification('insert');
                 console.log("fg.value", fg.value);
 
             });}
     else{
     this.evenementService.PutEvenementList(fg.value).then((res: any) => {
      console.log(res);
         this.showNotification('update');
       }); }
  
  }
  

  onDelete(id, i) {
   if (id== 0)
     this.evenementForms.removeAt(i);
   else if (confirm('Are you sure to delete this record ?'))
     this.evenementService.deleteEvenementList(id).then(
      (res: any)=> {
        console.log(res);
         this.evenementForms.removeAt(i);
         this.showNotification('delete');
       });
  }
    
ss(){
  this.posts=[]
  setTimeout(() => {
    function checkTime(i) {
      return (i < 10) ? "0" + i : i;
  }
    //Api call to get data from php file
  
    return this.evenementService.getEvenementList().then(data => {(data['_embedded']['evenements']).forEach((evenement: any) =>{
        let s=evenement.dateDebut;
        let newDate=new Date(s)
        this.today=new Date();
        let dd=this.today.getDay();
         this.d11= this.today.getDate();
         this.today7=new Date();
         this.today7.setDate(this.d11-dd+6);
         this.today0=new Date();
         this.today0.setDate(this.d11-dd);
        let x =newDate.getDay();
        console.log(x);
      
        this.today.setDate(checkTime(x+this.d11-dd));
        let year =new Date().getFullYear();
        let month=checkTime(new Date().getMonth()+1); 
       let day=checkTime(this.today.getDate());
        let d=checkTime(newDate.getHours());
        let m=checkTime(newDate.getMinutes());
        let se=checkTime(newDate.getMinutes());
        let s1=evenement.heureFin;
        let newDate1=new Date(s1)
        let d1=checkTime(newDate1.getHours());
        let m1=checkTime(newDate1.getMinutes());
        let se1=checkTime(newDate1.getMinutes());
        if( x==1 || x==4){this.back='#0239b0';}
        else if( x==2|| x==6){this.back='#b0028d'}
        else if ( x==3 || x==5){this.back='#b0024d'}
        // else if ( (x==1&&(d=="10" ||d=="16"))||(x==4&&(d=="10" ||d=="16"))){this.back='#02a1b0'}
        // else if ( (x==2&&(d=="10" ||d=="16"))||(x==5&&(d=="10" ||d=="16"))){this.back='#87b002'}
        // else if( (x==3&&(d=="10" ||d=="16"))||(x==6&&(d=="10" ||d=="16"))){this.back='#d6cf3e'}
                this.posts.push({backgroundColor: this.back,title:evenement.titre+"\n"+evenement.lieu+"\n"+evenement.dateDebut+"\n"+evenement.dateFin,start:evenement.dateDebut,end:evenement.dateFin});
          console.log(this.posts);})});
        }
         
, 2000); }
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
 
  }
  
  dayHeaderFormatUsingMoment(info) {
   
    //return moment(info.date.marker).format("dddd"); //output : Tue, 21/07/2020
}

public SearchFil($event) {
  
  this.x+=1;

  console.log(this.x);
  if(EvenementComponent.valueN!=null && EvenementComponent.idGroup!=null || this.x>1){
    
    this.ss();
    this.sa();}
 
  
 
  let id = $event.target.options[$event.target.options.selectedIndex].text;
  EvenementComponent.nom=id;
  EvenementComponent.code=parseInt($event.target.value);
  let xcode=$event.target.value;
  console.log(EvenementComponent.nom);
  return xcode;

}
public SearchGroup($event) {
  this.y+=1;
  
  console.log(this.y);
  if(EvenementComponent.valueN!=null && EvenementComponent.code!=null || this.y>1){
  this.ss();
  this.sa();}
  let id = $event.target.options[$event.target.options.selectedIndex].text;
  EvenementComponent.nomGroup=id;
  EvenementComponent.idGroup=parseInt($event.target.value);
  let xcode=$event.target.value;
  console.log(EvenementComponent.nomGroup);
  return xcode;

}

public SearchNiveau($event){
  this.z+=1;console.log(this.z);
  
  if(EvenementComponent.idGroup!=null && EvenementComponent.code!=null || this.z>1){
    this.ss();
    this.sa();}
  

  
 let id = $event.target.options[$event.target.options.selectedIndex].text;
 EvenementComponent.niveau=id;
 EvenementComponent.valueN=parseInt($event.target.value);
  let xcode=$event.target.value;
  console.log(EvenementComponent.niveau);
  return xcode;
}
public SearchEns($event) {  
  this.ss();
  this.sa();
  let id = $event.target.options[$event.target.options.selectedIndex].text;
  EvenementComponent.nomEns=id;
  EvenementComponent.codeEns=parseInt($event.target.value);
  let xcode=$event.target.value;
  console.log(EvenementComponent.codeEns);
  return xcode;


}

openChoice(is){
  if(is==false){
    
    EvenementComponent.is=true;
  }
  else{
   EvenementComponent.is=false;
  }
  return EvenementComponent.is;
 
  
}
openChoiceEns(){
  this.grp=false;
  this.ens=true;
}

}