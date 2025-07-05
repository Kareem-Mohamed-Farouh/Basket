import { Component, inject, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlistSer/wishlist.service';
import { IWhishlist, IWishstatues } from '../../shared/interfaces/iwish';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cartSer/cart.service';
import { NotyfService } from '../../core/services/notyfSer/notyf.service';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  // wishlistData: WritableSignal<IWhishlist[]> = signal<IWhishlist[]>([]);
  res: IWishstatues = {} as IWishstatues;
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private notyfService = inject(NotyfService);
  wishlistData!: IWhishlist[];
  ngOnInit(): void {
    this.getwishlistData();
  }
  getwishlistData() {
    this.wishlistService.getWishlistItems().subscribe({
      next: (res) => {
        console.log('RES', res);
        this.res = res;
        this.wishlistData = res.data;
      },
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

  removProductFromWishlist(idprodd: string) {
    this.wishlistService.removeFromWishlist(idprodd).subscribe({
      next: (res) => {
        console.log(res);

        this.notyfService.info(res.message);
        this.getwishlistData();
      },
    });
  }
}
