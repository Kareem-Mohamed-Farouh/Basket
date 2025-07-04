import { Component, computed, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { MainsliderComponent } from '../../shared/components/ui/mainslider/mainslider.component';
import { AddbuttonComponent } from '../../shared/components/ui/addbutton/addbutton.component';
import { SliderComponent } from '../../shared/components/ui/slider/slider.component';
import { HomeService } from '../../core/services/homeSer/home.service';
import { CategoryService } from '../../core/services/categorySer/category.service';
import { MoreproductComponent } from '../../shared/components/ui/moreproduct/moreproduct.component';
import { SearchService } from '../../core/services/searchSer/search.service';
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
  allProducts: IProduct[] = []
  filteredProducts: IProduct[] = []
  categoryData: WritableSignal<ICategories[]> = signal<ICategories[]>([]);
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
