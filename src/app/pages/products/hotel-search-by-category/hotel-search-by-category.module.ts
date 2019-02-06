import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HotelSearchComponentByCategory } from './hotel-search-by-category.component';
import { ProducthComponent } from '../producth/producth.component';


import { NgPipesModule } from 'ngx-pipes';
import { ProducthModule } from '../producth/producth.module';

export const routes = [
  { path: '', component: HotelSearchComponentByCategory, pathMatch: 'full' },
  { path: ':category/:_id/:name', component: ProducthComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgPipesModule,
    NgxPaginationModule,
    ProducthModule

  ],
  declarations: [
    HotelSearchComponentByCategory,
  ],
  exports: [
    HotelSearchComponentByCategory
  ],
  providers: [

  ]
})
export class HotelSearchByCategoryModule { }
