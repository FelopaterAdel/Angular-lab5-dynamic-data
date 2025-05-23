import { IProduct } from './../../../models/IProduct';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DynamicProductService } from '../../../services/dynamic-product.service';

@Component({
  selector: 'app-product-details',
  imports: [ RouterLink ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  product?: IProduct;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: DynamicProductService
  ) {}
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(this.productId).subscribe({
      next: (response) => {
        this.product = response;
      },
    });
  }
}
