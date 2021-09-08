import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SecAFComponent } from './secA&F/secA&F.component';
import { SecAOBComponent } from './secAOB/secAOB.component';
import { SecARPLComponent } from './secARPL/secARPL.component';
import { SecLegalComponent } from './secLegal/secLegal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecPolicyComponent } from './secPolicy/secPolicy.component';
import { SecAcademicComponent } from './secAcademic/secAcademic.component';
import { SecDashboardComponent } from './secDashboard/secDashboard.component';
import { SecInspectionComponent } from './secInspection/secInspection.component';
import { SecNoteRecordComponent } from './secNoteRecord/secNoteRecord.component';
import { SecConfirmMinComponent } from './secConfirmMin/secConfirmMin.component';
import { SecVoteofThnksComponent } from './secVoteofThnks/secVoteofThnks.component';
import { SecActionTakenComponent } from './secActionTaken/secActionTaken.component';
import { SecSupplementaryComponent } from './secSupplementary/secSupplementary.component';
import { SecConductMeetingComponent } from './secConductMeeting/secConductMeeting.component';
import { SecAdminstrationComponent } from './secAdminstration/secAdminstration.component';
import { EccommitteeModule } from '../eccommittee/eccommittee.module';
import { CommonModuleModule } from 'src/app/common-module/common-module.module';
import { SecAgendaViewComponent } from './secAgendaView/secAgendaView.component';
import { NgxTinymceModule } from 'ngx-tinymce';
const secRoutes: Routes = [
  { path: 'secAFC', component: SecAFComponent },
  { path: 'secAOB', component: SecAOBComponent },
  { path: 'secARPL', component: SecARPLComponent },
  { path: 'secLegal', component: SecLegalComponent },
  { path: 'secPolicy', component: SecPolicyComponent },
  { path: 'secVote', component: SecVoteofThnksComponent },
  { path: 'secAcademic', component: SecAcademicComponent },
  { path: 'secConfirm', component: SecConfirmMinComponent },
  { path: 'secDashboard', component: SecDashboardComponent },
  { path: 'secInspection', component: SecInspectionComponent },
  { path: 'secNoteRecord', component: SecNoteRecordComponent },
  { path: 'secConduct', component: SecConductMeetingComponent },
  { path: 'secActionTaken', component: SecActionTakenComponent },
  { path: 'secSupplementary', component: SecSupplementaryComponent },
  { path: 'secAdminstration', component: SecAdminstrationComponent },
  { path: 'arplmatterview/:id/:status/:previous', component: SecAgendaViewComponent },

  
];
@NgModule({
  imports: [
    CommonModule, FormsModule,NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    }),RouterModule.forChild(secRoutes), ReactiveFormsModule, EccommitteeModule,CommonModuleModule
  ],
  declarations: [SecAOBComponent,SecAgendaViewComponent, SecARPLComponent, SecActionTakenComponent, SecConductMeetingComponent, SecAcademicComponent,
    SecPolicyComponent, SecSupplementaryComponent, SecConfirmMinComponent, SecAFComponent, SecDashboardComponent,
    SecInspectionComponent, SecLegalComponent, SecNoteRecordComponent, SecVoteofThnksComponent, SecAdminstrationComponent]
})
export class SecModuleModule { }
