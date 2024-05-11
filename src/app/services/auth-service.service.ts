import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public url;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
   }

  login(data: any): Observable<any>{
    console.log(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url + 'auth/', data, {headers: headers});
  }

  getToken(){
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken()
    if(!token){
      return false;
    }
    return true;
  }
}
