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
import { RouterLink } from '@angular/router';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICategories } from '../../shared/interfaces/icategories';
import { WishlistService } from '../../core/services/wishlistSer/wishlist.service';
import { Subscription } from 'rxjs';
import { IWhishlist } from '../../shared/interfaces/iwish';
import { CartService } from '../../core/services/cartSer/cart.service';
import { NotyfService } from '../../core/services/notyfSer/notyf.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MainsliderComponent, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  productData: WritableSignal<IProduct[]> = signal<IProduct[]>([]);

  allProducts: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  categoryData: WritableSignal<ICategories[]> = signal<ICategories[]>([]);
  private readonly homeService = inject(HomeService);
  private readonly categoryService = inject(CategoryService);
  private readonly SearchService = inject(SearchService);
  private readonly wishlistService = inject(WishlistService);
  private readonly notyfService = inject(NotyfService);
  private readonly cartService = inject(CartService);

  sub!: Subscription;
  wishData!: IWhishlist[];
  ngOnInit(): void {
    this.getHomeProduct();
    this.getCategories();
    this.searchShard();
    this.getLogeduser();
  }

  getHomeProduct(): void {
    this.homeService.getAllProducts().subscribe({
      next: (res) => {
        this.productData.set(res.data);
        this.allProducts = res.data;
        this.filteredProducts = res.data;
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

  searchShard() {
    this.SearchService.searchTerm$.subscribe((term) => {
      this.filteredProducts = this.allProducts.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
    });
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

  getLogeduser() {
    this.sub = this.wishlistService.getWishlistItems().subscribe({
      next: (res) => {
        console.log(res);
        this.wishData = res.data;
      },
    });
  }

  addProductToWishList(idprod: string) {
    this.sub = this.wishlistService.AddToWishlist(idprod).subscribe({
      next: (res) => {
        console.log(res);
        this.notyfService.info(res.message);
        this.getLogeduser();
      },
    });
  }

  removProductFromWishlist(idprodd: string) {
    this.sub = this.wishlistService.removeFromWishlist(idprodd).subscribe({
      next: (res) => {
        console.log(res);
        this.notyfService.warning(res.message);
        this.getLogeduser();
      },
    });
  }

  ngOnDestroy(): void {
    // console.log('');
    this.sub.unsubscribe();
  }
}
