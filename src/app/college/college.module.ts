import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfomacollegeComponent } from './profomacollege/profomacollege.component';

export const routes: Routes = [
  {
    path: '', component: ProfomacollegeComponent
  },
  {
    path: 'dean',
    loadChildren: () => import('./studentadmission/dean/dean.module').then(d => d.DeanModule)
  },
  {
    path: 'admissionMonitorCellExecutive',
    loadChildren: () => import('./studentadmission/admissionmonitorcellexecutive/admissionmonitorcellexecutive.module')
      .then(d => d.AdmissionmonitorcellexecutiveModule)
  },
  {
    path: 'executiveCommittee',
    loadChildren: () => import('./studentadmission/executive-commitee/executive-commitee.module').then(d => d.ExecutiveCommiteeModule)
  },
  {
    path: 'collegeRep',
    loadChildren: () => import('./coursecompletion/college-representative/college-representative.module')
      .then(d => d.CollegeRepresentativeModule)
  },
  {
    path: 'monitoringExecutive',
    loadChildren: () => import('./coursecompletion/monitoringexecutive/monitoringexecutive.module').then(d => d.MonitoringexecutiveModule)
  },
]

@NgModule({
  declarations: [ProfomacollegeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CollegeModule { }
