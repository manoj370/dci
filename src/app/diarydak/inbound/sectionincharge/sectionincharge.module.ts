import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SectioninchargeDashboardComponent } from './sectionincharge-dashboard/sectionincharge-dashboard.component';
import { SectioninchargeViewreceiptComponent } from './sectionincharge-viewreceipt/sectionincharge-viewreceipt.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SectioninchargeOtherSecDispatchViewreceiptComponent } from './sectionincharge-other-sec-dispatch-viewreceipt/sectionincharge-other-sec-dispatch-viewreceipt.component';
const sectioninchargeRoutes = [

  { path: 'receiptDashboard', component: SectioninchargeDashboardComponent },
  { path: 'view-receipt/:id/:receiptid', component: SectioninchargeViewreceiptComponent },
  { path: 'OtherSecDispatch', component: SectioninchargeOtherSecDispatchViewreceiptComponent },

]

@NgModule({
  declarations: [SectioninchargeDashboardComponent, SectioninchargeViewreceiptComponent, SectioninchargeOtherSecDispatchViewreceiptComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(sectioninchargeRoutes)
  ]
})
export class SectioninchargeModule { }
