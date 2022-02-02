import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'sidebar', component: SidebarComponent },
  { path: '**', redirectTo: 'register' },
];

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
