import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SignInComponent } from './sign-in.component';

import { AuthService } from '../shared/auth.service';
import { AuthGuard } from '../shared/auth.guard';

export const routes = [
  { path: '', component: SignInComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    SignInComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class SignInModule { }
