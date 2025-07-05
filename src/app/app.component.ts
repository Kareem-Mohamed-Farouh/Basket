import { NavbarComponent } from './layout/navbar/navbar.component';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AddbuttonComponent } from './shared/components/ui/addbutton/addbutton.component';
import { SliderComponent } from './shared/components/ui/slider/slider.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ShopComponent } from "./pages/shop/shop.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { NgxSpinnerComponent } from 'ngx-spinner';
import { AuthenService } from './core/services/auth/authen.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    SliderComponent,
    AddbuttonComponent,
    HomeComponent,
    FooterComponent,
    NotfoundComponent,
    ShopComponent,
    RegisterComponent,
    AboutUsComponent,
    NgxSpinnerComponent
],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'eBasket';

}
