import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { VendorSignInComponent } from './vendor-sign-in.component';
import { AuthService } from '../shared/auth.service';

export const routes = [
  { path: '', component: VendorSignInComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
  VendorSignInComponent
  ],
  providers: [
    AuthService
  ]
})
export class VendorSignInModule { }
