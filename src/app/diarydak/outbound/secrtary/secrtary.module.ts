import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewComponent } from './view/view.component';
import { CommonModuleModule } from 'src/app/common-module/common-module.module';
import { EditdispatchComponent } from './editdispatch/editdispatch.component';
import { SecprocessComponent } from './secprocess/secprocess.component';
import { OthersecdispatchesComponent } from './othersecdispatches/othersecdispatches.component';
const secretaryRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sheetView/:id', component: ViewComponent },
  { path: 'editdispatch', component: EditdispatchComponent },
  { path: 'processHistory/:id', component: SecprocessComponent },
  { path: 'otherSecDispatches', component: OthersecdispatchesComponent }
]

@NgModule({
  declarations: [DashboardComponent, ViewComponent, SecprocessComponent, EditdispatchComponent, OthersecdispatchesComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    NgxDaterangepickerMd.forRoot(), 
    RouterModule.forChild(secretaryRoutes), CommonModuleModule
  ]
})
export class SecrtaryModule { }
