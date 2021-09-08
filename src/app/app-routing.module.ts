import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './common-service/auth-gurd.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'main',
    loadChildren: () => import('./common-module/common-module.module').then(c => c.CommonModuleModule),
    canLoad: [AuthGuard]
  },
   {
    path: 'allregister',
    loadChildren: () => import('./allregister/allregister.module').then(c => c.AllregisterModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

export const AppRoutingRoutes = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
