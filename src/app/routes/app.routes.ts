import { AuthPipe, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

const redirectToLogin = (): AuthPipe => redirectUnauthorizedTo(['auth']);
const redirectToHome = (): AuthPipe => redirectLoggedInTo(['']);

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@pages').then(c => c.HomePageComponent),
    ...canActivate(redirectToLogin),
  },
  {
    path: 'auth',
    loadComponent: () => import('@pages').then(c => c.AuthPageComponent),
    ...canActivate(redirectToHome),
  },
  {
    path: 'new-note',
    loadComponent: () => import('@pages').then(c => c.NewNotePageComponent),
    ...canActivate(redirectToLogin),
  },
  {
    path: 'edit-note/:id',
    loadComponent: () => import('@pages').then(c => c.EditNotePageComponent),
    ...canActivate(redirectToLogin),
  },
  { path: '**', redirectTo: '' },
];
