import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateRecieptComponent } from './create-reciept/create-reciept.component';
import { DiarydakDashboardComponent, NgbdSortableHeader } from './diarydak-dashboard/diarydak-dashboard.component';
// import { ViewReceiptComponent } from './view-receipt/view-receipt.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AnothersectionComponent } from './anothersection/anothersection.component';
import { SectioninchargeOtherSecDispatchViewreceiptComponent } from '../sectionincharge/sectionincharge-other-sec-dispatch-viewreceipt/sectionincharge-other-sec-dispatch-viewreceipt.component';
import { DispatchDashboardComponent } from './dispatch-dashboard/dispatch-dashboard.component';
import { ViewdispatchComponent } from './viewdispatch/viewdispatch.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const diarydarkinchargeroutes: Routes = [

  { path: 'createReceipt', component: CreateRecieptComponent },
  { path: 'receiptDashboard', component: DiarydakDashboardComponent },
  { path: 'ViewReceipt', component: ViewReceiptComponent },
  { path: 'anothersection', component: AnothersectionComponent },
  { path: 'dispatchdashboard', component: DispatchDashboardComponent },
  { path: 'viewdispatch', component: ViewdispatchComponent },
  


]
@NgModule({
  declarations: [
    CreateRecieptComponent,
    DiarydakDashboardComponent,
    ViewReceiptComponent,
    AnothersectionComponent,
    DispatchDashboardComponent,
    ViewdispatchComponent,
    NgbdSortableHeader
    // ViewReceiptComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(diarydarkinchargeroutes),

  ]
})


export class DiarydakinchargeModule { }
