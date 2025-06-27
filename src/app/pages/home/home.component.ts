import { CartService } from './../../core/services/cartSer/cart.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MainsliderComponent } from '../../shared/components/ui/mainslider/mainslider.component';
import { AddbuttonComponent } from '../../shared/components/ui/addbutton/addbutton.component';
import { SliderComponent } from '../../shared/components/ui/slider/slider.component';
import { HomeService } from '../../core/services/homeSer/home.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MainsliderComponent, AddbuttonComponent, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {



}
