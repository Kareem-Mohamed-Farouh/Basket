import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';

import { HomeService } from '../../../../core/services/homeSer/home.service';
import { AddbuttonComponent } from '../addbutton/addbutton.component';
import { IProduct } from '../../../interfaces/iproduct';
import { CartService } from '../../../../core/services/cartSer/cart.service';
import { NotyfService } from '../../../../core/services/notyfSer/notyf.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mainslider',
  imports: [AddbuttonComponent, RouterLink],
  templateUrl: './mainslider.component.html',
  styleUrl: './mainslider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainsliderComponent implements OnInit, AfterViewInit {
  slidesPerView: WritableSignal<number> = signal(5);
  isBrowser: WritableSignal<boolean> = signal(false);
  screenWidth: WritableSignal<number> = signal(0);
  productData: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  private readonly homeService = inject(HomeService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly notyfService = inject(NotyfService);
  private readonly cartService = inject(CartService);

  ngOnInit() {
    this.getHomeProduct();
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
      this.isBrowser.set(true);
      this.getScreenWidth();
    }
  }

  addItemToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.notyfService.success(res.message);
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
    });
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
