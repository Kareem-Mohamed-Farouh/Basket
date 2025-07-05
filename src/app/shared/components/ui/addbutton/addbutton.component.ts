import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-addbutton',
  imports: [],
  templateUrl: './addbutton.component.html',
  styleUrls: ['./addbutton.component.scss'],
})
export class AddbuttonComponent {
  @Input() label: string = 'Add';

  
}
