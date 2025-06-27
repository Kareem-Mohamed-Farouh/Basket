import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContanetComponent } from "./pages/contanet/contanet.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContanetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'eBasket';
}
