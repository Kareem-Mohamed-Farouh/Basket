import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HomeService } from '../../core/services/homeSer/home.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [DatePipe ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
private homeService = inject(HomeService)
productData: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
pageNum : WritableSignal<number> = signal(2)
selectedPage = signal<number>(1); 

ngOnInit(): void {
  this.get2Products(16)
}

get2Products(pNum:number){

  this.homeService.getAllProductsBlog(pNum).subscribe({
    next : (res) =>{
      this.productData.set(res.data)
      console.log(this.productData())
    },

    error : (err) => {
      console.log(err)
    }
  })

  if (pNum == 2) {
    this.selectedPage.set(2)
    
  }else if(pNum == 1){
    this.selectedPage.set(1)
  }
}

getNextPage(pNum:number){
   this.homeService.getAllProductsBlog(pNum).subscribe({
    next : (res) =>{
      this.productData.set(res.data)
  
    },

    error : (err) => {
      console.log(err)
    }
  })
}

goToPage() {
  this.pageNum.update(current => current + 1);
  this.getNextPage(this.pageNum());
   this.selectedPage.set(0)
}


}
