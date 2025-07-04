import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HomeService } from '../../core/services/homeSer/home.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cartSer/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { NotyfService } from '../../core/services/notyfSer/notyf.service';

@Component({
  selector: 'app-shop',
  imports: [RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private readonly productsService = inject(HomeService)
  private readonly cartService=inject(CartService)

    detailsProduct:IProduct|null=null ;

  showModal :WritableSignal<IProduct[]>=signal ([]);
  
   products:WritableSignal<IProduct[]>=signal ([])
     CartDetalis:ICart={} as ICart
   



  ngOnInit(): void {
    this.getallproducts();
 

 
  }


    showProductDetails(id: string | null): void {
    this.productsService.getSpecProduct(id).subscribe({
      next: (res) => {
        this.detailsProduct = res.data;
        this.showModal.set(res.data);
      },
      error: (err) => {
        console.error('Error loading product details:', err);
      }
    });
  }

  getallproducts():void{
    this.productsService.getAllProducts().subscribe({
      next:(res) => {
        console.log(res);
           this.products.set(res.data);
      },
      error:(error) => {
        console.error(error);
     
      }
      
    })
  }



addcart(pid: string): void {
  this.cartService.addToCart(pid).subscribe({
    next: (res) => {
      console.log(res);
      this.cartService.cartNumber.set(res.numOfCartItems);
      // this.notyf.success('Product added to cart!');
    },
    error: (err) => {
      console.error(err);
      // this.notyf.error(err.error.message || 'Failed to add product to cart');
    }
  });
}




}


