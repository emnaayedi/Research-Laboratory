import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Enseignant} from 'src/models/enseignant';
import {Etudiant} from 'src/models/etudiant';
import { Evenement } from 'src/models/evenement';
import { Member } from 'src/models/member';
import { Publication } from 'src/models/publication';
import { Outil } from 'src/models/outil';
import { Member_evenement } from 'src/models/member_evenement';
import { Member_publication } from 'src/models/member_publication';
import { Member_outil} from 'src/models/member_outil';


@Injectable({
  providedIn: 'root'
})
export class MembreService {
  getPubList() : Promise<Publication[]> {
    return this.http.get<Publication[]>(environment.gatewayEndpoint + '/membre-service/publications').toPromise();
  } 
  getEventList() : Promise<Evenement[]> {
    return this.http.get<Evenement[]>(environment.gatewayEndpoint + '/membre-service/evenements').toPromise();
  } 
  getOutilList() : Promise<Outil[]> {
    return this.http.get<Outil[]>(environment.gatewayEndpoint + '/membre-service/outils').toPromise();
  } 
  affecterparticipanttoevenement(participant :Member,evenement:Evenement) :Promise<Member_evenement> {
    let params = new HttpParams()
    .set('idMember', participant['id'])
    .set('idEvent',evenement['id']);
    return this.http.post<Member_evenement>(environment.gatewayEndpoint + '/membre-service/evenements/evenement/'+evenement['id']+'/'+participant['id'] ,{params:params}).toPromise();
  } 
  affecterdeveloppeurtooutil(developpeur :Member,outil:Outil) :Promise<Member_outil> {
    let params = new HttpParams()
    .set('idMember', developpeur['id'])
    .set('idEvent',outil['id']);
    return this.http.post<Member_outil>(environment.gatewayEndpoint + '/membre-service/outils/outil/'+outil['id']+'/'+developpeur['id'] ,{params:params}).toPromise();
  } 
  affecterauteurtopublication(auteur:Member,publication:Publication) :Promise<Member_publication> {
    let params = new HttpParams()
    .set('idMember', auteur['id'])
    .set('idEvent',publication['id']);
    return this.http.post<Member_publication>(environment.gatewayEndpoint + '/membre-service/publications/publication/'+publication['id']+'/'+auteur['id'] ,{params:params}).toPromise();
  } 
  constructor(private http: HttpClient) { }

  getFiliereList(){
    return this.http.get(environment.apiBaseURI + '/Membre');

  }
  SearchEtablissement(etablissement:string): Promise<Enseignant[]> {
    return this.http.get<Enseignant[]>(environment.gatewayEndpoint + '/membre-service/membres/etab/'+etablissement).toPromise();
  }

  SearchGrade(grade:string): Promise<Enseignant[]> {
    return this.http.get<Enseignant[]>(environment.gatewayEndpoint + '/membre-service/membres/grade/'+ grade).toPromise();
  }
  getAllEtudiants(): Promise<Etudiant[]> {
    return this.http.get<Etudiant[]>(environment.gatewayEndpoint + '/membre-service/membres/etudiants').toPromise();
  }


  PostEtudiantList(member: any): Promise<Etudiant> {
    return this.http.post<Etudiant>(environment.gatewayEndpoint + '/membre-service/membres/etudiant', member).toPromise();
  }

  PutEtudiantList(member: Etudiant): Promise<Etudiant> {
    console.log(member);
    return this.http.put<Etudiant>(environment.gatewayEndpoint + '/membre-service/membres/etudiant/' + member['id'], member).toPromise();
  }




  getAllEnseignants(): Promise<Enseignant[]> {
    return this.http.get<Enseignant[]>(environment.gatewayEndpoint + '/membre-service/membres/enseignants').toPromise();
  }

  PostEnseignantsList(member: Enseignant): Promise<Enseignant[]> {
    return this.http.put<Enseignant[]>(environment.gatewayEndpoint + '/membre-service/membres/enseignant' , member).toPromise();
  }

  PutEnseignantsList(member: Enseignant): Promise<Enseignant> {
    console.log(member);
    return this.http.put<Enseignant>(environment.gatewayEndpoint + '/membre-service/membres/enseignant/' + member['id'], member).toPromise();
  }


  deleteMemberList(id: string): Promise<void> {
    return this.http.delete<void>(environment.gatewayEndpoint + '/membre-service/membres/' + id).toPromise();

  }
  


PostMembreList(formData){
  return this.http.post(environment.apiBaseURI + '/Membre',formData);
}

PutMembreList(formData){
  return this.http.put(environment.apiBaseURI + '/Membre/'+ formData.IdMod,formData);
}
getMembreById(id:string):Promise<Member> {
  return this.http.get<Member>(environment.gatewayEndpoint + '/membre-service/membres/'+id).toPromise();   
  
}
deleteMembreList(id){
  return this.http.delete(environment.apiBaseURI + '/Membre/'+id);
}

}