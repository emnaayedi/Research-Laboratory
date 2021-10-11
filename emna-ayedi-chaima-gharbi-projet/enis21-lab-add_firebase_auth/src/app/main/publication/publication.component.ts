import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicationService } from '../../../services/publication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FiliereService } from '../../../services/filiere.service';

import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MembreService } from '../../../services/membre.service';
import { Router } from '@angular/router';
import { Publication } from 'src/models/publication';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  filierForms: FormArray = this.fb.array([]);
  publicationForms: FormArray = this.fb.array([]);
  filiereList = [];
  moduleList = [];
  niveauList = [];
  publicationList: Publication[];
  notification = null;
  static niveau: number;
  static fil: number;
  static mod: number;
  static open: boolean = false;
  static selectFil: boolean = false;
  static selectNiv: boolean = false;
  static selectMod: boolean = false;

  PublicationComponent = PublicationComponent;
  enseignant_without_duplicates_Etablissement = [];

  static recherche: boolean = false;


  openAff: boolean = false;
  close: boolean = true;
  static val: number;
  isHiddenMat: boolean = false;

  static repeat: number = 0;

  constructor(private fb: FormBuilder,
    private publicationService: PublicationService, private router: Router) {
    this.router.routeReuseStrategy.shouldDetach(undefined);
  }




  ngOnInit() {
    


    this.publicationService.getPublicationList().then(

      data => {
        this.publicationList = data['_embedded']['publications'];
        console.log(this.publicationList);
        (data['_embedded']['publications']).forEach((publication: any) => {
          this.publicationForms.push(this.fb.group({
            id: [publication.id],
            titre: [publication.titre],
            lien: [publication.lien],
            dateApparition: [publication.dateApparition],
            type: [publication.type],
            sourcePdf: [publication.sourcePdf],

          }));



          setTimeout(() => {
            this.notification = null;
          }, 1000);


        });
      });
  }


  publication_type = [];

  public removeDuplicates(x: boolean) {
    PublicationComponent.recherche = !x;
    for (let i = 0; i < this.publicationList.length; i++) {
      console.log(this.publicationList[i].titre);
      this.publication_type.push(this.publicationList[i].type)
    }
    this.enseignant_without_duplicates_Etablissement = Array.from(new Set(this.publication_type));
    console.log("publication_type: " + this.enseignant_without_duplicates_Etablissement);
  }

  searchEtablissementList: Publication[];

  public SearchType(etablissement: string) {
    console.log("searchEtablissement : " + etablissement);
    this.publicationForms.clear();



    for (let i = 0; i < this.publicationList.length; i++) {
      if (this.publicationList[i].type == etablissement) {
        this.publicationForms.push(this.fb.group({
          id: [this.publicationList[i].id],
          titre: [this.publicationList[i].titre],
          lien: [this.publicationList[i].lien],
          dateApparition: [this.publicationList[i].dateApparition],
          type: [this.publicationList[i].type],
          sourcePdf: [this.publicationList[i].sourcePdf],

        }));


      }
    }

  }
  addPublicationForms() {
    this.publicationForms.push(this.fb.group({
      id: [0],
      titre: ['', Validators.required],
      sourcePdf: ['', Validators.required],
      lien: ['', Validators.required],
      dateApparition: ['', Validators.required],
      type: ['', Validators.required],
    }));
  }

  recordSubmit(fg: FormGroup) {
    if (fg.value.id == 0) {


      this.publicationService.PostPublicationList(fg.value)
        .then((res: any) => {
          console.log(res);
          fg.patchValue({ id: res['id'] });
          this.showNotification('insert');
          console.log("fg.value", fg.value);

        });
    }
    else {
      this.publicationService.PutPublicationList(fg.value).then((res: any) => {
        console.log(res);
        this.showNotification('update');
      });
    }

  }

  onDelete(id, i) {
    if (id == 0)
      this.publicationForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.publicationService.deletePublicationList(id).then(
        (res: any) => {
          console.log(res);
          this.publicationForms.removeAt(i);
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