import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { MapModule } from '../../theme/components/map/map.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductZoomComponent } from './product/product-zoom/product-zoom.component';

import { NgPipesModule } from 'ngx-pipes';

export const routes = [
  { path: '', component: ProductsComponent, pathMatch: 'full' },
  { path: ':name', component: ProductsComponent },
  { path: ':_id/:name', component: ProductComponent }
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
    MapModule
  ],
  declarations: [
    ProductsComponent, 
    ProductComponent, 
    ProductZoomComponent
  ],
  entryComponents:[
    ProductZoomComponent
  ]
})
export class ProductsModule { }
