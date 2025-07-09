import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { NgxSpinnerModule } from 'ngx-spinner';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { headerInterceptor } from './shared/interceptors/header/header.interceptor';
import { loadingInterceptor } from './shared/interceptors/loading/loading.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { handlEerrorInterceptor } from './shared/interceptors/handlEerror/handl-eerror.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        headerInterceptor,
        loadingInterceptor,
        handlEerrorInterceptor,
      ])
    ),
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule),
  ],
};
