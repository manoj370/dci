import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcuagendaComponent } from './excuagenda/excuagenda.component';
import { ArplmatterComponent } from './arplmatter/arplmatter.component';
import { ActiontakenComponent } from './actiontaken/actiontaken.component';
import { VoteofthanksComponent } from './voteofthanks/voteofthanks.component';
import { ExcdashboardComponent } from './excdashboard/excdashboard.component';
import { PolicymatterComponent } from './policymatter/policymatter.component';
import { ConfirminutesComponent } from './confirminutes/confirminutes.component';
import { SupplementaryComponent } from './supplementary/supplementary.component';
import { AcademicmatterComponent } from './academicmatter/academicmatter.component';
import { ArplmatterviewComponent } from './arplmatterview/arplmatterview.component';
import { DownloadmeetingComponent } from './downloadmeeting/downloadmeeting.component';
import { InspectionmatterComponent } from './inspectionmatter/inspectionmatter.component';
import { AccfinancematterComponent } from './accfinancematter/accfinancematter.component';
import { AnyotherbusinessComponent } from './anyotherbusiness/anyotherbusiness.component';
import { MaintaindatevenueComponent } from './maintaindatevenue/maintaindatevenue.component';
import { LegalpublicmatterComponent } from './legalpublicmatter/legalpublicmatter.component';
import { NoterecordapologiesComponent } from './noterecordapologies/noterecordapologies.component';
import { AdministrationmatterComponent } from './administrationmatter/administrationmatter.component';
import { ConductmeetingComponent } from './conductmeeting/conductmeeting.component';
import { CaseitemComponent } from './caseitem/caseitem.component';
import { CaseitemviewComponent } from './caseitemview/caseitemview.component';
import { SearchagendaComponent } from './searchagenda/searchagenda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModuleModule } from 'src/app/common-module/common-module.module';
import {DatePipe} from '@angular/common';
import { NgxTinymceModule } from 'ngx-tinymce';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
const excuRoutes: Routes = [
  { path: 'arplmatter', component: ArplmatterComponent },
  { path: 'ecagenda', component: ExcuagendaComponent },
  { path: 'dashboard', component: ExcdashboardComponent },
  { path: 'actiontaken', component: ActiontakenComponent },
  { path: 'policymatter', component: PolicymatterComponent },
  { path: 'voteofthanks', component: VoteofthanksComponent },
  { path: 'confirminutes', component: ConfirminutesComponent },
  { path: 'supplementary', component: SupplementaryComponent },
  { path: 'academicmatter', component: AcademicmatterComponent },
  { path: 'downloadmeeting', component: DownloadmeetingComponent },
  { path: 'accfinancematter', component: AccfinancematterComponent },
  { path: 'arplmatterview/:id/:status/:previous', component: ArplmatterviewComponent },
  { path: 'inspectionmatter', component: InspectionmatterComponent },
  { path: 'anyotherbusiness', component: AnyotherbusinessComponent },
  { path: 'maintaindatevenue', component: MaintaindatevenueComponent },
  { path: 'legalpublicmatter', component: LegalpublicmatterComponent },
  { path: 'noterecordapologies', component: NoterecordapologiesComponent },
  { path: 'administrationmatter', component: AdministrationmatterComponent },
  { path: 'conductmeeting', component: ConductmeetingComponent },
  { path: 'caseitem/:id/:status', component: CaseitemComponent },
  { path: 'caseitemview', component: CaseitemviewComponent },
  { path: 'searchagenda', component: SearchagendaComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(excuRoutes),
    CommonModuleModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    })
  ],
  declarations: [
    ExcdashboardComponent, ArplmatterComponent, ArplmatterviewComponent, MaintaindatevenueComponent,
    ExcuagendaComponent, DownloadmeetingComponent, AcademicmatterComponent, AdministrationmatterComponent,
    AccfinancematterComponent, LegalpublicmatterComponent, InspectionmatterComponent, PolicymatterComponent,
    NoterecordapologiesComponent, ConfirminutesComponent, ActiontakenComponent, AnyotherbusinessComponent,
    SupplementaryComponent, VoteofthanksComponent, ConductmeetingComponent, CaseitemComponent, CaseitemviewComponent, SearchagendaComponent
  ],
  exports: [
    ExcdashboardComponent, ArplmatterComponent, ArplmatterviewComponent, MaintaindatevenueComponent,
    ExcuagendaComponent, DownloadmeetingComponent, AcademicmatterComponent, AdministrationmatterComponent,
    AccfinancematterComponent, LegalpublicmatterComponent, InspectionmatterComponent, PolicymatterComponent,
    NoterecordapologiesComponent, ConfirminutesComponent, ActiontakenComponent, AnyotherbusinessComponent,
    SupplementaryComponent, VoteofthanksComponent, ConductmeetingComponent, CaseitemComponent, CaseitemviewComponent, SearchagendaComponent
  ]
})
export class EccommitteeModule { }
