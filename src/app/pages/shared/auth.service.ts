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
		return this.http.post('api/v1/users/sign-in', userData);
  }
  
  public hotel_signup(userData: any): Observable<any>{
		return this.http.post('api/v1/usersh/hotel-sign-in', userData);
	}
}