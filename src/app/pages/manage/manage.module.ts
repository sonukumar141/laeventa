import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';
import { ManageVenueComponent } from './manage-venue/manage-venue.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from '../shared/auth.guard';
import { AuthService } from '../shared/auth.service';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { NgPipesModule } from 'ngx-pipes';

export const routes = [	

  {path: '', component: ManageVenueComponent, canActivate: [AuthGuard] }			
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PipesModule,
    NgPipesModule,
  ],
  declarations: [
    ManageComponent,
    ManageVenueComponent
  ],
  exports: [

  ],
  providers: [
    AuthService
  ]
})
export class ManageModule { }