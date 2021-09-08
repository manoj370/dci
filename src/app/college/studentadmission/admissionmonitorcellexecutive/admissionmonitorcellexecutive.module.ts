import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { CollegelistComponent } from './collegelist/collegelist.component';
import { ViewStudentDetailsComponent } from './view-student-details/view-student-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProcessHistoryComponent } from './process-history/process-history.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
export const monitorcellExecutiveRoutes :Routes =[
{path :'collegelist', component : CollegelistComponent},
{path :'viewStudentsList', component : ViewComponent},
{path :'viewStudentDetails', component : ViewStudentDetailsComponent},
{ path: 'process-history/:id', component:ProcessHistoryComponent  },
{ path: 'view-history/:id', component:ViewHistoryComponent  },
];


@NgModule({
  declarations: [CollegelistComponent, ViewComponent, ViewStudentDetailsComponent, ProcessHistoryComponent, ViewHistoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(monitorcellExecutiveRoutes)
  ]
})
export class AdmissionmonitorcellexecutiveModule { }
