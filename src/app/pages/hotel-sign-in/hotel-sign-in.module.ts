import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { HotelSignInComponent } from './hotel-sign-in.component';
import { AuthService } from '../shared/auth.service';

export const routes = [
  { path: '', component: HotelSignInComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    HotelSignInComponent
  ],
  providers: [
    AuthService
  ]
})
export class HotelSignInModule { }
