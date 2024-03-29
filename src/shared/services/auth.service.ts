import { Injectable } from '@angular/core';
import { AuthProvider, GithubAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

/**
 * Сервис авторизации, регистрации
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Observable пользователь
   */
  public user$ = this.afAuth.user;

  constructor(
    private afAuth: AngularFireAuth,
    private messageService: MessageService,
    private router: Router
  ) {}

  /**
   * метод регистрации почта/пароль
   * @param name Имя
   * @param email Почта
   * @param password Пароль
   * @returns Promise<void>
   */
  public async register(name: string, email: string, password: string) {
    return await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result =>
        result.user?.updateProfile({
          displayName: name,
        })
      )
      .then(() => {
        this.message('success', 'Успешная регистрация');
      })
      .catch(error => {
        this.message('error', error.message);
      });
  }

  /**
   * метод логина почта/пароль
   * @param email почта
   * @param password пароль
   * @returns Promise<void>
   */
  public async login(email: string, password: string) {
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.message('success', 'Успешная авторизация');
      })
      .catch(error => {
        this.message('error', error.message);
      });
  }

  /**
   * метод авторизации регистрации через google
   * @returns Promise<void>
   */
  public googleLogin() {
    return this.authLogin(new GoogleAuthProvider());
  }

  /**
   * метод авторизации регистрации через github
   * @returns Promise<void>
   */
  public githubLogin() {
    return this.authLogin(new GithubAuthProvider());
  }

  /**
   * вспомогательный метод регистрации и авторизации через провайдеры
   * @param provider провайдер(google, github, ...)
   * @returns Promise<void>
   */
  public async authLogin(provider: AuthProvider) {
    return await this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        this.message('success', 'Успешная авторизация');
        this.router.navigate(['']);
      })
      .catch(error => {
        this.message('error', error.message);
      });
  }

  /**
   * Логаут
   * @returns Promise<boolean>
   */
  public async logout() {
    await this.afAuth.signOut();
    return this.router.navigate(['auth']);
  }

  /**
   * метод вывода сообщения
   * @param severity заголовок
   * @param detail описание
   */
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
