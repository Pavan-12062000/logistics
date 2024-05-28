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
    console.log("user", user);
    return this.http.post<any>(`${this.apiurl}/login`, user);
  }

  contact(user:any):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/contact`, user);
  }
}
