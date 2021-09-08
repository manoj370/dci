import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SecretaryDashboardComponent } from './secretary-dashboard/secretary-dashboard.component';
import { SecretaryviewreceiptComponent } from './secretaryviewreceipt/secretaryviewreceipt.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
const secretaryRoutes: Routes = [
  
      { path: '', component: SecretaryDashboardComponent },
      { path: 'viewreceipt/:id', component: SecretaryviewreceiptComponent }
      // { path: 'view-receipt', component: SecretaryviewreceiptComponent }
   
]
@NgModule({
  declarations: [SecretaryDashboardComponent,SecretaryviewreceiptComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(secretaryRoutes)
  ]
})
export class SecretaryModule { }
