import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyLoanComponent } from 'src/app/components/apply-loan/apply-loan.component';
import { MainContentComponent } from 'src/app/components/main-content/main-content.component';
import { UsersLonsRegisteredComponent } from 'src/app/components/users-lons-registered/users-lons-registered.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'main_content', pathMatch: 'full' },
  {
    path: 'main_content', component: MainContentComponent, children:
      [
        { path: 'apply_loan', component: ApplyLoanComponent, outlet: 'router_contenido' },
        { path: 'users_loans_registered', component: UsersLonsRegisteredComponent, outlet: 'router_contenido' },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }
