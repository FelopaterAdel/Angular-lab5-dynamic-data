import { Component, OnInit } from '@angular/core';
import { SharedCardComponent } from '../../../shared/shared-card/shared-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicProductService } from '../../../services/dynamic-product.service';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, SharedCardComponent, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  productId: any;
  constructor(
    private router: Router,
    private productService: DynamicProductService,
    private activatedRouted: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
        this.getName.setValue('');
        this.getPrice.setValue('');
        this.getQuantity.setValue('');
      },
    });
    if (this.productId != 0) {
      this.productService
        .getProductById(this.productId)
        .subscribe((response) => {
          this.getName.setValue(response.name);
          this.getPrice.setValue(response.price.toString());
          this.getQuantity.setValue(response.quantity.toString());
        });
    }
  }
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  });

  get getName() {
    return this.productForm.controls['name'];
  }
  get getPrice() {
    return this.productForm.controls['price'];
  }
  get getQuantity() {
    return this.productForm.controls['quantity'];
  }

  productHandler(e: Event) {
    if (this.productForm.status == 'VALID') {
      if (this.productId == 0) {
        this.productService.addNewProduct(this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/products']);
          },
        });
      } else {
        this.productService
          .editProduct(this.productId, this.productForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['/products']);
            },
          });
      }
    } else {
      console.log('Fix Errors');
    }
  }
}
