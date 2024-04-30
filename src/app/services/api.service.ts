import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const urlGet = 'https://api.escuelajs.co/api/v1/products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get(urlGet);
  };
}