import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TermsComponent } from './terms.component';

export const routes = [
  { path: '', component: TermsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TermsComponent
  ],
  providers: [

  ]
})
export class TermsModule { }
