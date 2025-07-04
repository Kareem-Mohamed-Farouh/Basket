import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from '../../core/services/searchSer/search.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

    constructor(private searchService: SearchService) {}

 onSearchChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.searchService.updateSearchTerm(value);
}
}
