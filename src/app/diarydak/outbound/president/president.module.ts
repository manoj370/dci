import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewComponent } from './view/view.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModuleModule } from 'src/app/common-module/common-module.module';
import { NgxTinymceModule } from 'ngx-tinymce';
const presidentRoutes: Routes = [
 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'view', component: ViewComponent }

]

@NgModule({
  declarations: [DashboardComponent, ViewComponent],
  imports: [
    CommonModule,ReactiveFormsModule, FormsModule ,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(presidentRoutes),CommonModuleModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    })
  ]
})
export class PresidentModule { }
