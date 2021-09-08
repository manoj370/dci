import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../common-service/auth-gurd.guard';
import { CommonModuleModule } from '../common-module/common-module.module';
const grivianceRoutes: Routes = [
  {
    path: 'complaint',
    loadChildren: () => import('./../griviance/complainant/complainant.module').then(c => c.ComplainantModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'secHead',
    loadChildren: () => import('./../griviance//sec-head/sec-head.module').then(sh => sh.SecHeadModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'secExc',
    loadChildren: () => import('./../griviance/sec-excutive/sec-excutive.module').then(se => se.SecExcutiveModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'subCom',
    loadChildren: () => import('./../griviance/sub-commi/sub-commi.module').then(sc => sc.SubCommiModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'excutive',
    loadChildren: () => import('./../griviance/exc-committ/exc-committ.module').then(e => e.ExcCommittModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'college',
    loadChildren: () => import('./../griviance/college/college.module').then(c => c.CollegeModule),
    canLoad: [AuthGuard]
  },
]
@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(grivianceRoutes)
  ],
  declarations: []
})
export class GrivianceModule { }