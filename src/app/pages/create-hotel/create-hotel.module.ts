import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateHotelComponent } from './create-hotel.component';
import { SharedModule } from '../../shared/shared.module';

export const routes = [
  { path: '', component: CreateHotelComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    CreateHotelComponent
  ],
  providers: [

  ]
})
export class CreateHotelModule { }
