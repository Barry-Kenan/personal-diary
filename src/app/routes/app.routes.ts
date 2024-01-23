import { Routes } from '@angular/router';
import { AuthPageComponent, HomePageComponent } from '@pages';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: '**', redirectTo: '' },
];
