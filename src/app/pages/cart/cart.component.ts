import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cartSer/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService=inject(CartService)
  CartDetalis:ICart={} as ICart


  ngOnInit(): void {
      this.getCartData()
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
        console.log(res.data)
        this.CartDetalis = res.data
        this.cartService.cartNumber.set(res.numOfCartItems)

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
