import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload, LoginResponseModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
/**
 * Function used to post the login details and get the authorized token
 * @param payload : Login Payload
 * @returns Login response
 */
  postLoginDetails(payload: LoginPayload): Observable<LoginResponseModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post<LoginResponseModel>(`https://demo.credy.in/api/v1/usermodule/login/`, payload, {headers: headers})
  }
}
