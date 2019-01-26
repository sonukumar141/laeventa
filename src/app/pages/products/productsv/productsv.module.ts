import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { MapModule } from '../../../theme/components/map/map.module';
import { ProductsvComponent } from './productsv.component';
import { ProductvComponent } from '../productv/productv.component';
import { ProductvZoomComponent } from '../productv/productv-zoom/productv-zoom.component';
import { AuthGuard } from '../../shared/auth.guard';

import { NgPipesModule } from 'ngx-pipes';

export const routes = [
  { path: '', component: ProductsvComponent, pathMatch: 'full' },
  { path: ':name', component: ProductsvComponent },
  { path: ':_id/:name', component: ProductvComponent }
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
    ProductsvComponent, 
    ProductvComponent,
    ProductvZoomComponent
  ],
  entryComponents:[
    ProductvZoomComponent
  ]
})
export class ProductsModule { }
