import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const urlProducts = 'https://api.escuelajs.co/api/v1/products';
const urlCategories = 'https://api.escuelajs.co/api/v1/categories';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(urlProducts);
  };

  getAllCategories() {
    return this.http.get(urlCategories);
  };

  createProduct(product: any){
    return this.http.post(urlProducts, product);
  }

  edit(product: any, id: number){
    return this.http.put(`${urlProducts}/${id}`, product);
  }

  delete(id: number){
    return this.http.delete(`${urlProducts}/${id}`);
  }
}