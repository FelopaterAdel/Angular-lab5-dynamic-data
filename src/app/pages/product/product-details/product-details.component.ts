import { DynamicProductService } from './../../../services/dynamic-product.service';
import { Component } from '@angular/core';
import { IProduct } from '../../../models/IProduct';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
 productId: any;
  product?: IProduct;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService:DynamicProductService
  ) {}
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.product = this.productService.getProductById(this.productId);
  }
}
