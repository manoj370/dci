import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcuDashComponent } from './excu-dash/excu-dash.component';
import { ExcuAgendaComponent } from './excu-agenda/excu-agenda.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const excRoutes: Routes = [
  // {
    // path: '', component: ExcuSidebarComponent,
    // children: [
      { path: 'dashboard', component: ExcuDashComponent },
      { path: 'agenda/:id', component: ExcuAgendaComponent }
  //   ]
  // }
]
@NgModule({
  declarations: [ ExcuDashComponent,  ExcuAgendaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(excRoutes),

  ]
})
export class ExcCommittModule { }
