import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { MapModule } from '../../../theme/components/map/map.module';
import { ProductshComponent } from './productsh.component';
import { ProductHotelComponent } from '../product-hotel/product-hotel.component';
import { ProducthZoomComponent } from '../producth/producth-zoom/producth-zoom.component';
import { ProducthZoomModule } from '../producth/producth-zoom/producth-zoom.module';

import { NgPipesModule } from 'ngx-pipes';

export const routes = [
  { path: '', component: ProductshComponent, pathMatch: 'full' },
  { path: ':name', component: ProductshComponent },
  { path: ':_id/:name', component: ProductHotelComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule,
    NgPipesModule,
    MapModule,
    ProducthZoomModule
  ],
  declarations: [
    ProductshComponent, 
    ProductHotelComponent
  ],
  exports: [
    ProductshComponent
  ],
  entryComponents:[
    ProducthZoomComponent
  ]
})
export class ProductshModule { }
