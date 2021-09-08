import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StudentslistComponent } from './studentslist/studentslist.component';
import { MonitorViewComponent } from './monitor-view/monitor-view.component';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentDetailsComponent } from './studentDetails/studentDetails.component';
const monitorRoutes: Routes = [
  { path: 'list', component: StudentslistComponent },
  { path: 'view/:id/:listId', component: StudentDetailsComponent },
  { path: 'viewCollegeList/:id/:name/:year/:Academic/:course/:specialization', component: ViewComponent }
];


@NgModule({
  declarations: [StudentslistComponent, ViewComponent,StudentDetailsComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(monitorRoutes),
  ]
})
export class MonitoringexecutiveModule { }
