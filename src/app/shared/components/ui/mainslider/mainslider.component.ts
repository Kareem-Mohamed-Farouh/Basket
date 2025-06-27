import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-mainslider',
  imports: [],
  templateUrl: './mainslider.component.html',
  styleUrl: './mainslider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainsliderComponent {
  slidesPerView: number = 5;
  screenWidth!: number;

  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  ngOnInit() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getScreenWidth();
    }
  }

  @HostListener('window:resize')
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 120 && this.screenWidth <= 480) {
      this.slidesPerView = 1;
    } else if (this.screenWidth >= 480 && this.screenWidth <= 602) {
      this.slidesPerView = 2;
    } else if (this.screenWidth >= 602 && this.screenWidth <= 992) {
      this.slidesPerView = 3;
    } else if (this.screenWidth >= 992 && this.screenWidth <= 1200) {
      this.slidesPerView = 5;
    }
  }
}
