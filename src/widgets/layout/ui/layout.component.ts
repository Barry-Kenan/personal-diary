import { Component } from '@angular/core';
import { FooterComponent, HeaderComponent } from '@features';

/**
 * компонент Layout
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {}
