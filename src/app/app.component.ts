import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { NgForOf } from '@angular/common';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Category } from './models/category.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, NgForOf, HttpClientModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'demo-api-clase';

  products = [];
  categories: Category[] = [];


  name = new FormControl('');
  price = new FormControl('');
  description = new FormControl('');
  categoryId = new FormControl('');
  images = new FormControl('');

  constructor(private api: ApiService) { };

  ngOnInit() {
    this.api.getAllProducts().subscribe((products: any) => {
      products.map((item: any) => {
        let imageStringify = JSON.stringify(item.images); // convertimos el array de imagenes a string
        let imageNoGarbage = imageStringify
          .substring(2, imageStringify.length - 2)
          .replaceAll('\\', ' ')
          .replaceAll('""', '"')
          .replaceAll('" "', '"')
          .replaceAll(' ', ''); 
        try {
          item.images = JSON.parse(imageNoGarbage);
          item.imagesActual = item.images[0];
        } catch (e) { }
      });
      this.products = products;
      console.log(products)
    });

    this.api.getAllCategories().subscribe((categories: any)=>{
      this.categories = categories;
      console.log(categories);
    });
  }

  onSummit() {
    const newProduct = {
      title: this.name.value,
      price: this.price.value,
      description: this.description.value,
      categoryId: this.categoryId.value,
      images: [this.images.value]
    }

    this.api.createProduct(newProduct).subscribe((res) => {
      alert('Producto agregado');
      location.reload();
    });
  }
}