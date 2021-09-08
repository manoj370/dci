import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateRecieptComponent } from './diarydakincharge/create-reciept/create-reciept.component';
export const routes: Routes = [
  {
    path: 'diarydakincharge',
    loadChildren: () => import('./diarydakincharge/diarydakincharge.module').then(c => c.DiarydakinchargeModule)
  },
  {
    path: 'secretary',
    loadChildren: () => import('./secretary/secretary.module').then(c => c.SecretaryModule)
  },
  {
    path: 'sectionincharge',
    loadChildren: () => import('./sectionincharge/sectionincharge.module').then(c => c.SectioninchargeModule)
  },
  {
    path: 'sectionexecutive',
    loadChildren: () => import('./sectionexecutive/sectionexecutive.module').then(c => c.SectionexecutiveModule)
  }

];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(routes),

  ],
  declarations: []
})
export class InboundModule { }
