import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComplainantListComponent } from './complainant-list/complainant-list.component';
import { ComplainantNewcomplComponent } from './complainant-newcompl/complainant-newcompl.component';
import { ComplainantComplviewComponent } from './complainant-complview/complainant-complview.component';
const complainRoutes: Routes = [
  { path: 'new', component: ComplainantNewcomplComponent },
  { path: 'dashboard', component: ComplainantListComponent },
  { path: 'dashboard/compView/:id', component: ComplainantComplviewComponent }
];
@NgModule({
  declarations: [ComplainantNewcomplComponent, ComplainantComplviewComponent, ComplainantListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(complainRoutes)
  ]
})
export class ComplainantModule { }
