import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';
import { HomeService } from '../../core/services/homeSer/home.service';
import { CategoryService } from '../../core/services/categorySer/category.service';
import { WishlistService } from '../../core/services/wishlistSer/wishlist.service';
import { CartService } from '../../core/services/cartSer/cart.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { IWhishlist } from '../../shared/interfaces/iwish';
import { CurrencyPipe } from '@angular/common';
import { NotyfService } from '../../core/services/notyfSer/notyf.service';
@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly productsService = inject(HomeService);
  private readonly CategoryService = inject(CategoryService);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private notyfService = inject(NotyfService);

  d: number = 1;
  detailData: IProduct = {} as IProduct;
  productData!: IProduct[];
  wishData!: IWhishlist[];
  detailsId: string = '';
  // detailData: IProducts | null = null;

  ngOnInit(): void {
    this.getDetails();
    this.getProductData();
    this.getLogeduser();
  }

  getDetails() {
    this.sub = this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.detailsId = res.get('detailsId')!;
        this.productsService.getSpecProduct(this.detailsId).subscribe({
          next: (res) => {
            console.log('details', res.data);
            this.detailData = res.data;
          },
        });
      },
    });
  }

  addItemToCart(productId: string) {
    this.sub = this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        console.log(res);

        this.notyfService.success(res.message);
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }

  addProductToWishlist(idprodd: string) {
    this.sub = this.wishlistService.AddToWishlist(idprodd).subscribe({
      next: (res) => {
        console.log(res);

        this.notyfService.success(res.message);
        // this.getLogeduser();
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
  getProductData() {
    this.sub = this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productData = res.data;
      },
    });
  }
  sub!: Subscription;
  ngOnDestroy(): void {
    // console.log('dd');
    this.sub.unsubscribe();
  }
}
