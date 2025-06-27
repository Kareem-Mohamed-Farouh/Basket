import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AddbuttonComponent } from './shared/components/ui/addbutton/addbutton.component';
import { SliderComponent } from './shared/components/ui/slider/slider.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SliderComponent,
    AddbuttonComponent,
    HomeComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'eBasket';
}
