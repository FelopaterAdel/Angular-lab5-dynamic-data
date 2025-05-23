import { IProduct } from '../models/IProduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root'

})

export class DynamicProductService  {
baseUrl:string="http://localhost:3005/products"
  constructor(private http:HttpClient) { }
  getAllProducts():Observable<IProduct[]>{
      return this.http.get<IProduct[]>(this.baseUrl)
  }
  getProductById(productId:string):Observable<IProduct>{
    return this.http.get<IProduct>(`${this.baseUrl}/${productId}`,)
  }
  addNewProduct(product:IProduct):Observable<IProduct>{
   return this.http.post<IProduct>(this.baseUrl,product)

  }
  
   editProduct(productId: string, product: any): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseUrl}/${productId}`, product);
  }

  deleteProduct(productId: string): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.baseUrl}/${productId}`);
  }
}
