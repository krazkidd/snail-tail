import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent  implements OnInit {

  @Input({
    required: true
  })
  title: string = '';

  constructor() {

  }

  ngOnInit() {

  }

}
