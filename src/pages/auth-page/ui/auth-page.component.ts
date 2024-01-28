import { Component } from '@angular/core';
import { AuthFormComponent } from '@widgets';

/**
 * Страница авторизации
 */
@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {}
