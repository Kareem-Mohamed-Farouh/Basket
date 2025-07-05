import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../shared/environments/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }


  // لعرض جميع المنتجات
  getAllProducts():Observable<any> {
    return this.http.get(`${baseUrl}/api/v1/products`);
  }
 

  // لعرض منتج  واحد
  getSpecProduct(id:string|null):Observable<any> {
    return this.http.get(`${baseUrl}/api/v1/products/${id}`);
  }

 // لعرض جميع المنتجات لصفحه ال blog
   getAllProductsBlog( page:number):Observable<any> {
    return this.http.get(`${baseUrl}/api/v1/products?limit=2&page=${page}`);
  }

  // لعرض اوردارات العميل
   getAllOrders():Observable<any>
  {
    return this.http.get(`${baseUrl}/api/v1/orders/`)
  }


}
