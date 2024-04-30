import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { NgForOf } from '@angular/common';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, NgForOf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo-api-clase';

  products = [];

   constructor(private api: ApiService){};

   ngOnInit() {
    this.api.getAllProducts().subscribe((products:any) => {
      console.log(products);
      this.products = products;
    });
   }
}
