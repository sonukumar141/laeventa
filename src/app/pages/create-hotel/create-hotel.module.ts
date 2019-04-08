import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CreateHotelComponent } from './create-hotel.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from '../shared/auth.guard';
import { AuthService } from '../shared/auth.service';
import { ImageUploadModule } from '../image-upload/image-upload.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

export const routes = [
  {path: '', component: CreateHotelComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ImageUploadModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    CreateHotelComponent
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class CreateHotelModule { }