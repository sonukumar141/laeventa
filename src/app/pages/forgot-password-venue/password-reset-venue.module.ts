import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ForgotPasswordVenueComponent } from './forgot-password-venue.component';
import { AuthService } from '../shared/auth.service';

export const routes = [
  { path: '', component: ForgotPasswordVenueComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ForgotPasswordVenueComponent
  ],
  providers: [
    AuthService
  ]
})
export class ForgotPasswordVenueModule { }
