import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollegeregisterComponent } from './collegeregister/collegeregister.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ComplaintComponent } from './complaint/complaint.component';

export const registerComp: Routes = [
  { path: 'college', component: CollegeregisterComponent},
  { path: 'complaint', component: ComplaintComponent},
  {
    path: 'register', component: SidebarComponent,
    children: [
      { path: '', component: CollegeregisterComponent},
    ]
  }

]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    RouterModule.forChild(registerComp)
  ],
  declarations: [CollegeregisterComponent, ComplaintComponent]
})
export class AllregisterModule { }
