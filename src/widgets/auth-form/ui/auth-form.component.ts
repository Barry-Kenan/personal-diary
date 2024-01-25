import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthVariantEnum, SocialIconsEnum } from '@shared/models';
import { AuthService } from '@shared/services';
import { SocialButtonComponent } from '@shared/ui';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    SocialButtonComponent,
    CommonModule,
  ],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  public authForm: FormGroup;
  public variant: AuthVariantEnum;
  public authVariantEnum = AuthVariantEnum;
  public socialIconsEnum = SocialIconsEnum;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService
  ) {
    this.variant = AuthVariantEnum.LOGIN;
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''],
    });
  }

  get f() {
    return this.authForm.controls;
  }

  public toggleVariant = () => {
    if (this.variant === AuthVariantEnum.LOGIN) {
      this.f['name'].addValidators([Validators.required]);
      this.variant = AuthVariantEnum.REGISTER;
    } else {
      this.f['name'].setErrors(null);
      this.f['name'].setValidators([]);
      this.variant = AuthVariantEnum.LOGIN;
    }

    this.authForm.reset();
  };

  public submit(): void {
    if (!this.authForm.valid) {
      return;
    }

    const { name, email, password } = this.authForm.value;

    if (this.variant === AuthVariantEnum.LOGIN) {
      this.authService.login(email, password);
    } else {
      this.authService.register(name, email, password);
    }
  }

  public handleGoogleClick(): void {
    this.authService.googleLogin();
  }

  public handleGithubClick(): void {
    this.authService.githubLogin();
  }
}
