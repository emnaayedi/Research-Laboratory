import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { MDBBootstrapModule, ModalModule } from 'angular-bootstrap-md';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {MemberListComponent} from './main/member/member-list/member-list.component';
import {MemberFormComponent} from './main/member/member-form/member-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "../@root/shared.module";
import {LayoutComponent} from './layout/layout.component';
import {FirebaseModule} from "../@root/firebase/firebase.module";
import {LoginComponent} from './auth/login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from 'src/services/token.interceptor';
import { OutilComponent } from './main/outil/outil.component';
import { FiliereComponent } from './main/filiere/filiere.component';
import { PublicationComponent } from './main/publication/publication.component';
import { MembreComponent } from './main/membre/membre.component';
import { CommonModule } from '@angular/common';
import { EvenementComponent } from './main/evenement/evenement.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import { HomeComponent } from './main/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
FullCalendarModule.registerPlugins([ 
  timeGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    MemberListComponent,
    MemberFormComponent,
    LoginComponent,
    FiliereComponent,
    OutilComponent,
    MembreComponent,
    PublicationComponent,
    EvenementComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [ MatCardModule,
    SharedModule,
    FullCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserModule,
    FormsModule,
    FirebaseModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule, 
    MatSortModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(), 
    MatSelectModule,
    MatFormFieldModule,
    FullCalendarModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FirebaseModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],exports: [
    ModalModule
],
})
export class AppModule {
}
