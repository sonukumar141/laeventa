import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'
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

    private resetToken = this.return_token();

    constructor(private http: HttpClient) {
      this.decodedToken = JSON.parse(localStorage.getItem('laeventa_meta')) || new DecodedToken();
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
  
  public password_reset(userData: any): Observable<any>{
		return this.http.post('api/v1/users/forgot', userData);
  }

  public reset_password(userData: any): Observable<any>{
    return this.http.post(`api/v1/users/reset/resetToken`, userData);
  }

  public return_token(): Observable<User>{        
    return this.http.get<User>('/api/v1/users/reset/:token');
  } 

}