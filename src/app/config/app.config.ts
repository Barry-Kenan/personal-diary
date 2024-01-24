import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { routes } from '../routes/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
    importProvidersFrom(AngularFireAuth),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom([BrowserAnimationsModule]),
    MessageService,
  ],
};
