import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SecexcuDashComponent } from './secexcu-dash/secexcu-dash.component';
import { CommonModuleModule } from 'src/app/common-module/common-module.module';
import { SecexcuComplviewComponent } from './secexcu-complview/secexcu-complview.component';
const secexcRoutes: Routes = [
  { path: 'dashboard', component: SecexcuDashComponent },
  { path: 'compView/:id/:status', component: SecexcuComplviewComponent }
];

@NgModule({
  declarations: [ SecexcuDashComponent,
    SecexcuComplviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonModuleModule,
    ReactiveFormsModule,
    RouterModule.forChild(secexcRoutes)
  ]
})
export class SecExcutiveModule { }
