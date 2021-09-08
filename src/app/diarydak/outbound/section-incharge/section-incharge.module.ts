import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent, NgbdSortableHeader} from './dashboard/dashboard.component';
import { ViewdispatchComponent } from './viewdispatch/viewdispatch.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditdispatchComponent } from './editdispatch/editdispatch.component';
import { CommonModuleModule } from 'src/app/common-module/common-module.module';
import { SsaModule } from '../ssa/ssa.module';
import { CorrectionComponent } from './correction/correction.component';
import { SectionProcessComponent } from './sectionProcess/sectionProcess.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateNoteSheetComponent } from './create-note-sheet/create-note-sheet.component';
import { JsaModule } from '../jsa/jsa.module';
import { TrackNotesheetComponent } from './track-notesheet/track-notesheet.component';

const secinRoutes: Routes = [

  { path: 'IncDashboard', component: DashboardComponent },
  { path: 'viewSheetData/:id', component: ViewdispatchComponent },
  { path: 'editdispatch', component: EditdispatchComponent },
  { path: 'correctionList', component: CorrectionComponent },
  { path: 'processHistory/:id', component: SectionProcessComponent },
  { path: 'createNoteSheet/:id', component: CreateNoteSheetComponent },
  { path: 'trackNotesheet', component: TrackNotesheetComponent },
]



@NgModule({
  declarations: [DashboardComponent,NgbdSortableHeader, ViewdispatchComponent,SectionProcessComponent, EditdispatchComponent, CorrectionComponent, CreateNoteSheetComponent,TrackNotesheetComponent],
  imports: [
    CommonModule,
    JsaModule,
    ReactiveFormsModule, FormsModule, 
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(secinRoutes), CommonModuleModule,
    SsaModule,  NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    }),
    NgbModule
  ]
})
export class SectionInchargeModule { }