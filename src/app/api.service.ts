import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiurl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  registerUser(user:any): Observable<any>{
    return this.http.post<any>(`${this.apiurl}/register`, user);
  }

  loginUser(user:any): Observable<any>{
    return this.http.post<any>(`${this.apiurl}/login`, user);
  }

  contact(user:any):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/contact`, user);
  }

  getQuote(user:any):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/quote`, user);
  }

  subscribeEmail(user:any):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/subscribe`, user);
  }

  trackOrder(user:any):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/track`, user);
  }

  updateOrderStatus(user:any):Observable<any>{
    return this.http.put<any>(`${this.apiurl}/updateTrack`, user);
  }
}
