import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../shared/environments/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {
    this.cartNumber();
  }

  cartNumber: WritableSignal<number> = signal(0);

  // لاضافة منتج إلى السلة
  addToCart(pid: string): Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/cart`, { productId: pid });
  }

  // لعرض محتويات السلة
  getCartItems(): Observable<any> {
    return this.http.get(`${baseUrl}/api/v1/cart`);
  }

  // لتحديث عدد المنتجات في السلة
  updateCartItem(pid: string, count: number): Observable<any> {
    return this.http.put(`${baseUrl}/api/v1/cart/${pid}`, { count: count });
  }

  // لحذف منتج من السلة
  removeFromCart(pid: string): Observable<any> {
    return this.http.delete(`${baseUrl}/api/v1/cart/${pid}`);
  }

  // لحذف جميع المنتجات من السلة
  clearAllCart(): Observable<any> {
    return this.http.delete(`${baseUrl}/api/v1/cart`);
  }
}
