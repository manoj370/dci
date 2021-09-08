import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShagendaReviewComponent } from './shagendaReview/shagendaReview.component';
import { SectionheadDashComponent } from './sectionhead-dash/sectionhead-dash.component';
import { EccommitteeModule } from '../eccommittee/eccommittee.module';
import { NgxTinymceModule } from 'ngx-tinymce';

const sectionHeadRoutes: Routes = [
  { path: 'sectionDashboard', component: SectionheadDashComponent },
  { path: 'viewAgenda/:id/:status/:ecStatus', component: ShagendaReviewComponent },

]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EccommitteeModule,
    ReactiveFormsModule,
    RouterModule.forChild(sectionHeadRoutes),
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    })
  ],
  declarations: [SectionheadDashComponent, ShagendaReviewComponent]
})
export class SectionHeadModule { }
