import { CartService } from './../../core/services/cartSer/cart.service';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly cartService=inject(CartService)
   countCart:Signal<number> = computed(()=>  
  this.cartService.cartNumber()
 )
 

  ngOnInit(): void {
          this.cartService.getCartItems().subscribe({
      next:(res)=>{
        this.cartService.cartNumber.set(res.numOfCartItems)
      }
     })
  }

}
