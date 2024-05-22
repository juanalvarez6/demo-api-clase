import { NgForOf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../models/products.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent {
  @Input()
  product!: Product;

  constructor(private api: ApiService) { }

  editName = new FormControl();
  editPrice = new FormControl();
  editImages = new FormControl();

  editProduct(id: number) {

    const updateProduct: Product = {
      id: 0,
      title: this.editName.value,
      price: parseFloat(this.editPrice.value),
      description: '',
      categoryId: 0,
      image: this.editImages.value
    };

    this.api.edit(updateProduct, id).subscribe(() => {
      alert(`Producto ${id} Editado`);
      location.reload();
    });
  }

  deleteProduct(id: number) {
    this.api.delete(id).subscribe(() => {
      alert(`Producto ${id} Eliminado`);
      location.reload();
    });
  }

  ngOnInit() {
    this.editName.setValue(this.product.title);
    this.editPrice.setValue(this.product.price);
    this.editImages.setValue(this.product.image);
  }
}