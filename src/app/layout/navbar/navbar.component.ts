import { CartService } from './../../core/services/cartSer/cart.service';
import { Component, computed, inject, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from '../../core/services/searchSer/search.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

  private readonly cartService=inject(CartService)
  private readonly router = inject(Router)
  private readonly platformID =inject(PLATFORM_ID)
  countCart:Signal<number> = computed(()=>  
  this.cartService.cartNumber() )

constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      if (localStorage.getItem('token')) {
        this.cartService.getCartItems().subscribe({
          next: (res) => {
            this.cartService.cartNumber.set(res.numOfCartItems);
          },
        });
      }
    }
  }


 onSearchChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.searchService.updateSearchTerm(value);
}

logOut(){
  localStorage.removeItem('token')
  this.router.navigate(['/login']);
  


}

}
