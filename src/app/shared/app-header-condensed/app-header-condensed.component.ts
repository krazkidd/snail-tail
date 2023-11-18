import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-condensed',
  templateUrl: './app-header-condensed.component.html',
  styleUrls: ['./app-header-condensed.component.scss'],
})
export class AppHeaderCondensedComponent {

  @Input({
    required: true
  })
  title: string = '';

  constructor() { }

}
