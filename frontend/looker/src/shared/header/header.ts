import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menuOpen: any;

  openRegisterDialog() {

  }

  onSearch() {

  }
}
