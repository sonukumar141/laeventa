import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import 'rxjs/Rx';

@Injectable()
export class AuthService{

    constructor(private http: HttpClient) {}

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
   public saveToken(token: any): string {
     localStorage.setItem('laeventa_auth', token);
     
     return token;
   }
}