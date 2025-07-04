import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MainsliderComponent } from '../../shared/components/ui/mainslider/mainslider.component';
import { AddbuttonComponent } from '../../shared/components/ui/addbutton/addbutton.component';
import { SliderComponent } from '../../shared/components/ui/slider/slider.component';
import { HomeService } from '../../core/services/homeSer/home.service';
import { CategoryService } from '../../core/services/categorySer/category.service';
import { MoreproductComponent } from '../../shared/components/ui/moreproduct/moreproduct.component';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICategories } from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MainsliderComponent,
    AddbuttonComponent,
    SliderComponent,
    MoreproductComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  productData: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  categoryData: WritableSignal<ICategories[]> = signal<ICategories[]>([]);
  private readonly homeService = inject(HomeService);
  private readonly categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.getHomeProduct();
    this.getCategories();
  }

  getHomeProduct(): void {
    this.homeService.getAllProducts().subscribe({
      next: (res) => {
        this.productData.set(res.data);
        console.log(res.data);
      },
    });
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.data);
        this.categoryData.set(res.data);
      },
    });
  }
}
