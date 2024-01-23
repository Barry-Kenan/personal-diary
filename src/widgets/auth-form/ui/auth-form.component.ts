import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocialIconsEnum } from '@shared/models';
import { SocialButtonComponent } from '@shared/ui/social-button/social-button.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule, MessagesModule, SocialButtonComponent],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  public authForm: FormGroup;
  public variant: 'Login' | 'Register';

  constructor(private fb: FormBuilder) {
    this.variant = 'Login';
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: [''],
    });
  }

  public gitHubIcon = SocialIconsEnum.Github;
  public googleIcon = SocialIconsEnum.Google;

  get f() {
    return this.authForm.controls;
  }

  public toggleVariant = () => {
    if (this.variant === 'Login') {
      this.authForm.controls['name'].addValidators([Validators.required]);
      this.variant = 'Register';
    } else {
      this.authForm.controls['name'].setErrors(null);
      this.authForm.controls['name'].setValidators([]);
      this.variant = 'Login';
    }
  };

  public submit(): void {
    if (!this.authForm.valid) {
      return;
    }

    const { name, email, password } = this.authForm.value;

    if (this.variant === 'Login') {
      console.log(email, password);
    } else {
      console.log(name, email, password);
    }
  }

  public handleGoogleClick(): void {
    console.log('google');
  }

  public handleGithubClick(): void {
    console.log('github');
  }
}
