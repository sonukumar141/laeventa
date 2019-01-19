import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService }  from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private url: string;
  constructor(private auth: AuthService, 
              private router: Router) {}

  private handleAuthState(): boolean {
    if(this.isLoginOrRegister()){
      this.router.navigate(['/products']);
      return false;
    }
      return true;
  }

  private handleNotAuthState(): boolean {
    if(this.isLoginOrRegister()){
      return true;
    }
      this.router.navigate(['/sign-in']);
      return false;
    
  }

  private isLoginOrRegister(): boolean {
    if(this.url.includes('sign-in') || this.url.includes('hotel-sign-up') || this.url.includes('vendor-sign-up')){   
      return true;
    }
      return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.url = state.url;

    if(this.auth.isAuthenticated()) {
      return this.handleAuthState();

    }
      return this.handleNotAuthState();
  }

}