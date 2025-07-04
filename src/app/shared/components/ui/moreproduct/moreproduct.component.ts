import { Component, inject, signal, WritableSignal } from '@angular/core';

import { HomeService } from '../../../../core/services/homeSer/home.service';
interface IProduct {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

@Component({
  selector: 'app-moreproduct',
  imports: [],
  templateUrl: './moreproduct.component.html',
  styleUrl: './moreproduct.component.scss',
})
export class MoreproductComponent {
  productDat: WritableSignal<IProduct[]> = signal<IProduct[]>([]);

  private readonly homeService = inject(HomeService);

  ngOnInit(): void {
    this.getHomeProduct();
  }

  getHomeProduct(): void {
    this.homeService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productDat.set(res.data);
      },
    });
  }
}
