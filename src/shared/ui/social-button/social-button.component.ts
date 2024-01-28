import { Component, Input } from '@angular/core';
import { SocialIconsEnum } from '@shared/models';
import { ButtonModule } from 'primeng/button';

/**
 * Кнопка с иконкой google, github
 */
@Component({
  selector: 'app-social-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.scss'],
})
export class SocialButtonComponent {
  @Input() public handleClick!: () => void;
  @Input() public icon!: SocialIconsEnum;
}
