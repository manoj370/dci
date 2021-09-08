import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewdispatchComponent } from './viewdispatch/viewdispatch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const dairydaksh: Routes = [
  
  
      { path: 'dashboard', component: DashboardComponent },
      { path: 'viewDispatch', component: ViewdispatchComponent }
    
];



@NgModule({
  declarations: [ViewdispatchComponent, DashboardComponent],
  imports: [
    RouterModule.forChild(dairydaksh),CommonModule,
    ReactiveFormsModule, FormsModule ,
    NgxDaterangepickerMd.forRoot(),
  ]
})
export class DiairydakShModule { }
