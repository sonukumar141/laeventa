import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ResetPasswordVenueComponent } from './reset-password-venue.component';
import { AuthService } from '../shared/auth.service';

export const routes = [
  { path: '', component: ResetPasswordVenueComponent, pathMatch: 'full' },
  { path: ':token', component: ResetPasswordVenueComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ResetPasswordVenueComponent
  ],
  providers: [
    AuthService
  ]
})
export class ResetPasswordVenueModule { }
