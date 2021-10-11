import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MembreService } from '../../../services/membre.service';
import { PublicationService } from '../../../services/publication.service';
import { FiliereService } from '../../../services/filiere.service';

import { EvenementService } from '../../../services/evenement.service';

import { OutilService } from '../../../services/outil.service';
//import { ModComponent } from '../mod/mod.component'
import { MatDialogModule, MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Enseignant } from 'src/models/enseignant';
import { Etudiant } from 'src/models/etudiant';
import { Publication } from 'src/models/publication';
import { Outil } from 'src/models/outil';
import { Evenement } from 'src/models/evenement';
import { Member_evenement } from 'src/models/member_evenement';
import { newArray } from '@angular/compiler/src/util';


@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {
  etudiantForms: FormArray = this.fb.array([]);
  enseignantForms: FormArray = this.fb.array([]);
  even_member_Forms: FormArray = this.fb.array([]);
  outil_member_Forms: FormArray = this.fb.array([]);
  static etudiantChoice: boolean = false;
  static enseignantChoice: boolean = false;
  static recherche: boolean = false;


  pub_member_Forms: FormArray = this.fb.array([]);

  static vale: string;
  static list: String[] = new Array<String>();
  notification = null;

  static password: string;
  etudiantList: Etudiant[];
  enseignantList: Enseignant[];
  enseignant_Grade = [];
  enseignant_Etablissement = [];
  enseignant_without_duplicates_Etablissement = [];
  enseignant_without_duplicates_Grade = [];
  searchEtablissementList: Enseignant[];
  searchGradeList: Enseignant[];


  pubList: Publication[];
  outilList: Outil[];
  eventList: Evenement[];
  MembreComponent = MembreComponent;
  static open: boolean = false;
  evenementForms: FormArray = this.fb.array([]);
  outilForms: FormArray = this.fb.array([]);
  publicationForms: FormArray = this.fb.array([]);




  static is: boolean = false;
  static o: boolean = true;
  static x: boolean = true;
  static y: boolean = true;


  constructor(private fb: FormBuilder,
    private moduleService: MembreService, private publicationService: PublicationService, private outilService: OutilService,
    private evenementService: EvenementService, private router: Router) {
    this.router.routeReuseStrategy.shouldDetach(undefined);
  }
  ngOnInit() {


    this.moduleService.getOutilList().then(

      outils => {
        console.log(outils); this.outilList = outils['_embedded']['outilBeans'];


      });
    this.moduleService.getPubList().then(

      pubs => {
        this.pubList = pubs['_embedded']['publicationBeans'];


      });
    this.evenementService.getEvenementList().then(

      events => {
        console.log(events); this.eventList = events['_embedded']['evenements'];


      });
    this.moduleService.getAllEtudiants()
      .then(
        members => {
          this.etudiantList = members;
          console.log(this.etudiantList);
          return this.etudiantList;
        },
        err => {
          // Log errors if any

        });

    this.moduleService.getAllEnseignants()
      .then(
        members => {
          this.enseignantList = members;
          console.log(this.enseignantList);
          return this.enseignantList;
        });
    this.outilService.getOutilList().then(

      data => {
        (data['_embedded']['outils']).forEach((evenement: any) => {
          this.outilForms.push(this.fb.group({
            id: [evenement.id],
            date: [evenement.date],
            source: [evenement.source],


          }));
        })
      });
    this.publicationService.getPublicationList().then(

      data => {
        (data['_embedded']['publications']).forEach((publication: any) => {
          this.publicationForms.push(this.fb.group({
            id: [publication.id],
            titre: [publication.titre],
            lien: [publication.lien],
            dateApparition: [publication.dateApparition],
            type: [publication.type],
            sourcePdf: [publication.sourcePdf],

          }));
          console.log(data);
        });
      });
    this.evenementService.getEvenementList().then(

      data => {
        (data['_embedded']['evenements']).forEach((evenement: any) => {
          this.evenementForms.push(this.fb.group({
            id: [evenement.id],
            titre: [evenement.titre],
            lieu: [evenement.lieu],
            dateDebut: [evenement.dateDebut],
            dateFin: [evenement.dateFin],

          }));
        });
      });



  }

  public removeDuplicates(x: boolean) {
    MembreComponent.recherche = !x;
    for (let i = 0; i < this.enseignantList.length; i++) {
      console.log(this.enseignantList[i].grade);
      console.log(this.enseignantList[i].etablissement);
      this.enseignant_Grade.push(this.enseignantList[i].grade,)
      this.enseignant_Etablissement.push(this.enseignantList[i].etablissement);
    }
    this.enseignant_without_duplicates_Etablissement = Array.from(new Set(this.enseignant_Etablissement));
    this.enseignant_without_duplicates_Grade = Array.from(new Set(this.enseignant_Grade));
    console.log("enseignant_without_duplicates: " + this.enseignant_without_duplicates_Etablissement);
    console.log("enseignant_without_duplicates:;;;;:: " + this.enseignant_without_duplicates_Grade);
  }

  public SearchEtablissement(etablissement: string) {
    console.log("searchEtablissement : " + etablissement);

    this.moduleService.SearchEtablissement(etablissement)
      .then(
        members => {
          this.searchEtablissementList = members;
          console.log(this.searchEtablissementList);
          return this.searchEtablissementList;
        },

        err => {
        }

      )

    setTimeout(() => {
      this.enseignantForms.clear();
      for (let i = 0; i < this.searchEtablissementList.length; i++) {

        this.enseignantForms.push(this.fb.group({
          id: [this.searchEtablissementList[i].id, Validators.required],
          cin: [this.searchEtablissementList[i].cin, Validators.required],
          nom: [this.searchEtablissementList[i].nom, Validators.required],
          prenom: [this.searchEtablissementList[i].prenom, Validators.required],
          dateNaissance: [this.searchEtablissementList[i].dateNaissance, Validators.required],
          email: [this.searchEtablissementList[i].email, Validators.required],
          cv: [this.searchEtablissementList[i].cv],
          grade: [this.searchEtablissementList[i].grade, Validators.required],
          etablissement: [this.searchEtablissementList[i].etablissement, Validators.required],
          password: [this.searchEtablissementList[i].password],

        }));

      }
      this.searchEtablissementList.length = 0;

    }, 1000);






  }


  public SearchGrade(grade: string) {
    console.log("SearchGrade : " + grade);

    this.moduleService.SearchGrade(grade)
      .then(
        members => {
          this.searchGradeList = members;
          console.log(this.searchGradeList);
          return this.searchGradeList;
        },

        err => {
        }

      )

    setTimeout(() => {
      this.enseignantForms.clear();
      for (let i = 0; i < this.searchGradeList.length; i++) {

        this.enseignantForms.push(this.fb.group({
          id: [this.searchGradeList[i].id, Validators.required],
          cin: [this.searchGradeList[i].cin, Validators.required],
          nom: [this.searchGradeList[i].nom, Validators.required],
          prenom: [this.searchGradeList[i].prenom, Validators.required],
          dateNaissance: [this.searchGradeList[i].dateNaissance, Validators.required],
          email: [this.searchGradeList[i].email, Validators.required],
          cv: [this.searchGradeList[i].cv],
          grade: [this.searchGradeList[i].grade, Validators.required],
          etablissement: [this.searchGradeList[i].etablissement, Validators.required],
          password: [this.searchGradeList[i].password],

        }));

      }
      this.searchGradeList.length = 0;

    }, 1000);






  }


  openChoiceEtudiant() {
    MembreComponent.enseignantChoice = false;
    MembreComponent.etudiantChoice = true;
    this.choiceEtudiant();

  }
  openChoiceEnseignant() {
    MembreComponent.etudiantChoice = false;
    MembreComponent.enseignantChoice = true;
    this.ChoiceEnseignant();
  }

  public choiceEtudiant() {
    this.etudiantForms.clear();
    for (let i = 0; i < this.etudiantList.length; i++) {

      this.etudiantForms.push(this.fb.group({
        id: [this.etudiantList[i].id],
        cin: [this.etudiantList[i].cin],
        nom: [this.etudiantList[i].nom],
        prenom: [this.etudiantList[i].prenom],
        dateNaissance: [this.etudiantList[i].dateNaissance],
        dateInscription: [this.etudiantList[i].dateInscription],
        email: [this.etudiantList[i].email],
        //cv : [this.etudiantList[i].cv],
        diplome: [this.etudiantList[i].diplome],
        sujet: [this.etudiantList[i].sujet],
        password: [this.etudiantList[i].password],
        encadrant: [this.etudiantList[i].encadrant.nom+" "+this.etudiantList[i].prenom],


      }));

    }

  }

  public ChoiceEnseignant() {
    this.enseignantForms.clear();
    for (let i = 0; i < this.enseignantList.length; i++) {

      this.enseignantForms.push(this.fb.group({
        id: [this.enseignantList[i].id],
        cin: [this.enseignantList[i].cin],
        nom: [this.enseignantList[i].nom],
        prenom: [this.enseignantList[i].prenom],
        dateNaissance: [this.enseignantList[i].dateNaissance],
        email: [this.enseignantList[i].email],
        cv : [this.enseignantList[i].cv],
        grade: [this.enseignantList[i].grade],
        etablissement: [this.enseignantList[i].etablissement],

      }));

    }


  }


  addMembreFormsEtudiant() {
    this.etudiantForms.push(this.fb.group({

      id: [0],
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      email: ['', Validators.required],
      // CV : ['',Validators.required],
      diplome: ['', Validators.required],
      sujet: ['', Validators.required],
      dateInscription: ['', Validators.required],
      encadrant: ['', Validators.required],

    }));
  }

  addMembreFormsEnseignant() {
    this.enseignantForms.push(this.fb.group({

      id: [0],
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      email: ['', Validators.required],
      cv : [''],
      grade: ['', Validators.required],
      etablissement: ['', Validators.required],


    }));
  }


  getPassword(password) {
    MembreComponent.password = password;
  }
  recordSubmitEtudiant(fg: FormGroup) {
    if (fg.value.id == 0) {
      fg.value.password = "0000";
      this.moduleService.PostEtudiantList(fg.value)
        .then((res: any) => {
          fg.patchValue({ id: res['id'] })
          this.showNotification('insert');
          console.log("fg.value", fg.value);

        });
    }
    else {
      //console.log("passwd:  "+ MembreComponent.password);

      this.moduleService.PutEtudiantList(fg.value).then((res: any) => {
        this.showNotification('update');
      });
    }
  }

  recordSubmitEnseignant(fg: FormGroup) {
    if (fg.value.id == 0) {
      fg.value.password = "0000";

      this.moduleService.PostEnseignantsList(fg.value)
        .then((res: any) => {
          fg.patchValue({ id: res['id'] })
          this.showNotification('insert');
          console.log("fg.value", fg.value);

        });
    }
    else {
      this.moduleService.PutEnseignantsList(fg.value).then((res: any) => {
        this.showNotification('update');
      });
    }
  }


  onDeleteEnseignant(id, i) {
    if (id == 0)
      this.enseignantForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.moduleService.deleteMemberList(id).then(
        (res: any) => {
          console.log(res);
          this.enseignantForms.removeAt(i);
          this.showNotification('delete');
        });
  }
  onDeleteEtudiant(id, i) {
    if (id == 0)
      this.etudiantForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.moduleService.deleteMemberList(id).then(
        (res: any) => {
          console.log(res);
          this.etudiantForms.removeAt(i);
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







  affecterPartToEvent(fggg: FormGroup, fg: FormGroup) {
    console.log(fg.value);
    console.log(fggg.value);
    this.moduleService.affecterparticipanttoevenement(fg.value, fggg.value);
  }
  affecterDevToOutil(fggg: FormGroup, fg: FormGroup) {
    console.log(fg.value);
    console.log(fggg.value);
    this.moduleService.affecterdeveloppeurtooutil(fg.value, fggg.value);
  }
  affecterAutToPub(fggg: FormGroup, fg: FormGroup) {
    console.log(fg.value);
    console.log(fggg.value);
    this.moduleService.affecterauteurtopublication(fg.value, fggg.value);
  }
  addEvent_MemberForms(is) {
    if (is == false) {
      MembreComponent.is = true;
      this.even_member_Forms.push(this.fb.group({
        id: ['']
      }));
    }
    else {
      MembreComponent.is = false;
    }
    return MembreComponent.is;

  }

  addOutil_MemberForms(is) {
    if (is == false) {
      MembreComponent.is = true;
      this.outil_member_Forms.push(this.fb.group({
        id: ['']
      }));
    }
    else {
      MembreComponent.is = false;
    }
    return MembreComponent.is;

  }
  addPub_MemberForms(is) {
    if (is == false) {
      MembreComponent.is = true;
      this.pub_member_Forms.push(this.fb.group({
        id: ['']
      }));
    }
    else {
      MembreComponent.is = false;
    }
    return MembreComponent.is;

  }
  openDialog(open, id: string) {

    if (MembreComponent.list.includes(id) == false) {
      this.even_member_Forms = this.fb.array([]);
      this.pub_member_Forms = this.fb.array([]);
      this.outil_member_Forms = this.fb.array([]);
      MembreComponent.vale = id;
      this.outilService.getOutilByMember(id).then(
        evenement2 => {
          if (evenement2.length == 0) { MembreComponent.y = false; } else {
            for (let i = 0; i < evenement2.length; i++) {
              this.outil_member_Forms.push(this.fb.group({
                id: [evenement2[i].id]
              }));
              console.log(evenement2[i].id);
            }
          }
        });
      this.evenementService.getSenaceByMember(id).then(
        evenement => {
          if (evenement.length == 0) { MembreComponent.o = false; } else {
            for (let i = 0; i < evenement.length; i++) {
              this.even_member_Forms.push(this.fb.group({
                id: [evenement[i].id]
              }));
              console.log(evenement[i].id);
            }
          }
        });

      this.publicationService.getPubByMember(id).then(
        evenement3 => {
          if (evenement3.length == 0) { MembreComponent.x = false; } else {
            for (let i = 0; i < evenement3.length; i++) {
              this.pub_member_Forms.push(this.fb.group({
                id: [evenement3[i].id]
              }));
              console.log(evenement3[i].id);
            }
          }
        });

      MembreComponent.open = true;


    }
    else if (open == true && MembreComponent.list.includes(id) == true && MembreComponent.list.length > 1) {
      MembreComponent.list.splice(MembreComponent.list.indexOf(id), 1);
      this.even_member_Forms = this.fb.array([]);
      this.pub_member_Forms = this.fb.array([]);
      this.outil_member_Forms = this.fb.array([]);

    }

    else if (MembreComponent.list.length == 1 && MembreComponent.list.includes(id) == true) {
      MembreComponent.list.splice(MembreComponent.list.indexOf(id), 1);
      this.even_member_Forms = this.fb.array([]);
      this.pub_member_Forms = this.fb.array([]);
      this.outil_member_Forms = this.fb.array([]);
      MembreComponent.open = false;
    }
    return (MembreComponent.open, MembreComponent.vale, MembreComponent.list);
  }










}