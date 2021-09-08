import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StudentslistComponent } from './studentslist/studentslist.component';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';
import { ClarificationlistComponent } from './clarificationlist/clarificationlist.component';
import { DischargestudentslistComponent } from './dischargestudentslist/dischargestudentslist.component';
import { ApprovedstudentlistComponent } from './approvedstudentlist/approvedstudentlist.component';
import { ProcesshistoryComponent } from './processhistory/processhistory.component';
import { ViewhistoryComponent } from './viewhistory/viewhistory.component';
const deanRoutes: Routes = [
  { path: 'addStudentForm', component: AddNewStudentComponent },
  { path: 'studentsList', component: StudentslistComponent },
  { path: 'view', component: ViewComponent },
  { path: 'clarificationList', component: ClarificationlistComponent },
  { path: 'dischargeStudentsList', component:DischargestudentslistComponent  },
  { path: 'approveStudentsList', component:ApprovedstudentlistComponent  },
  { path: 'processhistory/:id', component:ProcesshistoryComponent  },
  { path: 'viewhistory/:id', component:ViewhistoryComponent  },
];


@NgModule({
  declarations: [AddNewStudentComponent, StudentslistComponent, ViewComponent, ClarificationlistComponent, DischargestudentslistComponent, ApprovedstudentlistComponent, ProcesshistoryComponent, ViewhistoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule ,
    RouterModule.forChild(deanRoutes),
  ]
})
export class DeanModule { }
