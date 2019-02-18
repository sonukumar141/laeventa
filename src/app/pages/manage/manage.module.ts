import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';
import { ManageVenueComponent } from './manage-venue/manage-venue.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from '../shared/auth.guard';

export const routes = [	

  {path: 'venues', component: ManageVenueComponent, canActivate: [AuthGuard], data: {breadcrumb: 'Venues'}}			
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ManageComponent,
    ManageVenueComponent
  ],
  exports: [

  ],
  providers: [
  ]
})
export class ManageModule { }