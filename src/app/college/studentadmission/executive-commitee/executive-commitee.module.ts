import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const deanRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'view', component: ViewComponent },
];


@NgModule({
  declarations: [DashboardComponent, ViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule ,
    RouterModule.forChild(deanRoutes),
  ]
})
export class ExecutiveCommiteeModule { }
