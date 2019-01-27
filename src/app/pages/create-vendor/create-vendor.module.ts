import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CreateVendorComponent } from './create-vendor.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from '../shared/auth.guard';
import { AuthService } from '../shared/auth.service';

export const routes = [
  {path: '', component: CreateVendorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    CreateVendorComponent
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class CreateVendorModule { }