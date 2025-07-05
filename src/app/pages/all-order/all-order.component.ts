import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HomeService } from '../../core/services/homeSer/home.service';
import { AuthenService } from '../../core/services/auth/authen.service';
import { IOrders } from '../../shared/interfaces/iorders';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-order',
  imports: [ DatePipe],
  templateUrl: './all-order.component.html',
  styleUrl: './all-order.component.scss'
})
export class AllOrderComponent implements OnInit {
  private homeService = inject(HomeService)

   allOrder: WritableSignal<IOrders[]> = signal<IOrders[]>([]);
 


  ngOnInit(): void {
   this.getAllOrder()
    }


    getAllOrder(){
      this.homeService.getAllOrders().subscribe({
        next : (res) =>{
          this.allOrder.set(res.data)
           console.log(this.allOrder())
        },
        error : (err)=>{
           console.log(err)
        }
      })
    }
   

}
