import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {Outil} from 'src/models/outil'

@Injectable({
  providedIn: 'root'
})
export class OutilService {


  constructor(private http: HttpClient) { }

  PostOutilList(outil:any): Promise<Outil>{
    return this.http.put<Outil>(environment.gatewayEndpoint + '/outil-service/outils/'+outil['id'],outil).toPromise();
  }
  
  PutOutilList(outil :Outil): Promise<Outil>{
    console.log(outil);
    return this.http.put<Outil>(environment.gatewayEndpoint + '/outil-service/outils/'+outil['id'],outil).toPromise();
  }

  deleteOutilList(id:string): Promise<void> {
    return this.http.delete<void>(environment.gatewayEndpoint + '/outil-service/outils/'+id).toPromise();   
    
  }
  getOutilList(): Promise<Outil[]> {
    return this.http.get<Outil[]>(environment.gatewayEndpoint + '/outil-service/outils').toPromise();   
    
  }
  
  getEvent(): Promise<Outil[]> {
    return this.http.get<Outil[]>(environment.gatewayEndpoint + '/membre-service/outils').toPromise();   
    
  }
  getOutilById(id:string):Promise<Outil> {
    return this.http.get<Outil>(environment.gatewayEndpoint + '/outil-service/outils/'+id).toPromise();   
    
  }
 getOutilByMember(id:string):Promise<Outil[]>{
   return this.http.get<Outil[]>(environment.gatewayEndpoint+'/membre-service/outils/developpeur/'+id).toPromise();
   
 }
  
  
}


