import { Component,OnDestroy,OnInit } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { SharedCardComponent } from "../../shared/shared-card/shared-card.component";
import { ProductHeaderComponent } from "../../components/product-header/product-header.component";
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DynamicProductService } from '../../services/dynamic-product.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [SharedCardComponent, ProductHeaderComponent,RouterLink,CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
products!:IProduct[];
mySub1!: Subscription[];

constructor(private ProductService:DynamicProductService){}

  ngOnInit(): void {
    let x = this.ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.mySub1.push(x);
  }



deleteHandler(productId: string) {
  let Y =  this.ProductService.deleteProduct(productId).subscribe({
      next: (response) => {
        this.products = this.products.filter(
          (product) => product.id != productId
        );
      },
    })
    this.mySub1.push(Y);
  }
  ngOnDestroy(): void {
    for(let x=0;x<this.mySub1.length;x++){

          this.mySub1[x].unsubscribe();

    }
  }
}
