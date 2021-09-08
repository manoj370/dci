import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllClaimsComponent } from './allClaims/allClaims.component';
import { ViewsheduleComponent } from './viewshedule/viewshedule.component';
import { ViewclaimComponent } from './allClaims/viewclaim/viewclaim.component';
import { TravelSheduleComponent } from './travelShedule/travelShedule.component';
import { UploadDetailsComponent } from './upload-details/upload-details.component';
const inspectorRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'allClaims', component: AllClaimsComponent },
  { path: 'shedule', component: TravelSheduleComponent },
  { path: 'shedule/viewshedule/:id', component: ViewsheduleComponent },
  { path: 'shedule/viewshedule/viewclaim', component: ViewclaimComponent },
  { path: 'shedule/viewshedule/:id/uploaddetails/:id', component: UploadDetailsComponent },

]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(inspectorRoutes)
  ],
  declarations: [DashboardComponent, AllClaimsComponent, TravelSheduleComponent,
    ViewsheduleComponent, ViewclaimComponent, UploadDetailsComponent]
})
export class TravelAgentModule { }
