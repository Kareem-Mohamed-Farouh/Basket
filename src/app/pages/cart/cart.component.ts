import { NotyfService } from './../../core/services/notyfSer/notyf.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../core/services/cartSer/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService=inject(CartService)
    private readonly platformID =inject(PLATFORM_ID)
     private notyfService = inject(NotyfService)
  CartDetalis:ICart={} as ICart


  ngOnInit(): void {
     if (isPlatformBrowser(this.platformID)) {
 if (localStorage.getItem('basketToken')) {
    this.getCartData()
    }
     }
   

     
  }
  getCartData():void{
    this.cartService.getCartItems().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.CartDetalis= res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  removeitems(pid:string):void{
    this.cartService.removeFromCart(pid).subscribe({
      next:(res)=>{
        console.log(res)
        this.CartDetalis = res.data
        this.cartService.cartNumber.set(res.numOfCartItems)
          this.notyfService.success('product Deleted')

      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

  updateItems(pid: string, count: number):void{
    this.cartService.updateCartItem(pid,count).subscribe({
      next:(res)=>{
        console.log(res.data)
        this.CartDetalis=res.data
          this.notyfService.success('your cart updated')

      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  clearitems():void{
    this.cartService.clearAllCart().subscribe({
      next:(res)=>{
        console.log(res)
                   if (res.message === 'success') {
               this.notyfService.success('your cart cleared')
              this.CartDetalis ={} as ICart;
              this.cartService.cartNumber.set(0)
              
            }
           
      },
      error:(err)=>{
console.log(err)
      }
    })
  }
}
