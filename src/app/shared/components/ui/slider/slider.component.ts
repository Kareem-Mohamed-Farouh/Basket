import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent {}
