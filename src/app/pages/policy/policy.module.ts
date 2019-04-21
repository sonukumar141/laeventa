import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PolicyComponent } from './policy.component';

export const routes = [
  { path: '', component: PolicyComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PolicyComponent
  ],
  providers: [

  ]
})
export class PolicyModule { }
