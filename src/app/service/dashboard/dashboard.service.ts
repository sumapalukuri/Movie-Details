import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesResponseModel } from 'src/app/models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
/**
 * Function used to get the movie details from http call
 * @param token : Authentication token
 * @param url : url to get the movie details
 * @returns Movies details
 */
  getMoviesDetails(token: any, url: string): Observable<MoviesResponseModel> {
    return this.http.get<MoviesResponseModel>(url, { headers: this.getHeaders(token) })
  }
/**
 * Function used to append the auth token to the headers
 * @param token : auth token
 * @returns headers
 */
  getHeaders(token: any) {
    let userToken = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', 'Token ' + userToken);
    }
    return headers;
  }
}
