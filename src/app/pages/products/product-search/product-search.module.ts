import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ProductSearchComponent } from './product-search.component';
import { ProducthComponent } from '../producth/producth.component';
import { ProductvComponent } from '../productv/productv.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { MapModule } from '../../../theme/components/map/map.module';
import { ProducthZoomComponent } from '../producth/producth-zoom/producth-zoom.component';
import { ProductvZoomComponent } from '../productv/productv-zoom/productv-zoom.component';

import { ProducthModule } from '../producth/producth.module';

import { NgPipesModule } from 'ngx-pipes';

export const routes = [
  { path: '', component: ProductSearchComponent, pathMatch: 'full' },
  { path: ':city/:_id/:name', component: ProducthComponent }
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
    SwiperModule,
    ProducthModule
  ],
  declarations: [
    ProductSearchComponent,
    ProductvComponent
  ],
  exports: [
    ProductSearchComponent
  ],
  providers: [
    ProducthZoomComponent,
    ProductvZoomComponent
  ]
})
export class ProductSearchModule { }
