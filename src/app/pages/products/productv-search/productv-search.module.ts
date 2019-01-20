import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ProductvSearchComponent } from './productv-search.component';
import { ProducthComponent } from '../producth/producth.component';
import { ProductvComponent } from '../productv/productv.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { MapModule } from '../../../theme/components/map/map.module';
import { ProductvZoomComponent } from '../productv/productv-zoom/productv-zoom.component';

import { NgPipesModule } from 'ngx-pipes';

export const routes = [
  { path: '', component: ProductvSearchComponent, pathMatch: 'full' },
  { path: ':city/:_id/:name', component: ProductvComponent }
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
    ProductvSearchComponent,
    ProductvComponent
  ],
  providers: [
    ProductvZoomComponent
  ]
})
export class ProductvSearchModule { }
