import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../shared/environments/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }
 
  // لاضافة منتج إلى قائمة المفضلة
  AddToWishlist(pid: string):Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/wishlist`, { productId: pid });
   }


  // لعرض محتويات قائمة المفضلة
   getWishlistItems():Observable<any> {
    return this.http.get(`${baseUrl}/api/v1/wishlist`);
   }

  // لتحديث عدد المنتجات في قائمة المفضلة
    removeFromWishlist(pid: string): Observable<any> {
      return this.http.delete(`${baseUrl}/api/v1/wishlist/${pid}`);
    }
    
}
