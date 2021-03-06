import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { MapModule } from '../../../theme/components/map/map.module';
import { ProducthComponent } from './producth.component';
import { ProducthZoomModule } from './producth-zoom/producth-zoom.module';
import { ProducthZoomComponent } from '../producth/producth-zoom/producth-zoom.component';

import { NgPipesModule } from 'ngx-pipes';


@NgModule({
  imports: [
    CommonModule,
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
    ProducthComponent
  ],
  exports: [
    ProducthComponent
  ],
  entryComponents:[
    ProducthZoomComponent
  ]
})
export class ProducthModule { }
