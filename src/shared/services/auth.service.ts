/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AuthProvider, GithubAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$ = this.afAuth.user;

  constructor(
    private afAuth: AngularFireAuth,
    private messageService: MessageService,
    private router: Router
  ) {}

  public async register(name: string, email: string, password: string) {
    return await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result =>
        result.user?.updateProfile({
          displayName: name,
        })
      )
      .then(result => {
        this.message('success', 'Успешная регистрация');
      })
      .catch(error => {
        this.message('error', error.message);
      });
  }

  public async login(email: string, password: string) {
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.message('success', 'Успешная авторизация');
      })
      .catch(error => {
        this.message('error', error.message);
      });
  }

  public googleLogin() {
    return this.authLogin(new GoogleAuthProvider());
  }

  public githubLogin() {
    return this.authLogin(new GithubAuthProvider());
  }

  public async authLogin(provider: AuthProvider) {
    return await this.afAuth
      .signInWithPopup(provider)
      .then(result => {
        this.message('success', 'Успешная авторизация');
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.message('error', error.message);
      });
  }

  public async logout() {
    await this.afAuth.signOut();
    return this.router.navigate(['auth']);
  }

  public message(severity: 'error' | 'success' = 'success', detail: string) {
    this.messageService.add({
      key: 'authToast',
      severity,
      detail,
      summary: severity === 'error' ? 'Некорректные учётные данные пользователя' : '',
    });
    if (severity === 'success') {
      this.router.navigate(['']);
    }
  }
}
