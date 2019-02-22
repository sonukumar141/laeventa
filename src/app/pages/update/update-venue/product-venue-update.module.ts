import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductVenueUpdateZoomComponent } from './product-venue-update-zoom/product-venue-update-zoom.component';
import { ProductVenueUpdateComponent } from './product-venue-update.component';
import { SharedModule } from '../../../shared/shared.module';
import { AuthGuard } from '../../shared/auth.guard';
import { AuthService } from '../../shared/auth.service';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { NgPipesModule } from 'ngx-pipes';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { MapModule } from '../../../theme/components/map/map.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes = [	

  {path: '', component: ProductVenueUpdateComponent, canActivate: [AuthGuard] }			
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PipesModule,
    NgPipesModule,
    Ng2CarouselamosModule,
    MapModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductVenueUpdateComponent,
    ProductVenueUpdateZoomComponent
  ],
  exports: [

  ],
  providers: [
    AuthService
  ]
})
export class ProductVenueUpdateModule { }