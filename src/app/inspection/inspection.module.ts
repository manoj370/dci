import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
const inspectionRoutes: Routes = [
  {
    path: 'insCell',
    loadChildren: () => import('./../inspection/insadmin/insadmin.module').then(i => i.InsadminModule),
  },
  {
    path: 'tavelagent',
    loadChildren: () => import('./../inspection/travelagent/travelagent.module').then(ta => ta.TravelAgentModule),
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(inspectionRoutes),
  ],
  declarations: []
})
export class InspectionModule { }
