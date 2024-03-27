import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  public publisher =
    [
      {
        id: 'Dc Comics', des: 'DC - Comics'
      }, {
        id: 'Marvel Comics', des: 'Marvel - Comics'
      }
    ]

}
