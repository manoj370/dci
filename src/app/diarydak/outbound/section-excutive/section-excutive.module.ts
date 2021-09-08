import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewdispatchComponent } from './viewdispatch/viewdispatch.component';
import { Routes, RouterModule } from '@angular/router';
import { CreatedispatchComponent } from './createdispatch/createdispatch.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { NewdispatchComponent } from './newdispatch/newdispatch.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { CorrectionlistComponent } from './correctionlist/correctionlist.component';
import { CommonModuleModule } from 'src/app/common-module/common-module.module';
import { JsaModule } from '../jsa/jsa.module';

const secexcRoutes: Routes = [
 
      { path: 'dashboard', component: DashboardComponent },
      { path: 'createdispatch', component:CreatedispatchComponent },
      { path: 'view', component:ViewComponent },
      { path: 'editDispatch', component: ViewdispatchComponent },
      { path: 'new', component: CreatedispatchComponent },
      { path: 'correctionlist', component: CorrectionlistComponent }
   
];


@NgModule({
  declarations: [DashboardComponent,  ViewdispatchComponent, CreatedispatchComponent, ViewComponent,NewdispatchComponent, CorrectionlistComponent],
  imports: [
    CommonModule,
    JsaModule,

    ReactiveFormsModule, FormsModule ,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(secexcRoutes),CommonModuleModule
  ]
})
export class SectionExcutiveModule { }
