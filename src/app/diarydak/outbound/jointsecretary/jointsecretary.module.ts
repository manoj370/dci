import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModuleModule } from 'src/app/common-module/common-module.module';
import { EditdispatchComponent } from './editdispatch/editdispatch.component';
import { ProcessHistoryComponent } from './processHistory/processHistory.component';

const jointSecRoutes: Routes = [
  { path: 'noteSheetView/:id', component: ViewComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hist/:id', component: ProcessHistoryComponent },
  { path: 'editdispatch', component: EditdispatchComponent }
];

@NgModule({
  declarations: [DashboardComponent, ViewComponent, ProcessHistoryComponent, EditdispatchComponent],
  imports: [
    FormsModule,
    CommonModule,
    CommonModuleModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(jointSecRoutes),
  ]
})
export class JointsecretaryModule { }
