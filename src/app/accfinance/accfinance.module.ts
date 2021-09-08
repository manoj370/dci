import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccDashComponent } from './accDash/accDash.component';
import { TravelclaimdetailComponent } from './travelclaimdetail/travelclaimdetail.component';
const accfinaRoutes: Routes = [
  { path: 'dashboard', component: AccDashComponent },
  { path: 'travelclaimdetail', component: TravelclaimdetailComponent },
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(accfinaRoutes)
  ],
  declarations: [ AccDashComponent, TravelclaimdetailComponent]
})
export class AccfinanceModule { }
