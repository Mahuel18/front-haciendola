import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url + 'api/';
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProducts(): Observable<Product[]>{
    return this._http.get<Product[]>(this.url, { headers: this.getHeaders() })
  }

  getProductById(id: string): Observable<Product>{
    const url = `${this.url}/${id}}`;
    return this._http.get<Product>(url, { headers: this.getHeaders() });
  }

  createProduct(product: Product): Observable<Product>{
    return this._http.post<Product>(this.url, product, { headers: this.getHeaders() })
  }

  updateProduct(id: string, product: Product): Observable<Product>{
    const url = `${this.url}/${id}`;
    console.log(id)
    console.log(product)
    return this._http.put<Product>(url, product, { headers: this.getHeaders() });
    
  }
  
  deleteProduct(id: string): Observable<any>{
    const url = `${this.url}/${id}`;
    return this._http.delete(url, { headers: this.getHeaders() });
  }
}
