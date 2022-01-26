import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [AuthComponent],
})
export class AuthModule {}
