import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Product } from '../models/products.model';
import { Observable } from 'rxjs';

const urlProducts = 'http://localhost:3000/products';
const urlCategories = 'http://localhost:3000/categories';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(urlProducts);
  };

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(urlCategories);
  };

  createProduct(product: Product){
    return this.http.post(urlProducts, product);
  }

  edit(product: Product, id: number){
    return this.http.put(`${urlProducts}/${id}`, product);
  }

  delete(id: number){
    return this.http.delete(`${urlProducts}/${id}`);
  }
}