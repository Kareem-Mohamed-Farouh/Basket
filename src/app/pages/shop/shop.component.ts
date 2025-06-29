import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HomeService } from '../../core/services/homeSer/home.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private readonly productsService = inject(HomeService)


  
   products:WritableSignal<IProduct[]>=signal ([])



  ngOnInit(): void {
    this.getallproducts();
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
}


