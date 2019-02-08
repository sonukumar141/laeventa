import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { HotelDashboardComponent } from './hotel-dashboard.component';

export const routes = [
  { path: '', component: HotelDashboardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    HotelDashboardComponent
  ],
  exports: [
    HotelDashboardComponent
  ],
  providers: [

  ]
})
export class HotelDashboardModule { }
