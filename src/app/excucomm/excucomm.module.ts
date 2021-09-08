import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModuleModule } from '../common-module/common-module.module';


const ecCommitte: Routes = [
  {
    path: 'ec',
    loadChildren: () => import('./eccommittee/eccommittee.module').then(c => c.EccommitteeModule),
  },
  {
    path: 'secretary',
    loadChildren: () => import('./secretary/secModule.module').then(s => s.SecModuleModule),
  },
  {
    path: 'sectionHead',
    loadChildren: () => import('./sectionHead/sectionHead.module').then(sh => sh.SectionHeadModule),
  },
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ecCommitte),
    CommonModuleModule
  ],
  declarations: []
})
export class ExcucommModule { }
