import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewComponent } from './view/view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CorrectionListComponent, NgbdSortableHeader } from './correctionList/correctionList.component';
import { CreatenotesheetComponent } from './createnotesheet/createnotesheet.component';
import { CommonModuleModule } from 'src/app/common-module/common-module.module';
import { CorrectionViewComponent } from './correctionView/correctionView.component';
import { JsaModule } from '../jsa/jsa.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SsahistoryComponent } from './ssahistory/ssahistory.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const secinRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'createNoteSheet/:id', component: CreatenotesheetComponent },
  { path: 'correctionList', component: CorrectionListComponent },
  // { path: 'correctionView/:id/:userId', component: CorrectionViewComponent },
  { path: 'correctionView/:id/:status', component: CorrectionViewComponent },
  { path: 'ssahistory/:id', component: SsahistoryComponent },

]



@NgModule({
  declarations: [DashboardComponent, NgbdSortableHeader, ViewComponent, SsahistoryComponent, CreatenotesheetComponent, CorrectionListComponent, CorrectionViewComponent],
  imports: [
    CommonModule,
    JsaModule,
    NgxDaterangepickerMd.forRoot(),
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    }),
    NgbModule,
    ReactiveFormsModule, FormsModule, CommonModuleModule,
    RouterModule.forChild(secinRoutes)
  ],
  exports: [CorrectionListComponent, DashboardComponent]
})
export class SsaModule { }
