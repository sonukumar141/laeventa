import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ProducthComponent } from '../producth/producth.component';


import { NgPipesModule } from 'ngx-pipes';
import { ProductSearchModule } from '../product-search/product-search.module';

export const routes = [
  { path: '', component: ProductSearchComponent, pathMatch: 'full' },
  { path: ':category/:_id/:name', component: ProducthComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ProductSearchModule

  ],
  declarations: [
    ProductSearchComponent,
    ProducthComponent
  ],
  exports: [

  ],
  providers: [

  ]
})
export class HotelSearchByCategoryModule { }
