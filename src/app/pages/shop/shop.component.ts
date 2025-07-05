// import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
// import { HomeService } from '../../core/services/homeSer/home.service';
// import { IProduct } from '../../shared/interfaces/iproduct';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { SearchService } from '../../core/services/searchSer/search.service';

// @Component({
//   selector: 'app-shop',
//   imports: [ RouterLink ],
//   templateUrl: './shop.component.html',
//   styleUrl: './shop.component.scss'
// })
// export class ShopComponent implements OnInit {
//   private readonly productsService = inject(HomeService)
//   private readonly activatedRoute= inject(ActivatedRoute);
//   private readonly SearchService = inject(SearchService);
//   detailsProduct:IProduct|null=null ;
//   showModal :WritableSignal<IProduct[]>=signal ([]);
//   products:WritableSignal<IProduct[]>=signal ([])
//   allProducts: IProduct[] = []
//   filteredProducts: IProduct[] = []

//   ngOnInit(): void {
//     this.getallproducts();
//     this.searchShard()
//   }

//   showProductDetails(id: string | null): void {
//     this.productsService.getSpecProduct(id).subscribe({
//       next: (res) => {
//         this.detailsProduct = res.data;
//         this.showModal.set(res.data);
//       },
//       error: (err) => {
//         console.error('Error loading product details:', err);
//       }
//     });
//   }

//   getallproducts():void{
//     this.productsService.getAllProducts().subscribe({
//       next:(res) => {
//         this.allProducts = res.data
//         this.filteredProducts = res.data
//       },
//       error:(error) => {
//         console.error(error);

//       }

//     })
//   }

//  searchShard(){
//    this.SearchService.searchTerm$.subscribe(term => {
//     this.filteredProducts = this.allProducts.filter(product =>
//       product.title.toLowerCase().includes(term.toLowerCase())
//     );
//   });

// }

// }
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';

import { HomeService } from '../../core/services/homeSer/home.service';
import { CartService } from '../../core/services/cartSer/cart.service';
import { NotyfService } from './../../core/services/notyfSer/notyf.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICart } from '../../shared/interfaces/icart';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchService } from '../../core/services/searchSer/search.service';

@Component({
  selector: 'app-shop',

  standalone: true,

  imports: [RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private readonly productsService = inject(HomeService);

  private readonly activatedRoute = inject(ActivatedRoute);
  detailsProduct: IProduct | null = null;

  showModal: WritableSignal<IProduct[]> = signal([]);
  private readonly SearchService = inject(SearchService);
  products: WritableSignal<IProduct[]> = signal([]);
  allProducts: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  private readonly cartService = inject(CartService);
  private notyfService = inject(NotyfService);

  CartDetalis: ICart = {} as ICart;

  ngOnInit(): void {
    this.getallproducts();
    this.searchShard();
  }

  getallproducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.data);
        this.allProducts = res.data;
        this.filteredProducts = res.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showProductDetails(id: string | null): void {
    this.productsService.getSpecProduct(id).subscribe({
      next: (res) => {
        this.detailsProduct = res.data;
      },
      error: (err) => {
        console.error('Error loading product details:', err);
      },
    });
  }

  closeModal(): void {
    this.detailsProduct = null;
  }

  addToCart(id: string): void {
    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        this.notyfService.success(res.message);
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
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
}
