import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModuleModule } from 'src/app/common-module/common-module.module';
import { NewnotesheetComponent } from './newnotesheet/newnotesheet.component';
import { AuthGuard } from 'src/app/common-service/auth-gurd.guard';
import { MaskDirective } from './mask/mask.directive';
import { HistoryComponent } from './history/history.component';
import { NgxTinymceModule } from 'ngx-tinymce';
const jsaroutes: Routes = [

  { path: 'dash', component: DashboardComponent },
  { path: 'sheetView/:id', component: ViewComponent, canActivate: [AuthGuard] },
  { path: 'createNoteSheet/:id', component: NewnotesheetComponent, canActivate: [AuthGuard] },
  { path: 'process/:id', component: HistoryComponent, canActivate: [AuthGuard] },

]

@NgModule({
  declarations: [DashboardComponent,  HistoryComponent,
    ViewComponent, NewnotesheetComponent, MaskDirective],
  imports: [
    CommonModule, NgxDaterangepickerMd.forRoot(),
    ReactiveFormsModule, FormsModule, CommonModuleModule,
    RouterModule.forChild(jsaroutes),
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    })
  ],
  exports: [NewnotesheetComponent, DashboardComponent]
})
export class JsaModule { }
