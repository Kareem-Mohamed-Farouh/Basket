import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../shared/environments/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

   constructor(private http:HttpClient) { }

    // لعرض جميع الفئات
   getAllCategories():Observable<any> {
     return this.http.get(`${baseUrl}/api/v1/categories`);
   }

    // لعرض فئة واحدة
    getSpecCategory(catId: string): Observable<any> {
      return this.http.get(`${baseUrl}/api/v1/categories/${catId}`);
    }
    
}
