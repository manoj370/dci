import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/common-service/auth-gurd.guard';
import { ProcessHistoryComponent } from './process-history/process-history.component';
export const routes: Routes = [
  {
    path: 'diarydaksechead',
    loadChildren: () => import('./diairydak-sh/diairydak-sh.module').then(d => d.DiairydakShModule)
  },
  {
    path: 'secExc',
    loadChildren: () => import('./section-excutive/section-excutive.module').then(se => se.SectionExcutiveModule)
  },
  {
    path: 'secInch',
    loadChildren: () => import('./section-incharge/section-incharge.module').then(si => si.SectionInchargeModule),
    canLoad: [AuthGuard]

  },
  {
    path: 'jointSecretary',
    loadChildren: () => import('./jointsecretary/jointsecretary.module').then(si => si.JointsecretaryModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'secretary',
    loadChildren: () => import('./secrtary/secrtary.module').then(si => si.SecrtaryModule),
    canLoad: [AuthGuard]

  },
  {
    path: 'president',
    loadChildren: () => import('./president/president.module').then(si => si.PresidentModule)
  },
  {
    path: 'se',
    loadChildren: () => import('./ssa/ssa.module').then(ss => ss.SsaModule),
    canLoad: [AuthGuard]

  },
  {
    path: 'jsa',
    loadChildren: () => import('./jsa/jsa.module').then(ss => ss.JsaModule),
    canLoad: [AuthGuard]

  },
  {
    path: 'history/:id',
    component: ProcessHistoryComponent
  },

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProcessHistoryComponent]
})
export class OutboundModule { }
