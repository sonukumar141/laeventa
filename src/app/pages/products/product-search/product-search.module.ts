import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ProductSearchComponent } from './product-search.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { MapModule } from '../../../theme/components/map/map.module';

import { NgPipesModule } from 'ngx-pipes';

export const routes = [
  { path: '', component: ProductSearchComponent, pathMatch: 'full' } 
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PipesModule,
    MapModule,
    NgPipesModule,
    NgxPaginationModule,
    SwiperModule
  ],
  declarations: [
    ProductSearchComponent,

  ],
  providers: [

  ]
})
export class ProductSearchModule { }
