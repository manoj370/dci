import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursecompletionstudentlistComponent } from './coursecompletionstudentlist/coursecompletionstudentlist.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoursecompletionFormComponent } from './coursecompletion-form/coursecompletion-form.component';
import { ViewComponent } from './view/view.component';
import { CompletionListComponent } from './completionList/completionList.component';
const collegeRepRoutes: Routes = [
  { path: 'coursecompletionStudentList', component: CoursecompletionstudentlistComponent },
  { path: 'coursecompletionForm', component: CompletionListComponent },
  { path: 'view/:id', component: ViewComponent },
 
 
];


@NgModule({
  declarations: [CoursecompletionstudentlistComponent, ViewComponent,CompletionListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule ,
    RouterModule.forChild(collegeRepRoutes),
  ]
})
export class CollegeRepresentativeModule { }
