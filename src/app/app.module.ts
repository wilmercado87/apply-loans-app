import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

//PrimeNg
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

//firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from '../environments/environment';

//Components
import { ApplyLoanComponent } from './components/apply-loan/apply-loan.component';
import { LoanComponent } from './components/loan/loan.component';
import { UserComponent } from './components/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseComponent } from './components/base/base.component';
import { UtilityService } from './services/utility.service';
import { UsersRegisteredComponent } from './components/users-registered/users-registered.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoanService } from './services/loan.service';
import { GenericService } from './services/generic.service';
import { UserService } from './services/user.service';
import { UsersLonsRegisteredComponent } from './components/users-lons-registered/users-lons-registered.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '', 
    loadChildren: () => import('./modules/main-content/main-content.module').then(m => m.MainContentModule)
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ApplyLoanComponent,
    LoanComponent,
    UserComponent,
    BaseComponent,
    UsersRegisteredComponent,
    MainContentComponent,
    UsersLonsRegisteredComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    TableModule,
    PanelMenuModule,
    DynamicDialogModule,
    DialogModule,
    ToastModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: "reload", useHash: true }),
  ],
  providers: [UtilityService, GenericService, LoanService, UserService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
