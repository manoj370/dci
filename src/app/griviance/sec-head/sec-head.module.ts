import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SecChronicalComponent } from './sec-chronical/sec-chronical.component';
import { SecheadComplaiComponent } from './sechead-complai/sechead-complai.component';
import { SecheadDashboardComponent } from './sechead-dashboard/sechead-dashboard.component';
import { SecAgendaComponent } from './sec-agenda/sec-agenda.component';
import { SecAgendaViewComponent } from './sec-agenda-view/sec-agenda-view.component';
import { NgxTinymceModule } from 'ngx-tinymce';

const secHeadRoutes: Routes = [
  { path: 'dashboard', component: SecheadDashboardComponent },
  { path: 'compView/:id/:status', component: SecheadComplaiComponent },
  { path: 'history/:id', component: SecChronicalComponent },
  { path: 'agendaList', component: SecAgendaComponent },
  { path: 'agendaList/viewAgenda/:id/:status', component: SecAgendaViewComponent }
];
@NgModule({
  declarations: [SecheadDashboardComponent,
    SecheadComplaiComponent,
    SecChronicalComponent,
    SecAgendaComponent,
    SecAgendaViewComponent],
  imports: [
    CommonModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    }),
    ReactiveFormsModule, FormsModule,
    RouterModule.forChild(secHeadRoutes)
  ]
})
export class SecHeadModule { }
