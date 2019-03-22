import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CreateVenueAreaComponent } from './create-venue-area.component';
import { SharedModule } from '../../../shared/shared.module';
import { AuthGuard } from '../../../pages/shared/auth.guard';
import { AuthService } from '../../../pages/shared/auth.service';
import { ImageUploadModule } from '../../../pages/image-upload/image-upload.module';

export const routes = [
  {path: '', component: CreateVenueAreaComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ImageUploadModule
  ],
  declarations: [
    CreateVenueAreaComponent
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class CreateVenueAreaModule { }