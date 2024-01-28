import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * Компонент Footer
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public currentDate = new Date();
}
