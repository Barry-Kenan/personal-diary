import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@shared/services';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(public authService: AuthService) {}
}
