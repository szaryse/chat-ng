import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  imports: [LoginComponent],
})
export class MainPageComponent {}
