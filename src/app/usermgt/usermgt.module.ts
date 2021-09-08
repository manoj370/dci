import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsrMgtComponent } from './usr-mgt/usr-mgt.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UserCreationComponent } from './user-creation/user-creation.component';
const usermgtRoutes: Routes = [
  { path: 'internalApp', component: UsrMgtComponent },
  { path: 'internalApp/userCreation', component: UserCreationComponent }
];


@NgModule({
  declarations: [UsrMgtComponent, UserCreationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(usermgtRoutes)
  ]
})
export class UsermgtModule { }
