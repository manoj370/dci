import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbdSortableHeader, SecexecutiveDashboardComponent } from './secexecutive-dashboard/secexecutive-dashboard.component';
import { SecexecutiveViewreceiptComponent } from './secexecutive-viewreceipt/secexecutive-viewreceipt.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {OthersecdispatchComponent} from '../sectionexecutive/othersecdispatch/othersecdispatch.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const sectionExecutiveRoutes = [
 
      { path: 'dashboard', component: SecexecutiveDashboardComponent },
      { path: 'view-receipt/:id/:receiptid', component: SecexecutiveViewreceiptComponent },
      { path: 'view-history', component: ViewHistoryComponent },
      { path: 'otherSecDispatches', component:  OthersecdispatchComponent}
    
]
@NgModule({
  declarations: [ SecexecutiveDashboardComponent,NgbdSortableHeader, SecexecutiveViewreceiptComponent, ViewHistoryComponent, OthersecdispatchComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(sectionExecutiveRoutes)
  ]
})
export class SectionexecutiveModule { }
