import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SubcomAgendaComponent } from './subcom-agenda/subcom-agenda.component';
import { SubcomDashboardComponent } from './subcom-dashboard/subcom-dashboard.component';

const subcommRoutes: Routes = [
  { path: 'dashboard', component: SubcomDashboardComponent },
  { path: 'agenda/:id/:status', component: SubcomAgendaComponent }
];
@NgModule({
  declarations: [SubcomDashboardComponent, SubcomAgendaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(subcommRoutes)
  ]
})
export class SubCommiModule { }
