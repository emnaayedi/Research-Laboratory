import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { Evenement } from 'src/models/evenement';
import { Member_evenement } from 'src/models/member_evenement';
import { Member } from 'src/models/member';


@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  constructor(private http: HttpClient) { }
  private modals: any[] = [];

  add(modal: any) {
     this.modals.push(modal);
 }

 remove(id: string) {
     this.modals = this.modals.filter(x => x.id !== id);
 }

 open(id: string) {
     let modal: any = this.modals.filter(x => x.id === id)[0];
     modal.open();
 }

 close(id: string) {
     let modal: any = this.modals.filter(x => x.id === id)[0];
     modal.close();
 }
  PostEvenementList(evenement:any): Promise<Evenement>{
    return this.http.put<Evenement>(environment.gatewayEndpoint + '/evenement-service/evenements/'+evenement['id'],evenement).toPromise();
  }
  
  PutEvenementList(evenement :Evenement): Promise<Evenement>{
    console.log(evenement);
    return this.http.put<Evenement>(environment.gatewayEndpoint + '/evenement-service/evenements/'+evenement['id'],evenement).toPromise();
  }

  deleteEvenementList(id:string): Promise<void> {
    return this.http.delete<void>(environment.gatewayEndpoint + '/evenement-service/evenements/'+id).toPromise();   
    
  }
  getEvenementList(): Promise<Evenement[]> {
    return this.http.get<Evenement[]>(environment.gatewayEndpoint + '/evenement-service/evenements').toPromise();   
    
  }
  
  getEvent(): Promise<Evenement[]> {
    return this.http.get<Evenement[]>(environment.gatewayEndpoint + '/membre-service/evenements').toPromise();   
    
  }
  getEvenementById(id:string):Promise<Evenement> {
    return this.http.get<Evenement>(environment.gatewayEndpoint + '/evenement-service/evenements/'+id).toPromise();   
    
  }
 getSenaceByMember(id:string):Promise<Evenement[]>{
   return this.http.get<Evenement[]>(environment.gatewayEndpoint+'/membre-service/evenements/participant/'+id).toPromise();
   
 }

  
 

}
