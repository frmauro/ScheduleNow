import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { LucideAngularModule, LayoutDashboard, Calendar, Users, Briefcase, LogOut, Scissors, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    importProvidersFrom(LucideAngularModule.pick({ LayoutDashboard, Calendar, Users, Briefcase, LogOut, Scissors, Pencil, Trash2, ChevronLeft, ChevronRight }))
  ]
};
