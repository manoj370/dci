import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../common-service/auth-gurd.guard';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { InternalDashComponent } from './internal-dash/internal-dash.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { TinyeditorComponent } from './tinyeditor/tinyeditor.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

const commonRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'internal', component: SidebarComponent,
    children: [
      { path: 'dashboard', component: InternalDashComponent, canActivate: [AuthGuard] },
      {
        path: 'greviance',
        loadChildren: () => import('./../griviance/griviance.module').then(c => c.GrivianceModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'usrmgt',
        loadChildren: () => import('./../usermgt/usermgt.module').then(u => u.UsermgtModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'inspection',
        loadChildren: () => import('./../inspection/inspection.module').then(ins => ins.InspectionModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'travelagent',
        loadChildren: () => import('./../inspection/travelagent/travelagent.module').then(ta => ta.TravelAgentModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'inbound',
        loadChildren: () => import('../diarydak/inbound/inbound.module').then(inbound => inbound.InboundModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'outbound',
        loadChildren: () => import('../diarydak/outbound/outbound.module').then(inbound => inbound.OutboundModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'accfinace',
        loadChildren: () => import('../accfinance/accfinance.module').then(accfinance => accfinance.AccfinanceModule),
      },
      {
        path: 'excu',
        loadChildren: () => import('../excucomm/excucomm.module').then(exc => exc.ExcucommModule),
      },
      {
        path: 'college',
        loadChildren: () => import('../college/college.module').then(college => college.CollegeModule),
      }
    ]
  }
];

@NgModule({
    declarations: [SidebarComponent, DashboardComponent,
    ModalComponent,
    MultiselectComponent,
    TinyeditorComponent, InternalDashComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(commonRoutes),
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    })
  ],
  exports: [
    SidebarComponent,
    DashboardComponent,
    // TinyeditorComponent,
    MultiselectComponent,
    ModalComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TinyeditorComponent),
      multi: true
    }
  ]
})
export class CommonModuleModule { }
