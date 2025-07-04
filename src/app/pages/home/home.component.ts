import {
  Component,
  computed,
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
import { SearchService } from '../../core/services/searchSer/search.service';
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

interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
@Component({
  selector: 'app-home',
  imports: [
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
  allProducts: IProduct[] = []
  filteredProducts: IProduct[] = []
  categoryData: WritableSignal<ICategory[]> = signal<ICategory[]>([]);
  private readonly homeService = inject(HomeService);
  private readonly categoryService = inject(CategoryService);
  private readonly SearchService = inject(SearchService);

  ngOnInit(): void {
    this.getHomeProduct();
    this.getCategories();
    this.searchShard()
  }

  getHomeProduct(): void {
    this.homeService.getAllProducts().subscribe({
      next: (res) => {
        this.productData.set(res.data);
        this.allProducts = res.data
        this.filteredProducts = res.data
      },
    });
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryData.set(res.data);
      },
    });
  }

  searchShard(){
   this.SearchService.searchTerm$.subscribe(term => {
    this.filteredProducts = this.allProducts.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
  });

}
}
