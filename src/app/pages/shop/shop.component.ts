import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HomeService } from '../../core/services/homeSer/home.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchService } from '../../core/services/searchSer/search.service';

@Component({
  selector: 'app-shop',
  imports: [ RouterLink ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private readonly productsService = inject(HomeService)
  private readonly activatedRoute= inject(ActivatedRoute);
    private readonly SearchService = inject(SearchService);
  detailsProduct:IProduct|null=null ;
  showModal :WritableSignal<IProduct[]>=signal ([]);
   allProducts: IProduct[] = []
  filteredProducts: IProduct[] = []


  ngOnInit(): void {
    this.getallproducts();
    this.searchShard()
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
        this.allProducts = res.data
        this.filteredProducts = res.data
      },
      error:(error) => {
        console.error(error);
     
      }
      
    })
  }

   searchShard(){
   this.SearchService.searchTerm$.subscribe(term => {
    this.filteredProducts = this.allProducts.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
  });

}

}


