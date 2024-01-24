import { AuthPipe, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';
import { AuthPageComponent, HomePageComponent } from '@pages';

const redirectToLogin = (): AuthPipe => redirectUnauthorizedTo(['auth']);
const redirectToHome = (): AuthPipe => redirectLoggedInTo(['']);

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent, ...canActivate(redirectToLogin) },
  { path: 'auth', component: AuthPageComponent, ...canActivate(redirectToHome) },
  { path: '**', redirectTo: '' },
];
