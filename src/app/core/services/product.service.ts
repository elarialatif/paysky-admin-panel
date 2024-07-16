import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../store/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiBaseUrl}/products`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiBaseUrl}/products`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiBaseUrl}/products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/products/${id}`);
  }
}
