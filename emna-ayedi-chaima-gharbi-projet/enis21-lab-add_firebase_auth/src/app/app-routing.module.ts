import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./main/dashboard/dashboard.component";
import {MemberListComponent} from "./main/member/member-list/member-list.component";
import {MemberFormComponent} from "./main/member/member-form/member-form.component";
import { EvenementComponent } from './main/evenement/evenement.component';
import { FiliereComponent } from './main/filiere/filiere.component';
import { PublicationComponent } from './main/publication/publication.component';
import { MembreComponent } from './main/membre/membre.component';
import { OutilComponent } from './main/outil/outil.component';
import { HomeComponent } from './main/home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
 
  {
    path :'profile',
    pathMatch: 'full',

    component:ProfileComponent
  },

  {
    path :'membre',
    component:MembreComponent
  },
  {
    path :'publication',
    pathMatch: 'full',

    component:PublicationComponent
  },
  {
    path :'outil',

    pathMatch: 'full',
    component:OutilComponent
  },
  {
    path :'evenement',
    component:EvenementComponent
  },{
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'members',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
