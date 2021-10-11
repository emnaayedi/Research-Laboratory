import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Publication } from 'src/models/publication';
import { Member } from 'src/models/member';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  constructor(private http: HttpClient) { }

 
  getUsers(): Observable<any[]> {
        return this.http.get<any[]>(environment.apiBaseURI + '/Publication');

}

Search(etablissement:string): Promise<Publication[]> {
  return this.http.get<Publication[]>(environment.gatewayEndpoint + '/membre-service/publication/'+etablissement).toPromise();
}

PostPublicationList(publication:any): Promise<Publication>{
  return this.http.put<Publication>(environment.gatewayEndpoint + '/publication-service/publications/'+publication['id'],publication).toPromise();
}

PutPublicationList(publication :Publication): Promise<Publication>{
  console.log(publication);
  return this.http.put<Publication>(environment.gatewayEndpoint + '/publication-service/publications/'+publication['id'],publication).toPromise();
}
getPubByMember(id:string):Promise<Publication[]> {
  return this.http.get<Publication[]>(environment.gatewayEndpoint + '/membre-service/publications/auteur/'+id).toPromise();   
  
}

deletePublicationList(id:string): Promise<void> {
  return this.http.delete<void>(environment.gatewayEndpoint + '/publication-service/publications/'+id).toPromise();   
  
}
getPublicationList(): Promise<Publication[]> {
  return this.http.get<Publication[]>(environment.gatewayEndpoint + '/publication-service/publications').toPromise();   
  
}
getPublicationById(id:string):Promise<Publication> {
  return this.http.get<Publication>(environment.gatewayEndpoint + '/publication-service/publications/'+id).toPromise();   
  
}
  


}
