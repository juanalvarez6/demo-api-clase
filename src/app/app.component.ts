import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { NgForOf } from '@angular/common';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Category } from './models/category.model';
import { Product } from './models/products.model';

@Component({  
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, NgForOf, HttpClientModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'demo-api-clase';

  products: Product[] = [];
  categories: Category[] = [];


  name = new FormControl('');
  price = new FormControl('');
  description = new FormControl('');
  categoryId = new FormControl('');
  image = new FormControl('');

  constructor(private api: ApiService) {
   };

  ngOnInit() {
    this.api.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
    });

    this.api.getAllCategories().subscribe((categories: Category[])=>{
      this.categories = categories;
    });
  }

  onSummit() {
    const newProduct: Product = {
      id: 0,
      title: this.name.value!,
      price: parseFloat(this.price.value!),
      description: this.description.value!,
      categoryId: parseInt(this.categoryId.value!),
      image: this.image.value!
    }

    this.api.createProduct(newProduct).subscribe((res) => {
      alert('Producto agregado');
      location.reload();
    });
  }
}