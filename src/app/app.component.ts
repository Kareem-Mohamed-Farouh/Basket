import { NavbarComponent } from './layout/navbar/navbar.component';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';

import { NgxSpinnerComponent } from 'ngx-spinner';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-root',

  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    NgxSpinnerComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'eBasket';

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {});
  }
}
