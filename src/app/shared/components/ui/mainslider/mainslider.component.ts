import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { SwiperOptions } from 'swiper/types';
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
  selector: 'app-mainslider',
  imports: [],
  templateUrl: './mainslider.component.html',
  styleUrl: './mainslider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainsliderComponent {
  slidesPerView: WritableSignal<number> = signal(5);
  screenWidth: WritableSignal<number> = signal(0);
  productData: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  private readonly homeService = inject(HomeService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  ngOnInit() {
    this.getHomeProduct();
    // Initialize screen width for browser platform
    // This check is necessary to avoid errors during server-side rendering
  }

  getHomeProduct(): void {
    this.homeService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productData.set(res.data);
      },
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getScreenWidth();
    }
  }
  @HostListener('window:resize')
  getScreenWidth() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.screenWidth.set(window.innerWidth);
      const width = this.screenWidth();
      if (width >= 120 && width <= 480) {
        this.slidesPerView.set(1);
      } else if (width > 480 && width <= 602) {
        this.slidesPerView.set(2);
      } else if (width > 602 && width <= 992) {
        this.slidesPerView.set(3);
      } else if (width > 992 && width <= 1200) {
        this.slidesPerView.set(5);
      }
    }
  }
}
