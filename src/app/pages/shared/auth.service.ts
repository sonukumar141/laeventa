import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router';
const jwt = new JwtHelperService();
import * as moment from 'moment';
import 'rxjs/Rx';
import { User } from 'src/app/app.models';

class DecodedToken{
  exp: number = 0;
  username: string = '';
  category: string= '';

}

@Injectable()
export class AuthService{

    private decodedToken;
    href = "";
    t="";
    t1="";
    constructor(private http: HttpClient,
                private router: Router) {
      this.decodedToken = JSON.parse(localStorage.getItem('laeventa_meta')) || new DecodedToken();
      this.href = router.url;
      this.t = this.href.split('/').slice(-1)[0];
      this.t1 = this.href.split('/').slice(-1)[0];
      console.log(this.t);
    }

    public saveToken(token: any): string {
      this.decodedToken = jwt.decodeToken(token);
 
      localStorage.setItem('laeventa_auth', token);
      localStorage.setItem('laeventa_meta', JSON.stringify(this.decodedToken));
      
      return token;
    }

    private getExpiration(){
      return moment.unix(this.decodedToken.exp);
    }

    public signup(userData: any): Observable<any>{
		return this.http.post('api/v1/users/sign-up', userData);
  }
  
  public hotel_signup(userData: any): Observable<any>{
		return this.http.post('api/v1/usersh/hotel-sign-up', userData);
  }
  
  public signin(userData: any): Observable<any>{
		return this.http.post('api/v1/users/sign-in', userData).map(
      (token) => {
        return this.saveToken(token);
      } 
    );
  }

  public hotel_signin(userData: any): Observable<any>{
		return this.http.post('api/v1/usersh/sign-in', userData).map(
      (token) => {
        return this.saveToken(token);
      }
    );
  }

  public vendor_signup(userData: any): Observable<any>{
		return this.http.post('api/v1/usersv/vendor-sign-up', userData);
  }

  public vendor_signin(userData: any): Observable<any>{
		return this.http.post('api/v1/usersv/sign-in', userData).map(
      (token) => {
        return this.saveToken(token);
      }
    );
  }

  public logout(){
    localStorage.removeItem('laeventa_auth');
    localStorage.removeItem('laeventa_meta');

    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getUserName(): string{
    return this.decodedToken.username;
  }

  public getCategoryName(): string{
    return this.decodedToken.category;
  }

  public getAuthToken(): string {
		return localStorage.getItem('laeventa_auth');
  }
  
  public forgot_password(userData: any): Observable<any>{
		return this.http.post('api/v1/users/forgot', userData, {responseType: 'text'});
  }
 
  public reset_password(userData: any): Observable<any>{
    return this.http.post(`api/v1/users/reset/${this.t}`, userData, {responseType: 'text'});
  } 

  public forgot_password_venue(userData: any): Observable<any>{
		return this.http.post('api/v1/usersh/forgot', userData, {responseType: 'text'});
  }
 
  public reset_password_venue(userData: any): Observable<any>{
    return this.http.post(`api/v1/usersh/reset/${this.t1}`, userData, {responseType: 'text'});
  } 

}