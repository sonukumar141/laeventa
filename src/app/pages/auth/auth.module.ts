import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { CommonModule } from  '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
 
import { AuthComponent } from './auth.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../shared/auth.service';
import { AuthGuard } from '../shared/auth.guard';
import { TokenInterceptor } from '../shared/token.interceptor';
import { SignInComponent } from '../sign-in/sign-in.component';
import { VendorSignInComponent } from '../vendor-sign-in/vendor-sign-in.component';
import { HotelSignInComponent } from '../hotel-sign-in/hotel-sign-in.component';

const routes: Routes = [
    {path: 'sign-in', component: SignInComponent, canActivate: [AuthGuard]},
    {path: 'hotel-sign-up', component: HotelSignInComponent, canActivate: [AuthGuard]},
    {path: 'vendor-sign-up', component: VendorSignInComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
  SignInComponent,
  HotelSignInComponent,
  VendorSignInComponent,
  AuthComponent
],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
  	AuthService,
  	AuthGuard,
  	{
  		provide: HTTP_INTERCEPTORS,
  		useClass: TokenInterceptor,
  		multi: true
  	}
  ]

})
export class AuthModule { }
