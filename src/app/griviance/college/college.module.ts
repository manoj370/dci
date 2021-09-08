import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CollcompComponent } from './collcomp/collcomp.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CollDashComponent } from './coll-dash/coll-dash.component';

const collegeRoutes: Routes = [
  { path: 'dashboard', component: CollDashComponent },
  { path: 'compView/:id', component: CollcompComponent },

];

@NgModule({
  declarations: [CollDashComponent, CollcompComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(collegeRoutes)
  ]
})
export class CollegeModule { }
